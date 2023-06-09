/// <reference types="node" />
import { HttpRequest } from '../http/httpRequest';
import { ApiResponse } from '../apiResponse';
import { SchemaValidationError } from '../schema';
/**
 * Thrown when the API response does not match the schema.
 */
export declare class ResponseValidationError extends Error implements ApiResponse<never> {
    request: HttpRequest;
    statusCode: number;
    headers: Record<string, string>;
    result: never;
    body: string | Blob | NodeJS.ReadableStream;
    errors: SchemaValidationError[];
    constructor(apiResponse: ApiResponse<any>, errors: SchemaValidationError[]);
}
//# sourceMappingURL=responseValidationError.d.ts.map