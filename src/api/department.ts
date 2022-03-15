import { AxiosResponse } from 'axios';
import  axiosInstance  from '../utils/axios'
import { ElMessage } from 'element-plus'
// import qs from 'qs'

export const api = {
    add: async (url: any, {data }: any) => {
        try {
            const res = await axiosInstance({
                method: 'post',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
            });
            ElMessage({
                showClose: true,
                message: '数据添加成功!',
                type: 'success',
            });
        } catch (err) {
            console.log(err);
        }
    },
    del: async (url: any, { params }: any) => {   // ES6语法{}
        try {
            const res = await axiosInstance({
                method: 'delete',
                url: url,
                headers: {
                    'Content-Type': 'Content-Type: application/x-www-form-urlencoded'
                },
                params: { id: params }
            });            
            ElMessage({
                showClose: true,
                message: '数据删除成功!',
                type: 'success',
            });
        } catch (err) {            
            console.log(err);                     
            ElMessage({
                showClose: true,
                message: '数据删除成功!',
                type: 'success',
            });
        }
    },
    update: async (url: any, { data }: any) => {
        try {
            const res = await axiosInstance({
                method: 'put',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                },
                data: data,
            });
            ElMessage({
                showClose: true,
                message: '数据更新成功!',
                type: 'success',
            });
        } catch (err) {
            console.log(err);
        }
    },
    findAll: (url: any) => {
        return axiosInstance.get(url)
    },    
    findTop: (url: any) => {
        return axiosInstance.get(url)
    },
    findFirst: (url: any) => {
        return axiosInstance.get(url)
    },
    findByPid: (url: any, params: any) => {  
        return axiosInstance.get(url,{
            params: params,
        })     
    }
} 

