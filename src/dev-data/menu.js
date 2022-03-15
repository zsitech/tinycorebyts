
const menu = [  
  {
    id: 0, name: '首页', hasChild: false, route: '/home/main', icon: 'HomeFilled', order: 0
  },
  {id: 1, name: '系统管理', hasChild: true, route: '/home/sysconfig', icon: 'Setting', order: 0, 
    'groups': [{id: 11, name: '系统',  
              'children': [{id: 111, name: '部门管理', hasChild: false,  route: '/home/sysconfig/dept', icon: 'OfficeBuilding', order: 1,    
                            },
                            {id: 112, name: '用户管理', hasChild: false,  route: '/home/sysconfig/user', icon: 'User', order: 2,   
                            },
                            {id: 113, name: '角色管理', hasChild: false, route: '/home/sysconfig/role', icon: 'Tickets', order: 3,  
                            },
                            {id: 114, name: '权限管理', hasChild: false, route: '/home/sysconfig/permission', icon: 'Lock', order: 4,  
                            },
                            {id: 115, name: '日志',  hasChild: false, route: '/home/sysconfig/journal', icon: 'Document', order: 5,          
                                            'groups': [{id: null, name: null, 'children': []}]
                            }
                            ]},
               {id: 12, name: '数据字典', 
              'children': [{id: 121,  name: '数据库',  hasChild: false, route: '/home/sysconfig/database', icon: 'IconMenu', order: 1,
                           }]
               }]        
            },
    {
      id: 2, name: '关于我们', hasChild: false, route: '/home/about', icon: 'Connection', order: 1
    },
    {
      id: 2, name: '开发测试页面', hasChild: false, route: '/home/test', icon: 'Coffee', order: 1
    }
]

export default menu;
