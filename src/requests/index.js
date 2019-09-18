import axios from 'axios'
import { message } from 'antd'
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/230215' : ''
})

// 拦截器
service.interceptors.request.use((config) => {
    config.data = Object.assign({}, config.data, {
        // authToken: window.localStorage.getItem('authToken')
        authToken: 'itisatokenplaceholder'
    })
    return config
})

service.interceptors.response.use((resp) => {
    if(resp.data.code === 200) {
        return resp.data.data
    } else {
        // 全局处理错误
        message.error(resp.data.errMsg)
    }
})

// 获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
    return service.post('/api/v1/articleList', {
        offset,
        limited
    })
}

// 通过id删除文章
export const deleteArticleById = (id) => {
    return service.post(`/api/v1/articleDelete/${id}`)
}

// 通过id获取文章
export const getArticleById = (id) => {
    return service.post(`/api/v1/article/${id}`)
}

// 保存文章
export const saveArticle = (id, data) => {
    return service.post(`/api/v1/articleEdit/${id}`, data)
}

// 获取文章阅读量
export const getArticleAmount = () => {
    return service.post('/api/v1/articleAmount')
}