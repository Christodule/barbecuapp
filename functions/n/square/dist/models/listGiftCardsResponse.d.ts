import { Schema } from '../schema';
import { Error } from './error';
import { GiftCard } from './giftCard';
/**
 * A response that contains a list of `GiftCard` objects. If the request resulted in errors,
 * the response contains a set of `Error` objects.
 */
export interface ListGiftCardsResponse {
    /** Any errors that occurred during the request. */
    errors?: Error[];
    /** The requested gift cards or an empty object if none are found. */
    giftCards?: GiftCard[];
    /**
     * When a response is truncated, it includes a cursor that you can use in a
     * subsequent request to retrieve the next set of gift cards. If a cursor is not present, this is
     * the final response.
     * For more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination).
     */
    cursor?: string;
}
export declare const listGiftCardsResponseSchema: Schema<ListGiftCardsResponse>;
