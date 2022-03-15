import { RandomUUIDOptions } from "crypto";

export interface IUser {
    id?: string,
    code: string,
    name: string,
    passwd: string,
    empId: string,
    deptCode: string,
    deptName: string
}