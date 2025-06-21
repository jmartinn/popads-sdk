import { BaseApiResponse } from './client';

/**
 * Response wrapper for options API endpoints.
 *
 * @template T - The type of option data returned
 */
export interface OptionsResponse<T> extends BaseApiResponse {
  /** Array of option data items */
  data: T[];
}

/**
 * Standard option item with ID and label.
 *
 * Used for simple options like countries, languages, connection types, etc.
 * where each option has a unique identifier and human-readable label.
 */
export interface OptionList {
  /** Unique identifier for the option */
  id: string | number;

  /** Human-readable label for the option */
  label: string;
}

/**
 * Hierarchical option item for tree-structured data.
 *
 * Used for options like browsers, operating systems, and devices where
 * items can have parent-child relationships and different types.
 */
export interface Symbols {
  /** Unique identifier for the symbol */
  id: number;

  /** Type or category of the symbol */
  type: string;

  /** ID of the parent symbol (for hierarchical relationships) */
  parent_id?: number;

  /** Name or label of the symbol */
  name: string;

  /** Depth level in the hierarchy (1 = root, 2 = child, 3 = grandchild) */
  depth: 1 | 2 | 3;
}

/**
 * Content category option for targeting specific types of content.
 *
 * Categories can be hierarchical, with subcategories belonging to parent categories.
 * Used for targeting campaigns to specific content types like entertainment, news, etc.
 */
export interface Category {
  /** Unique identifier for the category */
  id: number;

  /** Human-readable name of the category */
  label: string;

  /** ID of the parent category (for subcategories) */
  parent_id?: number;
}
