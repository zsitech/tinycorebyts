import { Refresh } from '@element-plus/icons-vue/dist/types'
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
export default {
    // 登录页面
    login: {
        title: '登录',
        form: {
            user: '用户名',
            passwd: '密码'
        }
    },

    // 头像
    avatar: {
        items: {
            langBtn: 'English',
            exitBtn: '退出'
        }
    },

    // Dialog通用
    dialog: {
      title: {
        add: '添加',
        edit: '编辑',
        info: '信息',
        warning: '警告',
        error: '错误',
        select: '选择'
      }
    },
    // 常用提示框
    msgBox: {
      title: {
        info: '信息',
        warning: '警告',
        error: '错误'
      },
      button: {
        okBtn: '确定',
        cancelBtn: '取消'
      }
    },

    // 常用按钮
    button: {
        add: '新增',
        delete: '删除',
        edit: '编辑',
        search: '搜索',
        ok: '确认',
        cancel: '取消',
        refresh: '刷新',
        select: '选择'
    },

    // 分页
    page: {
      size: [5, 10, 15, 20, 25]
    },
    // 部门页面
    deptPage: {
      table: {
          id: 'ID',
          pid: 'PID',
          code: '部门编码',
          name: '部门名称',
          description: '部门描述',
          createdAt: '创建时间',
          updatedAt: '修改时间',
          managerCode: '负责人工号',
          managerName: '负责人',
          status: '状态',
          hasChildren: '是否有子级',
          action: '操作'
      },
      dialog: {
        titleAdd: '添加',
        titleEdit: '编辑',
        code: '部门编码',
        name: '部门名称',
        parent: '父级部门',
        description: '部门描述',
        status: '状态',
        hasChildren: '是否有子级',
        managerCode: '部门负责人',
        managerName: '部门负责人',
      },
      

    },
    // 员工页面
    employeePage: {
      table: {
          id: 'ID',
          code: '工号',
          name: '姓名',
          sex:  '性别',
          email: '电子邮件',
          mobile: '手机',
          tel: '电话',
          description: '描述',          
          status: '状态',
          deptId: '部门Id',
          deptCode: '部门编码',
          deptName: '部门名称',
          createdAt: '创建时间',
          updatedAt: '修改时间',
          deletedAt: '删除时间',
          action: '操作'
      },
      addDialog: {
        titleAdd: '添加员工',
        titleEdit: '员工编辑',
        code: '工号',
        name: '姓名',
        sex:  '性别',
        email: '电子邮件',
        mobile: '手机',
        tel: '电话',
        description: '描述',          
        status: '状态',
        deptId: '部门Id',
      }

    },
    // 用户页面
    userPage: {
      table: {
          id: 'ID',
          code: '用户编码',
          name: '用户名',
          empId: '工号',
          deptCode: '部门编码',
          deptName: '部门名称',
          status: '状态',
          action: '操作'
      },
      addDialog: {
        titleAdd: '添加用户',
        titleEdit: '编辑用户',
        code: '用户编码',
        name: '用户名',
        passwd: '密码',
        empId: '工号',
        deptCode: '部门编码',
        deptName: '部门名称',
      }

    },

    // 菜单
    menuList: [
        {
          path: '/home',
          component: 'HomeDefualt',
          meta: {
            pid: 0,
            id: 1,
            title: '首页',
            icon: 'HomeFilled',
            roles: []
          },
          children: []
        },
        {
          path: '/basic',
          component: 'Basic',
          meta: {
            pid: 0,
            id: 2,
            title: '基本配置',
            icon: 'Setting',
            roles: []
          },
          children: [
            {
              path: '/basic/department',
              component: 'Department',
              meta: {
                pid: 2,
                id: 21,
                title: '部门管理',
                icon: 'OfficeBuilding',
                roles: []
              },
              children: []
            },
            {
              path: '/basic/employee',
              component: 'Employee',
              meta: {
                pid: 2,
                id: 22,
                title: '员工管理',
                icon: 'User',
                roles: []
              },
              children: []
            },
          ]
        },  
        {
          path: '/config',
          component: 'Config',
          meta: {
            pid: 0,
            id: 2,
            title: '系统配置',
            icon: 'Setting',
            roles: []
          },
          children: [
            {
              path: '/config/user',
              component: 'User',
              meta: {
                pid: 2,
                id: 22,
                title: '用户管理',
                icon: 'User',
                roles: []
              },
              children: []
            },
            {
              path: '/config/role',
              component: 'Role',
              meta: {
                pid: 2,
                id: 23,
                title: '角色管理',
                icon: 'Collection',
                roles: []
              },
              children: []
            },
            {
              path: '/config/permission',
              component: 'Permission',
              meta: {
                pid: 2,
                id: 24,
                title: '权限管理',
                icon: 'Tickets',
                roles: []
              },
              children: []
            },
          ]
        },  
        {
          path: '/about',
          component: 'About',
          meta: {
            pid: 0,
            id: 99,
            title: '关于我们',
            icon: 'Location',
            roles: []
          },
          children: []
        },
        {
          path: '/dev',
          component: 'Dev',
          meta: {
            pid: 0,
            id: 99,
            title: '测试页面',
            icon: 'SetUp',
            roles: []
          },
          children: []
        },
      
    ],

    // 路由
    routesList: [
      {
          path: '/login',
          name: 'Login',
          meta: {title: "登录"},
          component: () => import('@/Login.vue'),     
      },    
      { 
          path: '/:pathMatch(.*)*', 
          name: 'NotFound', 
          component:() => import('@/components/404.vue')
      },
      {
          path: '/',
          meta: {title: "首页"}, 
          component: () => import('@/Home.vue'),
          redirect: '/home',
          children: [ 
              {
                  path: '/home',
                  name: 'HomeDefault',
                  meta: {title: "首页"},                
                  component: () => import('@components/HomeDefault.vue'),
                  children: []
              },    
              {
                  path: '/config',
                  name: 'Config',
                  meta: {title: "系统配置"},                
                  component: () => import('@views/Config.vue'),
                  children: [ 
                      {
                          path: '/config/user',
                          name: 'User',
                          meta: {title: "用户管理"},                
                          component: () => import('@views/user/User.vue')
                      },   
                      {
                          path: '/config/role',
                          name: 'Role',
                          meta: {title: "角色管理"},                
                          component: () => import('@/views/Roles.vue')
                      },   
                      {
                          path: '/config/permission',
                          name: 'Permission',
                          meta: {title: "权限管理"},                
                          component: () => import('@views/Permissions.vue')
                      },   
                  ]
              },           
              {
                  path: '/about',
                  name: 'About',
                  meta: {title: "关于我们"},                
                  component: () => import('@/views/About.vue')
              },           
              {
                  path: '/dev',
                  name: 'Dev',
                  meta: {title: "测试页面"},                
                  component: () => import('@/views/Dev.vue')
              },  
          ]
      },            
      
  ]
}
  