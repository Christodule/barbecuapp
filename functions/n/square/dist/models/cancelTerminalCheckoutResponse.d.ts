import { Schema } from '../schema';
import { Error } from './error';
import { TerminalCheckout } from './terminalCheckout';
export interface CancelTerminalCheckoutResponse {
    /** Information about errors encountered during the request. */
    errors?: Error[];
    checkout?: TerminalCheckout;
}
export declare const cancelTerminalCheckoutResponseSchema: Schema<CancelTerminalCheckoutResponse>;
