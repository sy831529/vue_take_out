<template>
    <!--  Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，  -->
    <!--  并将 Form-Item 的 prop 属性设置为需校验的字段名即可。  -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 30%" label-width="100px" class="demo-ruleForm">

        <el-form-item label="菜品名称" prop="name">
            <el-input placeholder="请输入菜品名称" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="菜品价格" prop="price">
            <el-input placeholder="请输入菜品价格" v-model.number="ruleForm.price"></el-input>
        </el-form-item>

        <el-form-item label="菜品口味" prop="flavor">
            <el-input placeholder="请输入菜品口味" v-model="ruleForm.flavor"></el-input>
        </el-form-item>
        <el-form-item label="种类">
            <el-radio-group v-model="ruleForm.type.id" size="small">
                <el-radio :label="1">热菜</el-radio>
                <el-radio :label="2">凉菜</el-radio>
                <el-radio :label="3">汤羹</el-radio>
                <el-radio :label="4">主食</el-radio>
                <el-radio :label="5">烘焙</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="success " @click="submitForm('ruleForm')" icon="el-icon-document-add">添加</el-button>
            <el-button type="warning" @click="resetForm('ruleForm')" icon="el-icon-delete-solid">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    price: '',
                    flavor:'',
                    type:{
                        id:1,
                        name:'',
                    }
                },
                rules: {
                    name: [
                        // required 属性，表示为必填项，参数为boolean类型
                        // message 属性，表示当前规则不满足时则提示该文字，参数为String类型
                        // trigger 属性，表示什么事件触发校验，'blur' 表示当前输入框失去鼠标焦点时触发，参数为特定字符串
                        { required: true, message: '请输入菜品名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入菜品价格', trigger: 'blur' },
                        { type: 'number', message: '价格必须为数字值', trigger: 'blur'}
                    ],
                    flavor: [
                        { required: true, message: '请输入菜品口味', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            //  确认添加按钮提示函数
            submitForm(formName) {
                const _this=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 此处弹出提示框提示用户是否确认添加
                        this.$confirm('请确定是否添加菜品《'+_this.ruleForm.name+'》', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            _this.$options.methods.sendData(_this,formName);
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                        });
                    }
                })
            },
            //  添加数据函数
            sendData(_this,formName){
                axios.post('http://localhost:8030/client/Menuclient/save', _this.ruleForm)
                    .then(function (res) {
                        if(res.data){
                            //  添加成功后消息提示框
                            _this.$message({
                                showClose: true,
                                center: true,
                                type: 'success',
                                message: '菜品《'+_this.ruleForm.name+'》:添加成功',
                            });
                            //  如果提交成功则重置输入框,也可通过以下设置跳转到对应路由
                            //  _this.$router.push('/Menumanage')
                            _this.$refs[formName].resetFields();
                        }else{
                            _this.$alert( '菜品《'+_this.ruleForm.name+'》添加失败,详情信息请联系技术人员!', 'error:', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$message({
                                        center: true,
                                        type: 'error',
                                        message: '菜品《'+_this.ruleForm.name+'》:添加失败',
                                    });
                                }
                            });
                        }
                    });
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