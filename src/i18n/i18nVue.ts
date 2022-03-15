import { createI18n } from 'vue-i18n'
import zhLocal from 'element-plus/es/locale/lang/zh-cn'      // 默认语音
import enLocal from 'element-plus/es/locale/lang/en'         // 默认语音
import ZH from './zh_CN'
import EN from './en_US'


// 获取当前语言代码
const getCurrentLanguage = () =>{
    const lang = navigator.language
    const code = lang.indexOf('zh') !== -1 ? 'zh' : 'en'
    localStorage.setItem('lang', code)
    // return 'en'
    return code
}

export const messages = {
    // 登录页面
    zh: {
        ...ZH, 
        ...zhLocal
    },

    en: {
        ...EN, 
        ...enLocal
    },
}

export const i18nVue = createI18n({
    legacy: false,
    globalInjection: true,                  // 全局注入，如果不设置，需要每个页面单独引入
    locale: getCurrentLanguage() || 'zh',
    fallbackLocale: 'en',                   
    messages: messages
})

export default i18nVue