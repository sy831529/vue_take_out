<template>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center; margin-top: 150px;">
        <el-card  style="width: 450px">
            <div slot="header" class="clearfix">
                <span>修改密码:</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 80%;" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="userpassword">
                    <el-input placeholder="请输入原密码" type="password" v-model="user.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input placeholder="请输入新密码" type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input placeholder="请再次输入密码" type="password" v-model="ruleForm.checkPassword" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success " @click="toregister('ruleForm')" icon="el-icon-success" plain>保存</el-button>
                    <el-button type="warning" @click="resetForm('ruleForm')" icon="el-icon-info" plain style="float: right;">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.ruleForm.checkPassword !== '') {
                        this.$refs.ruleForm.validateField('checkPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                user: {
                    id: '',
                    username: '',
                    password: '',
                },
                ruleForm: {
                    id: '',
                    password: '',
                    checkPassword: '',
                },
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        {min: 6, max: 12, message: '长度在 6 到 12 位', trigger: 'blur'}
                    ],
                    checkPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods:{
            toregister(ruleForm){
                const _this=this;
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8030/client/Accountclient/userAccount',_this.user)
                            .then(function (res) {
                                console.log(res.data)
                                if(res.data!=null&&res.data!=''){
                                    _this.ruleForm.id= _this.user.id;
                                    axios.post('http://localhost:8030/client/Userclient/updateById',_this.ruleForm)
                                    .then(function (res) {
                                        if(res.data){
                                            //  添加成功后消息提示框
                                            _this.$message({
                                                showClose: true,
                                                center: true,
                                                type: 'success',
                                                message: '密码修改成功,请重新登录',
                                            });
                                            localStorage.removeItem('user');
                                            localStorage.removeItem('token');
                                            _this.$router.push('/');
                                        }else{
                                            _this.$alert('密码修改失败，详细信息请联系工作人员', 'error:', {
                                                confirmButtonText: '确定',
                                                callback: action => {
                                                    _this.$message({
                                                        center: true,
                                                        type: 'error',
                                                        message: '密码修改失败',
                                                    });
                                                }
                                            });
                                        }
                                    })
                                }else{
                                    _this.$alert('原密码错误，请重新输入', 'error:', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            _this.$message({
                                                center: true,
                                                type: 'error',
                                                message: '原密码错误',
                                            });
                                        }
                                    });
                                }
                            });
                    }
                })
            },
            //  重置按钮函数
            resetForm(formName) {
                const _this=this
                //  危险按钮再次确认功能
                this.$confirm('确认取消修改吗?当前资料修改尚未保存,返回则所有修改将不会生效', '提示:', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$router.push('/orderfood1')
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'success',
                        message: '已取消修改!',
                    });
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'info',
                        message: '点击"确认保存"按钮可保存生效'
                    });
                });
            },
        },
        created() {
            const _this = this;
            const id=JSON.parse(localStorage.getItem('user')).id;
            axios.get('http://localhost:8030/client/Userclient/findById/'+id)
                .then(function (resp) {
                    _this.user.id = resp.data.id;
                    _this.user.username = resp.data.username;
                })
        }
    }
</script>