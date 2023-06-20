import { Schema } from '../schema';
export interface BatchRetrieveCatalogObjectsRequest {
    /** The IDs of the CatalogObjects to be retrieved. */
    objectIds: string[];
    /**
     * If `true`, the response will include additional objects that are related to the
     * requested objects. Related objects are defined as any objects referenced by ID by the results in the `objects` field
     * of the response. These objects are put in the `related_objects` field. Setting this to `true` is
     * helpful when the objects are needed for immediate display to a user.
     * This process only goes one level deep. Objects referenced by the related objects will not be included. For example,
     * if the `objects` field of the response contains a CatalogItem, its associated
     * CatalogCategory objects, CatalogTax objects, CatalogImage objects and
     * CatalogModifierLists will be returned in the `related_objects` field of the
     * response. If the `objects` field of the response contains a CatalogItemVariation,
     * its parent CatalogItem will be returned in the `related_objects` field of
     * the response.
     * Default value: `false`
     */
    includeRelatedObjects?: boolean;
    /**
     * The specific version of the catalog objects to be included in the response.
     * This allows you to retrieve historical versions of objects. The specified version value is matched against
     * the [CatalogObject]($m/CatalogObject)s' `version` attribute. If not included, results will
     * be from the current version of the catalog.
     */
    catalogVersion?: bigint;
}
export declare const batchRetrieveCatalogObjectsRequestSchema: Schema<BatchRetrieveCatalogObjectsRequest>;
