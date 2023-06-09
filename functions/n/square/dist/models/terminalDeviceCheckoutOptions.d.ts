import { Schema } from '../schema';
import { TipSettings } from './tipSettings';
export interface TerminalDeviceCheckoutOptions {
    /** Instructs the device to skip the receipt screen. Defaults to false. */
    skipReceiptScreen?: boolean;
    tipSettings?: TipSettings;
}
export declare const terminalDeviceCheckoutOptionsSchema: Schema<TerminalDeviceCheckoutOptions>;
