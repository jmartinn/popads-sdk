import { LogLevel, Logger, RequestMetadata } from '../types/client';

/**
 * Log level hierarchy for filtering messages by importance.
 * Higher numbers indicate more severe/important log levels.
 */
const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Default console logger implementation for the PopAds SDK.
 *
 * This logger outputs formatted messages to the console with timestamps
 * and log level filtering. It's used as the default logger when no custom
 * logger is provided.
 *
 * @example
 * ```typescript
 * const logger = new ConsoleLogger('debug');
 * logger.info('Campaign created successfully', { id: 123 });
 * logger.error('API request failed', { status: 404 });
 * ```
 */
export class ConsoleLogger implements Logger {
  /**
   * Creates a new console logger instance.
   *
   * @param minLevel - Minimum log level to output (messages below this level are ignored)
   */
  constructor(private minLevel: LogLevel = 'info') {}

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.minLevel];
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    const levelUpper = level.toUpperCase().padEnd(5);
    return `[${timestamp}] ${levelUpper} [PopAds SDK] ${message}`;
  }

  /**
   * Logs a debug message with optional additional data.
   * Only shown when log level is set to 'debug'.
   */
  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }

  /**
   * Logs an informational message with optional additional data.
   * Shown when log level is 'debug' or 'info'.
   */
  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  /**
   * Logs a warning message with optional additional data.
   * Shown when log level is 'debug', 'info', or 'warn'.
   */
  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message), ...args);
    }
  }

  /**
   * Logs an error message with optional additional data.
   * Always shown regardless of log level.
   */
  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message), ...args);
    }
  }
}

/**
 * Silent logger that discards all messages.
 *
 * This logger is used when debug mode is disabled and no custom logger
 * is provided, ensuring minimal performance impact in production.
 *
 * @example
 * ```typescript
 * const logger = new SilentLogger();
 * logger.info('This will not be output anywhere');
 * ```
 */
export class SilentLogger implements Logger {
  /** Discards debug messages */
  debug(): void {}

  /** Discards info messages */
  info(): void {}

  /** Discards warning messages */
  warn(): void {}

  /** Discards error messages */
  error(): void {}
}

/**
 * Creates an appropriate logger instance based on configuration.
 *
 * This factory function determines the best logger to use based on the
 * provided options, returning either a custom logger, console logger,
 * or silent logger as appropriate.
 *
 * @param customLogger - Optional custom logger implementation
 * @param logLevel - Minimum log level for console logger
 * @param debug - Whether debug mode is enabled
 * @returns Logger instance appropriate for the configuration
 *
 * @example
 * ```typescript
 * // Use custom logger
 * const logger1 = createLogger(myCustomLogger);
 *
 * // Use console logger with debug enabled
 * const logger2 = createLogger(undefined, 'debug', true);
 *
 * // Use silent logger (production mode)
 * const logger3 = createLogger(undefined, 'info', false);
 * ```
 */
export function createLogger(
  customLogger?: Logger,
  logLevel: LogLevel = 'info',
  debug: boolean = false,
): Logger {
  if (customLogger) {
    return customLogger;
  }

  if (!debug && logLevel === 'info') {
    return new SilentLogger();
  }

  return new ConsoleLogger(logLevel);
}

/**
 * Specialized logger for HTTP request/response logging.
 *
 * This class provides structured logging for API requests, including
 * request start, completion, errors, and rate limiting events. It
 * automatically sanitizes sensitive information from logs.
 *
 * @example
 * ```typescript
 * const requestLogger = new RequestLogger(logger);
 * requestLogger.logRequestStart(metadata, requestBody);
 * requestLogger.logRequestComplete(metadata, response);
 * ```
 */
export class RequestLogger {
  /**
   * Creates a new request logger instance.
   *
   * @param logger - Base logger implementation to use for output
   */
  constructor(private logger: Logger) {}

  /**
   * Logs the start of an API request.
   *
   * @param metadata - Request metadata including ID, method, endpoint, etc.
   * @param body - Optional request body (will be sanitized)
   */
  logRequestStart(metadata: RequestMetadata, body?: unknown): void {
    this.logger.debug(
      `→ ${metadata.method} ${metadata.endpoint} [${metadata.requestId}]`,
      {
        timestamp: metadata.timestamp,
        body: body ? this.sanitizeRequestBody(body) : undefined,
      },
    );
  }

  /**
   * Logs the completion of an API request.
   *
   * @param metadata - Request metadata including duration and status
   * @param response - Optional response data (will be sanitized)
   * @param error - Optional error that occurred during the request
   */
  logRequestComplete(
    metadata: RequestMetadata,
    response?: unknown,
    error?: Error,
  ): void {
    const duration = metadata.duration || 0;
    const status = metadata.status || 0;
    const size = metadata.size ? `(${metadata.size} bytes)` : '';

    if (error) {
      this.logger.error(
        `✗ ${metadata.method} ${metadata.endpoint} [${metadata.requestId}] - ${duration}ms - ${status} ${size}`,
        {
          error: error.message,
          stack: error.stack,
        },
      );
    } else {
      this.logger.debug(
        `✓ ${metadata.method} ${metadata.endpoint} [${metadata.requestId}] - ${duration}ms - ${status} ${size}`,
        {
          response: response ? this.sanitizeResponse(response) : undefined,
        },
      );
    }
  }

  /**
   * Logs API rate limiting events.
   *
   * @param requestId - Unique identifier for the rate-limited request
   * @param retryAfter - Optional number of seconds to wait before retrying
   */
  logRateLimit(requestId: string, retryAfter?: number): void {
    this.logger.warn(
      `Rate limit encountered [${requestId}]${
        retryAfter ? ` - retry after ${retryAfter}s` : ''
      }`,
    );
  }

  /**
   * Removes sensitive information from request bodies before logging.
   */
  private sanitizeRequestBody(body: unknown): unknown {
    if (typeof body !== 'object' || body === null) {
      return body;
    }

    // Create a deep copy and remove sensitive fields
    const sanitized = JSON.parse(JSON.stringify(body));
    this.removeSensitiveFields(sanitized);
    return sanitized;
  }

  /**
   * Removes sensitive information from API responses before logging.
   */
  private sanitizeResponse(response: unknown): unknown {
    if (typeof response !== 'object' || response === null) {
      return response;
    }

    const sanitized = JSON.parse(JSON.stringify(response));
    this.removeSensitiveFields(sanitized);
    return sanitized;
  }

  /**
   * Recursively removes sensitive fields from objects to prevent
   * accidental logging of API keys, passwords, and other secrets.
   */
  private removeSensitiveFields(obj: any): void {
    const sensitiveFields = ['password', 'token', 'key', 'secret', 'api_key'];

    if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        if (
          sensitiveFields.some((field) => key.toLowerCase().includes(field))
        ) {
          obj[key] = '[REDACTED]';
        } else if (typeof value === 'object' && value !== null) {
          this.removeSensitiveFields(value);
        }
      }
    }
  }
}
