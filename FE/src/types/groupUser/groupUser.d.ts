export interface tableGroupUserDataType {
    id: string;
    name: string;
    code: string;
    roleIds?: string[];
    roleNames?: string[];
    departmentId?: string;

}

export interface createEditType {
    id?: string;
    name: string;
    code: string;
    departmentId?: string;
}

export interface searchGroupUserData {
    name?: string;
    code?: string;
    departmentId?: string;

}
