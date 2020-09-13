<template>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center; margin-top: 150px;">
        <el-card  style="width: 450px">
            <div slot="header" class="clearfix">
                <span>用户登录:</span>
                <el-link type="primary" style="float: right; padding: 3px 0" @click="toregister()">没有账户？立即注册</el-link>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 80%;" label-width="100px" class="demo-ruleForm">

                <el-form-item label="账户" prop="username">
                    <el-input placeholder="请输入账户" v-model="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="登录身份">
                    <el-radio-group v-model="ruleForm.loginid" size="small">
                        <el-radio :label="1">普通用户</el-radio>
                        <el-radio :label="2">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="success " @click="tologin('ruleForm')" icon="el-icon-success" plain>登录</el-button>
                    <el-button type="warning" @click="resetForm('ruleForm')" icon="el-icon-info" plain style="float: right;">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>

</template>
<script>
    import register from "./register";

    export default {
        data() {
            return {
                jwt:require('jsonwebtoken'),
                user: {
                    id: '',
                    name: '',
                    authority: '',
                },
                ruleForm: {
                    username: '',
                    password: '',
                    loginid: 1,
                    url:'',
                },
                rules: {
                    username: [
                        // required 属性，表示为必填项，参数为boolean类型
                        // message 属性，表示当前规则不满足时则提示该文字，参数为String类型
                        // trigger 属性，表示什么事件触发校验，'blur' 表示当前输入框失去鼠标焦点时触发，参数为特定字符串
                        {required: true, message: '请输入账户名', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '长度在 6 到 12 位', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            toregister(){
                this.$router.push("/register")
            },
            //  登录函数
            tologin(ruleForm){
                const _this=this;
                if (_this.ruleForm.loginid===1){
                    _this.ruleForm.url= 'http://localhost:8030/client/Accountclient/userAccount';
                }else if (_this.ruleForm.loginid===2)
                {
                    _this.ruleForm.url= 'http://localhost:8030/client/Accountclient/adminAccount';
                }
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                    axios.post(_this.ruleForm.url,_this.ruleForm)
                        .then(function (res) {
                            if(res.data!==''&&res.data!==null){
                                _this.user=_this.jwt.decode(res.data);
                                localStorage.setItem('user', JSON.stringify(_this.user));
                                localStorage.setItem('token', res.data);
                                //  添加成功后消息提示框
                                _this.$message({
                                    showClose: true,
                                    center: true,
                                    type: 'success',
                                    message: '账户《'+_this.ruleForm.username+'》:登录成功',
                                });
                                if (_this.ruleForm.loginid===1){
                                    _this.$router.push('/order');
                                }else {
                                    _this.$router.push('/index');
                                }
                            }else{
                                _this.$alert('登录失败，账号名或密码错误', 'error:', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$message({
                                            center: true,
                                            type: 'error',
                                            message: '登录失败，账号名或密码错误',
                                        });
                                    }
                                });
                            }
                        });
                    }
                })
            },
            //  重置按钮函数
            resetForm(ruleForm) {
                this.$refs[ruleForm].resetFields();
                this.$message({
                    showClose: true,
                    center: true,
                    type: 'success',
                    message: '重置成功!',
                });
            }
        },
    }
</script>