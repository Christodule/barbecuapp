import { Schema } from '../schema';
/** A category to which a `CatalogItem` instance belongs. */
export interface CatalogCategory {
    /** The category name. This is a searchable attribute for use in applicable query filters, and its value length is of Unicode code points. */
    name?: string;
    /**
     * The IDs of images associated with this `CatalogCategory` instance.
     * Currently these images are not displayed by Square, but are free to be displayed in 3rd party applications.
     */
    imageIds?: string[];
}
export declare const catalogCategorySchema: Schema<CatalogCategory>;
