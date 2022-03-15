import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
// import { RouteRecordRaw } from 'vue-router'
// 导入自定义的Tab接口
import { ITab } from './type'
// 导入菜单、路由
import { i18nVue } from '../i18n/i18nVue'
import { messages } from '../i18n/i18nVue'

export interface State {
  count: number
  isCollapse: boolean
  tabs: Array<ITab>
  menuList: Array<any>
  routesList: Array<any>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    isCollapse: false,
    tabs: [],
    menuList: i18nVue.global.locale.value === 'zh' ? messages['zh']['menuList'] : messages['en']['menuList'],
    routesList: i18nVue.global.locale.value === 'zh' ? messages['zh']['routesList'] : messages['en']['routesList']
  },

  mutations: {
    setIsCollapse:((state:State, isCollapse: boolean) => {
      state.isCollapse = isCollapse
    }),

    addTab:(state:State, tab: ITab) => {
      if(state.tabs.some(item => item.path === tab.path)) return  // 避免重复加入
      state.tabs.push(tab)
    },

    setMenuList:((state:State, lang: string) => {
      state.menuList = (lang === 'zh' ? messages['zh']['menuList'] : messages['en']['menuList'])
    }),

    setRoutesList:((state:State, lang: string) => {
      state.routesList = (lang === 'zh' ? messages['zh']['routesList'] : messages['en']['routesList'])
    }),

  },

  getters: {
    getIsCollapse: (state:State) => {
      return state.isCollapse
    },

    getTabs:(state:State) => {
      return state.tabs
    },

    getMenuList:(state:State) => {
      return state.menuList
    },

    getRoutesList:(state:State) => {
      return state.routesList
    },
  }

})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}