import {
  array,
  boolean,
  lazy,
  object,
  optional,
  Schema,
  string,
} from '../schema';
import { Address, addressSchema } from './address';
import {
  ChargeRequestAdditionalRecipient,
  chargeRequestAdditionalRecipientSchema,
} from './chargeRequestAdditionalRecipient';
import { Money, moneySchema } from './money';

/**
 * Defines the parameters that can be included in the body of
 * a request to the [Charge]($e/Transactions/Charge) endpoint.
 * Deprecated - recommend using [CreatePayment]($e/Payments/CreatePayment)
 */
export interface ChargeRequest {
  /**
   * A value you specify that uniquely identifies this
   * transaction among transactions you've created.
   * If you're unsure whether a particular transaction succeeded,
   * you can reattempt it with the same idempotency key without
   * worrying about double-charging the buyer.
   * See [Idempotency keys](https://developer.squareup.com/docs/working-with-apis/idempotency) for more information.
   */
  idempotencyKey: string;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  amountMoney: Money;
  /**
   * A payment token generated from the [Card.tokenize()](https://developer.squareup.com/reference/sdks/web/payments/objects/Card#Card.tokenize) that represents the card
   * to charge.
   * The application that provides a payment token to this endpoint must be the
   * _same application_ that generated the payment token with the Web Payments SDK.
   * Otherwise, the nonce is invalid.
   * Do not provide a value for this field if you provide a value for
   * `customer_card_id`.
   */
  cardNonce?: string;
  /**
   * The ID of the customer card on file to charge. Do
   * not provide a value for this field if you provide a value for `card_nonce`.
   * If you provide this value, you _must_ also provide a value for
   * `customer_id`.
   */
  customerCardId?: string;
  /**
   * If `true`, the request will only perform an Auth on the provided
   * card. You can then later perform either a Capture (with the
   * [CaptureTransaction]($e/Transactions/CaptureTransaction) endpoint) or a Void
   * (with the [VoidTransaction]($e/Transactions/VoidTransaction) endpoint).
   * Default value: `false`
   */
  delayCapture?: boolean;
  /**
   * An optional ID you can associate with the transaction for your own
   * purposes (such as to associate the transaction with an entity ID in your
   * own database).
   * This value cannot exceed 40 characters.
   */
  referenceId?: string;
  /**
   * An optional note to associate with the transaction.
   * This value cannot exceed 60 characters.
   */
  note?: string;
  /**
   * The ID of the customer to associate this transaction with. This field
   * is required if you provide a value for `customer_card_id`, and optional
   * otherwise.
   */
  customerId?: string;
  /**
   * Represents a postal address in a country.
   * For more information, see [Working with Addresses](https://developer.squareup.com/docs/build-basics/working-with-addresses).
   */
  billingAddress?: Address;
  /**
   * Represents a postal address in a country.
   * For more information, see [Working with Addresses](https://developer.squareup.com/docs/build-basics/working-with-addresses).
   */
  shippingAddress?: Address;
  /**
   * The buyer's email address, if available. This value is optional,
   * but this transaction is ineligible for chargeback protection if it is not
   * provided.
   */
  buyerEmailAddress?: string;
  /**
   * The ID of the order to associate with this transaction.
   * If you provide this value, the `amount_money` value of your request must
   * __exactly match__ the value of the order's `total_money` field.
   */
  orderId?: string;
  /**
   * The basic primitive of multi-party transaction. The value is optional.
   * The transaction facilitated by you can be split from here.
   * If you provide this value, the `amount_money` value in your additional_recipients
   * must not be more than 90% of the `amount_money` value in the charge request.
   * The `location_id` must be the valid location of the app owner merchant.
   * This field requires the `PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS` OAuth permission.
   * This field is currently not supported in sandbox.
   */
  additionalRecipients?: ChargeRequestAdditionalRecipient[];
  /**
   * A token generated by SqPaymentForm's verifyBuyer() that represents
   * customer's device info and 3ds challenge result.
   */
  verificationToken?: string;
}

export const chargeRequestSchema: Schema<ChargeRequest> = object({
  idempotencyKey: ['idempotency_key', string()],
  amountMoney: ['amount_money', lazy(() => moneySchema)],
  cardNonce: ['card_nonce', optional(string())],
  customerCardId: ['customer_card_id', optional(string())],
  delayCapture: ['delay_capture', optional(boolean())],
  referenceId: ['reference_id', optional(string())],
  note: ['note', optional(string())],
  customerId: ['customer_id', optional(string())],
  billingAddress: ['billing_address', optional(lazy(() => addressSchema))],
  shippingAddress: ['shipping_address', optional(lazy(() => addressSchema))],
  buyerEmailAddress: ['buyer_email_address', optional(string())],
  orderId: ['order_id', optional(string())],
  additionalRecipients: [
    'additional_recipients',
    optional(array(lazy(() => chargeRequestAdditionalRecipientSchema))),
  ],
  verificationToken: ['verification_token', optional(string())],
});
