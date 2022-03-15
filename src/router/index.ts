import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ref, reactive,computed } from 'vue'
import { useStore } from '../store/store'

const routes: Array<RouteRecordRaw> = [    {
        path: '/login',
        name: 'Login',
        meta: {title: '登录'},
        component: () => import('@/Login.vue'),     
    },    
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component:() => import('@/components/404.vue')
    },
    {
        path: '/',
        meta: {title: '首页'}, 
        component: () => import('@/Home.vue'),
        redirect: '/home',
        children: [ 
            {
                path: '/home',
                name: 'HomeDefault',
                meta: {title: '首页'},                
                component: () => import('@components/HomeDefault.vue'),
                children: []
            }, 
            {
                path: '/basic',
                name: 'Basic',
                meta: {title: '基本配置'},                
                component: () => import('@views/Basic.vue'),
                children: [ 
                    {
                        path: '/basic/department',
                        name: 'department',
                        meta: {title: '部门管理'},                
                        component: () => import('@views/Department/Department.vue')
                    },   
                    {
                        path: '/basic/employee',
                        name: 'Employee',
                        meta: {title: '员工管理'},                
                        component: () => import('@views/Employee/Employee.vue')
                    } 
                ]
            },        
            {
                path: '/config',
                name: 'Config',
                meta: {title: '系统配置'},                
                component: () => import('@views/Config.vue'),
                children: [  
                    {
                        path: '/config/user',
                        name: 'User',
                        meta: {title: '用户管理'},                
                        component: () => import('@views/user/User.vue')
                    },   
                    {
                        path: '/config/role',
                        name: 'Role',
                        meta: {title: '角色管理'},                
                        component: () => import('@/views/Roles.vue')
                    },   
                    {
                        path: '/config/permission',
                        name: 'Permission',
                        meta: {title: '权限管理'},                
                        component: () => import('@views/Permissions.vue')
                    },   
                ]
            },           
            {
                path: '/about',
                name: 'About',
                meta: {title: '关于我们'},                
                component: () => import('@/views/About.vue')
            },         
            {
                path: '/dev',
                name: 'Dev',
                meta: {title: '测试页面'},                
                component: () => import('@/views/Dev.vue')
            },   
        ]
    },            
    
]

const store = useStore()
const routesList = computed(() => {
    return store.getters['getRoutesList']
})

 const router = createRouter({
    history: createWebHistory(),
    routes: routes // routesList as any as Array<RouteRecordRaw>
}) 

// 全局路由守卫
router.beforeEach((to, from) => {
    if(to.matched[0].name === 'Login'){
        return true
    } else if(true){
        return true
    }
    return true
})

export default router