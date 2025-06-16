export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'radio';

export interface Option {
  label: string;
  value: string;
}

export interface FieldConfig {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  minSelected?: number;
  maxSelected?: number;
  options?: Option[];
}
