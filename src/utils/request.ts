import { randomBytes } from 'crypto';
import https from 'https';

import { RequestLogger } from './logger';
import {
  BaseApiResponse,
  ClientOptions,
  ErrorResponse,
  RequestMetadata,
} from '../types/client';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Custom error class for PopAds SDK API errors.
 *
 * This error is thrown when API requests fail due to authentication issues,
 * validation errors, or server problems. It includes the HTTP status code
 * and detailed error messages from the API.
 *
 * @example
 * ```typescript
 * try {
 *   await client.campaign.getCampaign(999999);
 * } catch (error) {
 *   if (error instanceof SDKError) {
 *     console.log('Status:', error.status);
 *     console.log('Messages:', error.messages);
 *   }
 * }
 * ```
 */
class SDKError extends Error {
  /** HTTP status code from the API response */
  public status: number;

  /** Detailed error messages from the API, organized by field or category */
  public messages: Record<string, any>;

  /**
   * Creates a new SDKError instance.
   *
   * @param status - HTTP status code from the failed API request
   * @param messages - Error messages returned by the API, typically organized by field
   */
  constructor(status: number, messages: Record<string, any>) {
    super(`API request failed with status ${status}`);
    this.name = 'SDKError';
    this.status = status;
    this.messages = messages;
  }
}

function isErrorResponse(response: BaseApiResponse): response is ErrorResponse {
  return response.status === 'failed';
}

/**
 * Makes an authenticated HTTP request to the PopAds API.
 *
 * This is the core function that handles all API communication, including
 * authentication, request/response logging, error handling, and JSON parsing.
 * It automatically adds the API key and handles common error scenarios.
 *
 * @param apiKey - PopAds API key for authentication
 * @param endpoint - API endpoint path (e.g., '/campaign/details/123')
 * @param method - HTTP method to use
 * @param body - Request body data (will be JSON-encoded)
 * @param options - Client configuration options
 * @returns Promise that resolves to the parsed API response
 * @throws {SDKError} When the API returns an error or the request fails
 *
 * @internal This function is used internally by client classes and should not be called directly
 */
function makeRequest<T extends BaseApiResponse>(
  apiKey: string,
  endpoint: string,
  method: HTTPMethod,
  body?: unknown,
  options?: ClientOptions,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const requestId = randomBytes(8).toString('hex');

    const metadata: RequestMetadata = {
      requestId,
      method,
      endpoint,
      timestamp: new Date(),
    };

    const requestLogger =
      options?.debug || options?.enableInterception
        ? new RequestLogger(options.logger || console)
        : null;

    if (requestLogger) {
      requestLogger.logRequestStart(metadata, body);
    }

    const data = body ? JSON.stringify(body) : null;
    const baseUrl = options?.baseUrl || 'https://www.popads.net/apiv2';
    const url = new URL(`${baseUrl}${endpoint}`);
    url.searchParams.set('key', apiKey);

    const requestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'PopAds-SDK/1.5.0',
      },
      timeout: options?.timeout || 30000,
    };

    const req = https.request(requestOptions, (res) => {
      let responseData = '';
      const responseSize = parseInt(res.headers['content-length'] || '0', 10);

      metadata.status = res.statusCode;
      metadata.size = responseSize;

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        metadata.duration = Date.now() - startTime;

        try {
          const parsedData: T | ErrorResponse = JSON.parse(responseData);

          if (isErrorResponse(parsedData)) {
            const error = new SDKError(parsedData.code, parsedData.messages);

            // Log error response
            if (requestLogger) {
              requestLogger.logRequestComplete(metadata, undefined, error);
            }

            reject(error);
            return;
          }

          // Log successful response
          if (requestLogger) {
            requestLogger.logRequestComplete(metadata, parsedData);
          }

          resolve(parsedData);
        } catch (error) {
          const parseError = new SDKError(500, {
            error: `Invalid JSON response: ${error}`,
          });

          // Log parse error
          if (requestLogger) {
            requestLogger.logRequestComplete(metadata, undefined, parseError);
          }

          reject(parseError);
        }
      });
    });

    req.on('error', (error) => {
      metadata.duration = Date.now() - startTime;
      const sdkError = new SDKError(500, { error: error.message });

      if (requestLogger) {
        requestLogger.logRequestComplete(metadata, undefined, sdkError);
      }

      reject(sdkError);
    });

    req.on('timeout', () => {
      metadata.duration = Date.now() - startTime;
      const timeoutError = new SDKError(408, { error: 'Request timeout' });

      if (requestLogger) {
        requestLogger.logRequestComplete(metadata, undefined, timeoutError);
      }

      req.destroy();
      reject(timeoutError);
    });

    if (data) req.write(data);
    req.end();
  });
}

export { makeRequest, SDKError };
