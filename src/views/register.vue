<template>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center">
        <el-card  style="width: 450px">
            <div slot="header" class="clearfix">
                <span>用户注册:</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 80%;" label-width="100px" class="demo-ruleForm">

                <el-form-item label="账户" prop="username">
                    <el-input placeholder="请输入账户" v-model="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input placeholder="请再次输入密码" type="password" v-model="ruleForm.checkPassword" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="nickname">
                    <el-input placeholder="请输入姓名" v-model="ruleForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input placeholder="请输入电话" v-model="ruleForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="ruleForm.gender" size="small">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input placeholder="请输入地址" v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success " @click="toregister('ruleForm')" icon="el-icon-success" plain>注册</el-button>
                    <el-button type="warning" @click="resetForm('ruleForm')" icon="el-icon-info" plain style="float: right;">重置</el-button>
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
                    callback(new Error('请输入密码'));
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
                ruleForm: {
                    username: '',
                    password: '',
                    checkPassword: '',
                    nickname: '',
                    gender: 1,
                    telephone: '',
                    registerdate: Date.now(),
                    address: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账户名', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        {min: 6, max: 12, message: '长度在 6 到 12 位', trigger: 'blur'}
                    ],
                    checkPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],nickname: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],telephone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                        {min: 11, max: 11, message: '长度为  11 个字符', trigger: 'blur'}
                    ],address: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                }
            };
        },
        methods:{
            toregister(ruleForm){
                const _this=this;
                if(_this.ruleForm.gender==1){
                    _this.ruleForm.gender='男';
                }else {
                    _this.ruleForm.gender='女';
                }
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8030/client/Userclient/save',_this.ruleForm)
                            .then(function (res) {
                                if(res.data){
                                    //  添加成功后消息提示框
                                    _this.$message({
                                        showClose: true,
                                        center: true,
                                        type: 'success',
                                        message: '账户《'+_this.ruleForm.username+'》:注册成功，请重新登录',
                                    });
                                    _this.$router.push('/');
                                }else{
                                    _this.$alert('注册失败，账号名重复', 'error:', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            _this.$message({
                                                center: true,
                                                type: 'error',
                                                message: '注册失败',
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
                this.$confirm('此操作将重置输入框内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$refs[formName].resetFields();
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'success',
                        message: '重置成功!',
                    });
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'info',
                        message: '已取消重置'
                    });
                });
            }
        }
    }
</script>