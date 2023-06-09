import { HttpClientOptions } from './core';
/** An interface for all configuration parameters required by the SDK. */
export interface Configuration {
    timeout: number;
    squareVersion: string;
    additionalHeaders: Readonly<Record<string, string>>;
    userAgentDetail: string;
    environment: Environment;
    customUrl: string;
    accessToken: string;
    httpClientOptions?: Partial<HttpClientOptions>;
    unstable_httpClientOptions?: any;
}
/** Environments available for API */
export declare enum Environment {
    Production = "production",
    Sandbox = "sandbox",
    Custom = "custom"
}
