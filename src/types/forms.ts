import { FieldType } from "@/enums/form";

export interface FieldConfig {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder: string;
  required?: boolean;
  regex?: string;
  options?: { value: string | number | boolean; label: string; disable?: boolean }[];
  minLength?: number;
  maxLength?: number;
  styling?: { xs: number; sm: number; md: number; lg: number; xl: number };

}
export interface SectionConfig {
  id: string;
  sectionName: string;
  separator?: boolean;
  formFields: FieldConfig[];
}