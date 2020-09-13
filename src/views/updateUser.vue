<template>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center; margin-top: 30px;">
        <el-card  style="width: 450px">
            <div slot="header" class="clearfix">
                <span>修改资料:</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 80%;" label-width="100px" class="demo-ruleForm">

                <el-form-item label="id" prop="username">
                    <el-input v-model="ruleForm.id" :disabled="true">{{ruleForm.id}}</el-input>
                </el-form-item>

                <el-form-item label="账户名" prop="username">
                    <el-input v-model="ruleForm.username" :disabled="true">{{ruleForm.username}}</el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="nickname">
                    <el-input v-model="ruleForm.nickname">{{ruleForm.nickname}}</el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="ruleForm.telephone">{{ruleForm.telephone}}</el-input>
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
            return {
                user: {
                    id: '',
                    name: '',
                },
                ruleForm: {
                    id: '',
                    username: '',
                    nickname: '',
                    gender: 1,
                    telephone: '',
                    address: '',
                },
                rules: {
                    nickname: [
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
                        axios.post('http://localhost:8030/client/Userclient/update',_this.ruleForm)
                            .then(function (res) {
                                if(res.data){
                                    //  添加成功后消息提示框
                                    _this.$message({
                                        showClose: true,
                                        center: true,
                                        type: 'success',
                                        message: '账户《'+_this.ruleForm.username+'》:修改成功',
                                    });
                                    _this.user.id=_this.ruleForm.id;
                                    _this.user.name=_this.ruleForm.nickname;
                                    localStorage.setItem('user', JSON.stringify(_this.user));
                                    _this.$router.push('/orderfood1');
                                }else{
                                    _this.$alert('修改失败，详细信息请联系工作人员', 'error:', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            _this.$message({
                                                center: true,
                                                type: 'error',
                                                message: '修改失败',
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
                    _this.ruleForm = resp.data;
                    if(_this.ruleForm.gender==='男'){
                        _this.ruleForm.gender=1;
                    }else {
                        _this.ruleForm.gender=2;
                    }
                })
        }
    }
</script>