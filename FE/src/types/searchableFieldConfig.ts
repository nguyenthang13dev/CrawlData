export interface AuditableEntity {
  id: string | number;
}

export interface SearchableFieldConfigType extends AuditableEntity {
  entityName: string;
  fieldName: string;
  fieldLabel: string;
  isSearchable?: boolean
  isHidden?: boolean
}

export interface GetFieldConfigType extends AuditableEntity {
  entityName: string;
  fieldName: string;
  fieldLabel: string;
}