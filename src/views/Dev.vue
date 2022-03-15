<template>
  <div>
    <el-table
      :data="tableData1"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
interface User {
  id: number
  date: string
  name: string
  hasChildren?: boolean
  children?: User[]
}

const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  console.log(row.id)
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
    ])
  }, 1000)
}


const tableData1: User[] = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    hasChildren: true,
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
  },
]
</script>
