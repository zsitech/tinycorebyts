import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import ILoadingInstance, { ElMessage, ElLoading } from 'element-plus'

let BASE_URL = 'http://127.0.0.1:8000'
const TIME_OUT = 5000
let loading:any = null
const startLoading = () => {
    loading = ElLoading.service({
        lock: true,
        fullscreen: false,
        text: 'Loading......',
        background: 'rgba(0, 0, 0, 0.2)',
    })
}

const endLoading = () => {
    loading.close()
}

const config: AxiosRequestConfig = {
    timeout: TIME_OUT,                     
    baseURL: BASE_URL,
    headers: {
        get: "'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'",
        post: "'Content-Type': 'application/json;charset=utf-8'"
    },
    // withCredentials: false
}

const axiosInstance = axios.create(config)

// http请求拦截器
axiosInstance.interceptors.request.use(config => {
    startLoading()
    return config
}, err => {
    return err
})

// http响应拦截器
axiosInstance.interceptors.response.use((response:AxiosResponse) => {
    endLoading()    
    return response
}, err => {    
    endLoading()
    return showMessage(err.message)
})

// 封装错误提示对话框
const showMessage = (message: string, type:any = 'error', showClose = true) => {
    ElMessage({
        showClose, 
        message,
        type,       
        duration: 3 * 1000 
    })
    return Promise.reject()
}

export default axiosInstance 