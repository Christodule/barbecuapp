import { Schema } from '../schema';
import { LoyaltyProgramAccrualRuleCategoryData } from './loyaltyProgramAccrualRuleCategoryData';
import { LoyaltyProgramAccrualRuleItemVariationData } from './loyaltyProgramAccrualRuleItemVariationData';
import { LoyaltyProgramAccrualRuleSpendData } from './loyaltyProgramAccrualRuleSpendData';
import { LoyaltyProgramAccrualRuleVisitData } from './loyaltyProgramAccrualRuleVisitData';
/** Defines an accrual rule, which is how buyers can earn points. */
export interface LoyaltyProgramAccrualRule {
    /** The type of the accrual rule that defines how buyers can earn points. */
    accrualType: string;
    /**
     * The number of points that
     * buyers earn based on the `accrual_type`.
     */
    points?: number;
    /** Represents additional data for rules with the `VISIT` accrual type. */
    visitData?: LoyaltyProgramAccrualRuleVisitData;
    /** Represents additional data for rules with the `SPEND` accrual type. */
    spendData?: LoyaltyProgramAccrualRuleSpendData;
    /** Represents additional data for rules with the `ITEM_VARIATION` accrual type. */
    itemVariationData?: LoyaltyProgramAccrualRuleItemVariationData;
    /** Represents additional data for rules with the `CATEGORY` accrual type. */
    categoryData?: LoyaltyProgramAccrualRuleCategoryData;
}
export declare const loyaltyProgramAccrualRuleSchema: Schema<LoyaltyProgramAccrualRule>;
