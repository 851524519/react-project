import Loadable from 'react-loadable'
import { Loading } from '../components'

// 下面注释的这个文件是 react-loadable 简单的原理实现
// import Loadable from './loadable'

// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'


// 下面是路由懒加载
const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading
})

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})

const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading
})

const ArticleList = Loadable({
    loader: () => import('./Article'),
    loading: Loading
})

const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading
})

const Notifications = Loadable({
    loader: () => import('./Notifications'),
    loading: Loading
})

const Noauth = Loadable({
    loader: () => import('./Noauth'),
    loading: Loading
})

export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications,
    Noauth
}