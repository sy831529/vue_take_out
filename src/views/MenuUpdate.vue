<template>
    <!--  Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，  -->
    <!--  并将 Form-Item 的 prop 属性设置为需校验的字段名即可。  -->
    <el-form :model="ruleForm" :rules="rules" style="width: 33%" ref="ruleForm"
             label-position="right" label-width="100px" class="demo-ruleForm">

        <el-form-item label="编号">
            <el-input v-model="ruleForm.id" :disabled="true">{{ruleForm.id}}</el-input>
        </el-form-item>

        <el-form-item label="菜品" prop="name">
            <el-input v-model="ruleForm.name" >{{ruleForm.name}}</el-input>
        </el-form-item>

        <el-form-item label="价格" prop="price">
            <el-input v-model.number="ruleForm.price">{{ruleForm.price}}</el-input>
        </el-form-item>

        <el-form-item label="口味" prop="flavor">
            <el-input v-model="ruleForm.flavor">{{ruleForm.flavor}}</el-input>
        </el-form-item>
        <el-form-item label="种类" >
            <el-radio-group v-model="ruleForm.type.id" size="small">
                <el-radio :label="1">热菜</el-radio>
                <el-radio :label="2">凉菜</el-radio>
                <el-radio :label="3">汤羹</el-radio>
                <el-radio :label="4">主食</el-radio>
                <el-radio :label="5">烘焙</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>

            <el-button type="success" @click="submitForm('ruleForm')" icon="el-icon-check">确认保存</el-button>
            <el-button type="warning" @click="resetForm()" icon="el-icon-close">取消保存</el-button>

        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        //  初始化函数
        created() {
            const _this=this;
            axios.get('http://localhost:8030/client/Menuclient/findById/'+this.$route.query.id)
                .then(function (res){
                    console.log(res)
                    _this.ruleForm = res.data;
                })
        },
        data() {
            return {
                ruleForm: {
                    id:'',
                    name: '',
                    price: '',
                    flavor:'',
                    type:{
                        id:'',
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
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            //  确认保存按钮绑定事件
            submitForm(formName) {
                const _this=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$options.methods.updateData(_this);
                    }
                })
            },
            // 保存修改数据函数
            updateData(_this){
                axios.post('http://localhost:8030/client/Menuclient/update', _this.ruleForm)
                    .then(function (res) {
                        if(res.data){
                            _this.$message({
                                showClose: true,
                                center: true,
                                type: 'success',
                                message: '菜品《'+_this.ruleForm.name+'》:信息修改成功',
                            });
                            //  如果修改成功则跳转到对应路由
                            _this.$router.push('/Menumanage')
                        }else{
                            _this.$alert('菜品《'+_this.ruleForm.name+'》信息修改失败,详情信息请联系技术人员!', 'error:', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$message({
                                        center: true,
                                        type: 'error',
                                        message: '菜品《'+_this.ruleForm.name+'》:信息修改失败',
                                    });
                                }
                            });
                        }
                    });
            },
            //  取消保存按钮绑定事件
            resetForm() {
                const _this=this
                //  危险按钮再次确认功能
                this.$confirm('确认取消修改吗?当前资料修改尚未保存,返回则所有修改将不会生效', '提示:', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //  如果取消修改则跳转到/Menumanage
                    _this.$router.push('/Menumanage')
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
            }
        },
    }
</script>