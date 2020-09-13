<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="菜品"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格(元)"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="flavor"
                    label="口味"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="type.name"
                    label="种类"
                    width="150">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <!--   scope.row 为当前行数据对象 -->
                    <el-button @click="toBookUpdate(scope.row)" type="warning" icon="el-icon-edit-outline" size="small">修改</el-button>
                    <el-button @click="deleteBook(scope.row)" type="danger" icon="el-icon-delete" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--  <el-pagination/> 分页栏标签  -->
        <el-pagination style="top: 100%"
                background
                layout="prev, pager, next"
                :pager-count="9"
                :page-size="5"
                :total="total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        methods: {
            //  切换其他页数函数
            page(currentPage){
                const _this=this
                axios.get('http://localhost:8030/client/Menuclient/findAll/'+currentPage+'/5')
                    .then(function (resp){
                        console.log(resp);
                        _this.tableData=resp.data;
                    })
                    axios.get('http://localhost:8030/client/Menuclient/count')
                    .then(function (resp){
                        console.log(resp);
                        _this.total=resp.data;
                    })
            },
            // 跳转到修改页面函数
            toBookUpdate(row){
                const _this=this;
                //  危险按钮再次确认功能
                this.$confirm('是否修改信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$router.push({
                        path: '/MenuUpdate',
                        query: { id: row.id },
                    })
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'info',
                        message: '已取消修改操作！'
                    });
                });
            },
            // 删除提示弹框函数
            deleteBook(row){
                const _this=this
                //  危险按钮再次确认功能
                this.$confirm('将删除菜品《'+row.name+'》，请确认是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deleteById(_this,row);
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'info',
                        message: '已取消删除操作！'
                    });
                });
            },
            // 删除数据函数
            // 此处后台deleteById无返回值，则不判断后台返回数据
            deleteById(_this,row){
                axios.delete('http://localhost:8030/client/Menuclient/deleteById',{
                    params:{
                        id:row.id
                    }
                })
                    .then(function (res) {
                        console.log(res)
                        if(res.data){
                            _this.$message({
                                showClose: true,
                                center: true,
                                type: 'success',
                                message: '菜品《'+row.name+'》:删除成功',
                            });
                            //  如果删除成功则重新加载页面
                            setTimeout("window.location.reload()",1000);
                        }else {
                            _this.$alert( '菜品《'+row.name+'》删除失败,详情信息请联系技术人员!', 'error:', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$message({
                                        center: true,
                                        type: 'error',
                                        message: '菜品《'+row.name+'》:添加失败',
                                    });
                                }
                            });
                        }
                    });
            },
        },
         // 初始化页面函数
         // created()函数会在页面加载完后自动调用一次,一般用于初始化页面获取数据
        created() {
            const _this=this
            axios.get('http://localhost:8030/client/Menuclient/findAll/1/5')
                .then(function (resp){
                     console.log(resp);
                    //  后端使用Page<>类型返回的，所有从响应对象的.data.content对象中取得数据
                    _this.tableData=resp.data;
                })
            axios.get('http://localhost:8030/client/Menuclient/count')
                .then(function (resp){
                    console.log(resp);
                    // 通过data.totalElements获得数据库表中的总条数，并传给视图层使用
                    _this.total=resp.data;
                })
        },
        data() {
            return {
                total: null,
                tableData: null,
            }
        }
    }
</script>