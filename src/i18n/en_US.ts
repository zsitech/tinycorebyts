export default {
  // 登录页面
  login: {
    title: 'Login',
    form: {
        user: 'User',
        passwd: 'Password'
    }
  },
  
  // 头像
  avatar: {
      items: {
          langBtn: '中文',
          exitBtn: 'Exit'
      }
  },

  // Dialog通用
  dialog: {
    title: {
      add: 'Add',
      edit: 'Edit',
      info: 'Info',
      warning: 'Warning',
      error: 'Error',
      select: 'Select'
    }
  },

  // 常用提示框
  msgBox: {
    title: {
      info: 'Info',
      warning: 'Warning',
      error: 'Error'
    },
    button: {
      okBtn: 'OK',
      cancelBtn: 'Cancel'
    }
  },

  // 常用按钮
  button: {
    add: 'Add',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    ok: 'OK',
    cancel: 'Cancel',
    refresh: 'Refresh',
    select: 'Select'
  },
  // 分页
  page: {
    size: '[5, 10, 15, 20, 25]'
  },
  // 部门页面
  deptPage: {
    table: {
        id: 'ID',
        pid: 'PID',
        code: 'Department Code',
        name: 'Department Name',
        description: 'Description',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        managerCode: 'Manager',
        managerName: 'Manager Name',
        status: 'Status',
        hasChildren: 'Has Children',
        action: 'Action'
    },
    
    addDialog: {
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
    }

  },
  // 员工页面
  employeePage: {
    table: {
        id: 'ID',
        code: 'Employee Num',
        name: 'Name',
        sex:  'Sex',
        email: 'E-mail',
        mobile: 'Mobile',
        tel: 'Tel',
        description: 'description',          
        status: 'status',
        deptId: 'Department Id',
        deptCode: 'Department Code',
        deptName: 'Department Name',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        deletedAt: 'Deleted At',
        action: 'Action'
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
        code: 'User Code',
        name: 'User Name',
        empId: 'Employee Id',
        deptCode: 'Department Code',
        deptName: 'Department Name',
        status: 'Status',
        dept: 'Department',
        action: 'Aciton'
    },
    addDialog: {
      titleAdd: 'Add User',
      titleEdit: 'Edit User',
      code: 'User Code',
      name: 'User Name',
      passwd: 'Password',
      empId: 'Employee Id',
      deptCode: 'Department Code',
      deptName: 'Department Name',
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
        title: 'Home', // $t('login.title'), 
        icon: 'HomeFilled',
        roles: []
      },
      children: []
    },
    {
      path: '/basic',
      component: 'basic',
      meta: {
        pid: 0,
        id: 2,
        title: 'Basic Setting',
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
            title: 'Department',
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
            title: 'Employee',
            icon: 'User',
            roles: []
          },
          children: []
        }
      ]
    },  
    {
      path: '/config',
      component: 'Config',
      meta: {
        pid: 0,
        id: 2,
        title: 'System Setting',
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
            title: 'User',
            icon: 'User',
            roles: []
          },
          children: []
        },
        {
          path: '/config/role',
          component: 'Roles',
          meta: {
            pid: 2,
            id: 23,
            title: 'Roles',
            icon: 'Collection',
            roles: []
          },
          children: []
        },
        {
          path: '/config/permission',
          component: 'Permissions',
          meta: {
            pid: 2,
            id: 24,
            title: 'Permissions',
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
        title: 'About Us',
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
        title: 'Test Page',
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
  