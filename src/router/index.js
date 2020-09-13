import Vue from 'vue'
import VueRouter from 'vue-router'
import Menumanage from "../views/Menumanage";
import index from "../views/index";
import MenuUpdate from "../views/MenuUpdate";
import MenuAdd from "../views/MenuAdd";
import login from "../views/login";
import register from "../views/register";
import order from "../views/order";
import orderfood1 from "../views/orderfood1";
import orderfood2 from "../views/orderfood2";
import orderfood3 from "../views/orderfood3";
import orderfood4 from "../views/orderfood4";
import orderfood5 from "../views/orderfood5";
import Orderbyuser from "../views/Orderbyuser";
import Ordermanage from "../views/Ordermanage";
import Orderfinish from "../views/Orderfinish";
import updateUser from "../views/updateUser";
import updateByUserId from "../views/updateByUserId";
import updateByAdminId from "../views/updateByAdminId";

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: '菜品管理',
    component: index,
    redirect:"/Menumanage",
    children:[
      {
        path: '/Menumanage',
        name:'查询菜品',
        component: Menumanage
      },
      {
        path: '/MenuAdd',
        name:'添加菜品',
        component: MenuAdd
      },
      {
        path: '/MenuUpdate',
        component: MenuUpdate
      }
    ]
  },{
    path: '/index',
    name: '订单管理',
    component: index,
    children:[
      {
        path: '/Ordermanage',
        name:'未处理订单',
        component: Ordermanage
      },
      {
        path: '/Orderfinish',
        name:'已完成订单',
        component: Orderfinish
      }
    ]
  },{
    path: '/order',
    name: '订购菜品',
    component: order,
    redirect: "/orderfood1",
    children: [
      {
        path: '/orderfood1',
        name: '热菜',
        component: orderfood1,
      },
      {
        path: '/orderfood2',
        name: '凉菜',
        component: orderfood2,
      },
      {
        path: '/orderfood3',
        name: '汤羹',
        component: orderfood3,
      },
      {
        path: '/orderfood4',
        name: '主食',
        component: orderfood4,
      },
      {
        path: '/orderfood5',
        name: '烘焙',
        component: orderfood5,
      },
    ]
  },{
    path: '/order',
    name: '查看订单',
    component: order,
    children: [
      {
        path: '/Orderbyuser',
        name: '所有订单',
        component: Orderbyuser,
      }
    ]
  },
  {
    path: '/',
    name: '登录',
    component: login,
  },
  {
    path: '/register',
    name: '注册',
    component: register,
  },
  {
    path: '/updateUser',
    name: '修改资料',
    component: updateUser,
  },
  {
    path: '/updateByUserId',
    name: '用户修改密码',
    component: updateByUserId,
  },
  {
    path: '/updateByAdminId',
    name: '管理员修改密码',
    component: updateByAdminId,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/'||to.path ==='/register') {
    next();
    } else {
    let token = localStorage.getItem('token');

    if (token === null||token === '') {
      next('/');
    } else {
      next();
    }
  }
});

export default router
