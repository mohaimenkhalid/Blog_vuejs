import Home from './components/Home'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'

import Dashboard from './components/pages/Dashboard'
import Category from './components/pages/Category'
import Tag from './components/pages/Tag'
import CreateBlog from './components/pages/CreateBlog'
import BlogShow from './components/pages/BlogShow'

export const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/admin/logout', component: Logout },
  { path: '/register', component: Register },
  { path: '/admin/dashboard', component: Dashboard },
  { path: '/admin/category', component: Category },
  { path: '/admin/tags', component: Tag },
  { path: '/admin/blog/create', component: CreateBlog },
  { path: '/blog/:slug', component: BlogShow },
]
