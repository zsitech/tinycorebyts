export interface IDepartment {
    id: string
    pid?:string
    code: string
    name: string
    description?: string
    status:boolean
    createdBy?:string
    createdAt?:string
    updatedBy?:string
    updatedAt?:string
    managerCode?: string
    managerName?: string
    hasChildren: boolean,
    children?: Array<IDepartment>
  }