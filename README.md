# vue-take-out
# take-out项目前端Vue项目源码部分：

- 前端项目技术栈： Vue + element ui + axios 
- 后端项目源码地址：https://github.com/sy831529/spring_cloud_take_out.git

## 各页面功能设计：
- login.vue :登录页面

## 用户页面：
- order.vue :用户账户首页页面
- register.vue :用户账户注册页面
- updateUser.vue :用户账户修改资料页面
- updateByUserId.vue :用户账户修改密码页面
- orderfood1.vue - orderfood5.vue :用户订购菜品页面
- Orderbyuser.vue :用户查询所有订单页面

## 管理员页面：
- index.vue :管理员账户首页页面
- updateByAdminId.vue :管理员账户修改密码页面
- Menumanage.vue :查询所有菜品页面
- MenuAdd.vue :添加菜品页面
- MenuUpdate.vue :修改菜品页面
- Ordermanage.vue :查询所有未处理订单页面
- Orderfinish.vue :查询所有已完成订单页面

## 页面访问权限相关设计：
  - 1，在用户登录成功以后，从后台使用JWT获取到包涵 用户：id，姓名：nickname/username，身份权限：authority，
三个属性的token令牌作为登录和身份权限认证，并注入到localStorage中。

  - 2，在rotuer/index.js文件中使用 router.beforeEach 注册一个全局前置守卫，判断页面是否需要登陆后才可访问，
放行登录和注册页面访问路径请求。访问其他页面时则以localStorage中是否保存有token为依据，来判断用户是否已登录，
含有token则放行，没有则跳转到登录首页页面。
  
 -  3，在index.vue和order.vue的初始化函数created()中解析localStorage中的token，然后判断其中authority参数值，
以此为依据判断账户是否权限访问对应页面，如果没有则跳转到登录页面提示用户使用对应账户登录后访问。

  - 4，在plugins/axios.js文件中配置axios的http request 拦截器，先判断localStorage中是否存在token，如果存在
的话，则每个http header都加上token，在后端验证此token，如果验证token已失效或者有效时间已过期则返回状态码401。
  - 然后配置axios的http response 拦截器捕捉状态码401错误，如果捕捉到则将localStorage中的用户信息和token删除，
并返回到登录页面提示用户重新登录
  

