/**
 * Base API response interface for PopAds API v2
 */
export interface BaseApiResponse {
  /** Response status indicator */
  status: 'success' | 'failed';

  /** HTTP status code */
  code: number;

  /** Number of records returned */
  records: number;
}

/**
 * Error response interface for failed API requests
 */
export interface ErrorResponse extends BaseApiResponse {
  status: 'failed';
  code: 403 | 404 | 500;

  /** Detailed error messages organized by field or category */
  messages: {
    [key: string]: string[];
  };
}

/**
 * Available log levels for controlling SDK output verbosity
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Logger interface for custom logging implementations.
 *
 * Implement this interface to provide custom logging behavior for the SDK.
 * All methods receive a message string and optional additional arguments.
 */
export interface Logger {
  /** Logs debug information (lowest priority) */
  debug(message: string, ...args: any[]): void;

  /** Logs general information */
  info(message: string, ...args: any[]): void;

  /** Logs warning messages */
  warn(message: string, ...args: any[]): void;

  /** Logs error messages (highest priority) */
  error(message: string, ...args: any[]): void;
}

/**
 * Configuration options for the PopAds client
 */
export interface ClientOptions {
  /**
   * Enable debug mode to log requests and responses
   * @default false
   */
  debug?: boolean;

  /**
   * Minimum log level to output
   * @default 'info'
   */
  logLevel?: LogLevel;

  /**
   * Custom logger implementation
   * If not provided, console will be used
   */
  logger?: Logger;

  /**
   * Custom base URL for the API
   * @default 'https://www.popads.net/apiv2'
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds
   * @default 30000 (30 seconds)
   */
  timeout?: number;

  /**
   * Enable request/response interception for debugging
   * @default false
   */
  enableInterception?: boolean;
}

/**
 * Metadata about an HTTP request for logging and debugging purposes
 */
export interface RequestMetadata {
  /** Unique identifier for tracking this specific request */
  requestId: string;

  /** HTTP method used (GET, POST, PUT, etc.) */
  method: string;

  /** API endpoint path that was called */
  endpoint: string;

  /** Timestamp when the request was initiated */
  timestamp: Date;

  /** Request duration in milliseconds (set when completed) */
  duration?: number;

  /** HTTP status code from the response */
  status?: number;

  /** Response size in bytes */
  size?: number;
}
