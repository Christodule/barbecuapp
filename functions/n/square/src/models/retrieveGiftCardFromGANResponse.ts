import { array, lazy, object, optional, Schema } from '../schema';
import { Error, errorSchema } from './error';
import { GiftCard, giftCardSchema } from './giftCard';

/**
 * A response that contains a `GiftCard`. This response might contain a set of `Error` objects
 * if the request resulted in errors.
 */
export interface RetrieveGiftCardFromGANResponse {
  /** Any errors that occurred during the request. */
  errors?: Error[];
  /** Represents a Square gift card. */
  giftCard?: GiftCard;
}

export const retrieveGiftCardFromGANResponseSchema: Schema<RetrieveGiftCardFromGANResponse> = object(
  {
    errors: ['errors', optional(array(lazy(() => errorSchema)))],
    giftCard: ['gift_card', optional(lazy(() => giftCardSchema))],
  }
);
