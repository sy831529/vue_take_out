<template>
    <!--    <el-container/> ：用于构建页面框架-->
    <el-container style="height: 100%; border: 1px solid #eee">

        <!-- <el-aside/> :左侧菜单框架  -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

            <el-menu router :default-active=$route.path>
                <el-submenu v-for="(item,index) in $router.options.routes"
                            v-if="item.name!=null&&item.name==='订购菜品'" :index="index+''">
                    <template slot="title"><i class="el-icon-s-home"></i>{{item.name}}</template>
                    <el-menu-item v-for="(item2) in item.children" v-if="item2.name!=null" :index="item2.path">
                        <i class="el-icon-fork-spoon"></i>{{item2.name}}
                    </el-menu-item>
                </el-submenu>
                <el-submenu v-for="(item2,index2) in $router.options.routes"
                            v-if="item2.name!=null&&item2.name==='查看订单'" :index="index2+''">
                    <template slot="title"><i class="el-icon-s-order"></i>{{item2.name}}</template>
                    <el-menu-item v-for="(item2_1) in item2.children" v-if="item2.name!=null" :index="item2_1.path">
                        {{item2_1.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>

        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px" >
                <el-dropdown>
                    <i class="el-icon-s-custom" style="margin-right: 30px"  ></i>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item @click.native="toupdateUser">修改资料</el-dropdown-item>
                        <el-dropdown-item @click.native="toupdateByUserId">修改密码</el-dropdown-item>
                        <el-dropdown-item @click.native="updateuser">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown >
                <span>{{user.name}}</span>
            </el-header>

            <el-main >
                <!--  此处显示对应的子路由页面  -->
                <router-view ></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import updateByUserId from "./updateByUserId";

    export default {
        data() {
            return {
                jwt:require('jsonwebtoken'),
                user: {
                    id: '',
                    name: '',
                    authority: '',
                }
            }
        },
        created() {
        this.jwt.decode();
            this.user=JSON.parse(localStorage.getItem('user'));
            const token=localStorage.getItem('token');
            if(this.jwt.decode(token).authority!='user'){
                    this.$router.replace('/');
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'error',
                        message: '请使用用户账户登录后访问',
                    });

                // this.$alert( '请使用用户账户访问此页面', 'error:', {
                //     confirmButtonText: '确定',
                //     callback: action => {
                //         this.$router.push('/');
                //         this.$message({
                //             center: true,
                //             type: 'error',
                //             message: '请使用用户账户登录',
                //         });
                //     }
                // });
            }
        },
        methods: {
            updateuser(){
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                this.$router.push('/');
            },
            toupdateUser(){
                this.$router.push("/updateUser")
            },
            toupdateByUserId(){
                this.$router.push("/updateByUserId")
            },
        }
    }
</script>

<style scoped>

</style>