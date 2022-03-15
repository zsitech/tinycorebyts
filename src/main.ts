import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'                  // 导入element-plus和样式
import 'element-plus/dist/index.css'                    // import 'element-plus/theme-chalk/index.css'
import * as Icons from '@element-plus/icons-vue'        // 导入图标
import { store, key } from './store/store'
import router from './router/index'
import i18nVue from './i18n/i18nVue'
// import locale from 'element-plus/lib/locale/lang/zh-cn' //引入中文
const app = createApp(App)
Object.keys(Icons).forEach(key => {     // 注册图标
    app.component(key, Icons[key as keyof typeof Icons])  // 先运算typeof Icons，再运算keyof
})

app
    .use(i18nVue)
    .use(store, key)
    .use(router)
    // .use(ElementPlus, {locale})         // 默认中文，目前发现分页器不默认在中文，显示会是英文
    .use(ElementPlus)
    .mount('#app')

