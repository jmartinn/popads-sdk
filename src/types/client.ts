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
 * Error response interface
 */
export interface ErrorResponse extends BaseApiResponse {
  status: 'failed';
  code: 403 | 404 | 500;
  messages: {
    [key: string]: string[];
  };
}
