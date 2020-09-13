<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    align="center"
                    prop="id"
                    label="订单编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="user.nickname"
                    label="用户名称"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="menu.name"
                    label="菜品"
                    width="200">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="user.telephone"
                    label="用户电话"
                    width="150">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="user.address"
                    label="用户地址"
                    width="125">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="date"
                    label="下单时间"
                    width="175">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="admin.username"
                    label="处理人员"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    fixed="right"
                    label="操作"
                    width="150">
                <template slot-scope="scope">
                    <!--   scope.row 为当前行数据对象 -->
                    <el-button @click="deleteBook(scope.row)" icon="el-icon-delete" size="small" type="danger" round>删除订单</el-button>
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
                axios.get('http://localhost:8030/client/Orderclient/findByStateOne/'+currentPage+'/5/1')
                    .then(function (resp){
                        _this.tableData=resp.data;
                    })
            },
            // 删除提示弹框函数
            deleteBook(row){
                const _this=this
                //  危险按钮再次确认功能
                this.$confirm('是否删除编号为《'+row.id+'》的订单，请确认是否继续', '提示', {
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
                axios.delete('http://localhost:8030/client/Orderclient/deleteById/'+row.id)
                    .then(function (res) {
                        console.log(res)
                        if(res.data){
                            _this.$message({
                                showClose: true,
                                center: true,
                                type: 'success',
                                message: '编号为《'+row.id+'》的订单删除成功',
                            });
                            //  如果删除成功则重新加载页面
                            setTimeout("window.location.reload()",1000);
                        }else {
                            _this.$alert( '编号为《'+row.id+'》的订单删除失败,详情信息请联系技术人员!', 'error:', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$message({
                                        center: true,
                                        type: 'error',
                                        message: '编号为《'+row.id+'》的订单删除失败',
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
            axios.get('http://localhost:8030/client/Orderclient/findByStateOne/1/5/1')
                .then(function (resp){
                    //  后端使用Page<>类型返回的，所有从响应对象的.data.content对象中取得数据
                    _this.tableData=resp.data;
                })
            axios.get('http://localhost:8030/client/Orderclient/countByState/1')
                .then(function (resp){
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