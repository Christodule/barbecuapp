import { Schema } from '../schema';
import { V1Money } from './v1Money';
/** V1PaymentModifier */
export interface V1PaymentModifier {
    /** The modifier option's name. */
    name?: string;
    appliedMoney?: V1Money;
    /** The ID of the applied modifier option, if available. Modifier options applied in older versions of Square Register might not have an ID. */
    modifierOptionId?: string;
}
export declare const v1PaymentModifierSchema: Schema<V1PaymentModifier>;
