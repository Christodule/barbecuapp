import { HttpMethod } from './httpRequest';
/**
 * An interface for all configuration parameters needed for retrying in case of transient failures.
 */
export interface RetryConfiguration {
    /** Maximum number of retries. */
    maxNumberOfRetries: number;
    /** Whether to retry on request timeout. */
    retryOnTimeout: boolean;
    /**
     * Interval before next retry.
     * Used in calculation of wait time for next request in case of failure.
     */
    retryInterval: number;
    /** Overall wait time for the requests getting retried. */
    maximumRetryWaitTime: number;
    /** Used in calculation of wait time for next request in case of failure. */
    backoffFactor: number;
    /** Http status codes to retry against. */
    httpStatusCodesToRetry: number[];
    /** Http methods to retry against. */
    httpMethodsToRetry: HttpMethod[];
}
/**
 * An enum to override retries for any endpoint.
 */
export declare enum RequestRetryOption {
    Enable = 0,
    Disable = 1,
    Default = 2
}
/**
 * Returns wait time for the request
 * @param retryConfig Configuration for retry
 * @param method HttpMethod of the request
 * @param allowedWaitTime Remaining allowed wait time
 * @param retryCount Retry attempt number
 * @param httpCode Status code received
 * @param headers Response headers
 * @param timeoutError Error from the server
 * @returns Wait time before the retry
 */
export declare function getRetryWaitTime(retryConfig: RetryConfiguration, allowedWaitTime: number, retryCount: number, httpCode?: number, headers?: Record<string, string>, timeoutError?: Error): number;
export declare function shouldRetryRequest(retryConfig: RetryConfiguration, retryOption: RequestRetryOption, httpMethod: HttpMethod): boolean;
//# sourceMappingURL=retryConfiguration.d.ts.map