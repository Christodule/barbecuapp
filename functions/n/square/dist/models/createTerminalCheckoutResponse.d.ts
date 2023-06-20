import { Schema } from '../schema';
import { Error } from './error';
import { TerminalCheckout } from './terminalCheckout';
export interface CreateTerminalCheckoutResponse {
    /** Information about errors encountered during the request. */
    errors?: Error[];
    checkout?: TerminalCheckout;
}
export declare const createTerminalCheckoutResponseSchema: Schema<CreateTerminalCheckoutResponse>;
