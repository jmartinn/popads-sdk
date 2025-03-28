import https from 'https';

import { BaseApiResponse, ErrorResponse } from '../types/client';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Custom error class for unexpected SDK errors
 */
class SDKError extends Error {
  constructor(
    public status: number,
    public messages: Record<string, any>,
  ) {
    super(`API request failed with status ${status}`);
    this.name = 'SDKError';
  }
}

function isErrorResponse(response: BaseApiResponse): response is ErrorResponse {
  return response.status === 'failed';
}

function makeRequest<T extends BaseApiResponse>(
  apiKey: string,
  endpoint: string,
  method: HTTPMethod,
  body?: unknown,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'www.popads.net',
      path: `/apiv2${endpoint}?key=${encodeURIComponent(apiKey)}`,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData: T | ErrorResponse = JSON.parse(responseData);

          if (isErrorResponse(parsedData)) {
            // reject(parsedData);
            reject(new SDKError(parsedData.code, parsedData.messages));
            return;
          }
          resolve(parsedData);
        } catch (error) {
          reject(
            new SDKError(500, { error: `Invalid JSON response\n ${error}` }),
          );
        }
      });
    });

    req.on('error', (error) =>
      reject(new SDKError(500, { error: error.message })),
    );
    if (data) req.write(data);
    req.end();
  });
}

export { makeRequest, SDKError };
