import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
} from '../views'


// 主路由
export const mainRouter = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}]

// 登陆后的路由
export const adminRouter = [{
    pathname: '/admin/dashboard',
    component: Dashboard
}, {
    pathname: '/admin/settings',
    component: Settings
}, {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true
}, {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
}]