import { BaseApiResponse } from './client';

export interface OptionsResponse<T> extends BaseApiResponse {
  data: T[];
}

export interface OptionList {
  id: string | number;
  label: string;
}

export interface Symbols {
  id: number;
  type: string;
  parent_id?: number;
  name: string;
  depth: 1 | 2 | 3;
}

export interface Category {
  id: number;
  label: string;
  parent_id?: number;
}
