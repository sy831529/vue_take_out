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
                    width="450">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格(元)"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="flavor"
                    label="口味"
                    width="150">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                <template slot-scope="scope">
                    <!--   scope.row 为当前行数据对象 -->
                    <el-button @click="save(scope.row)" icon="el-icon-circle-check" size="small" type="primary" round>订购</el-button>
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
                axios.get('http://localhost:8030/client/Menuclient/findByTid/'+currentPage+'/5/1')
                    .then(function (resp){
                        console.log(resp);
                        _this.tableData=resp.data;
                    })
            },
            // 删除提示弹框函数
            save(row){
                const _this=this
                //  危险按钮再次确认功能
                this.$confirm('将订购菜品《'+row.name+'》，请确认是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.tosave(_this,row);
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'info',
                        message: '已取消订购操作！'
                    });
                });
            },
            // 删除数据函数
            // 此处后台deleteById无返回值，则不判断后台返回数据
            tosave(_this,row){
                _this.order.user.id=JSON.parse(localStorage.getItem('user')).id;
                _this.order.menu.id=row.id;
                axios.post('http://localhost:8030/client/Orderclient/save',_this.order)
                    .then(function (res) {
                    console.log(res)
                    if(res.data){
                        _this.$message({
                            showClose: true,
                            center: true,
                            type: 'success',
                            message: '菜品《'+row.name+'》:订购成功',
                        });
                        //  如果删除成功则重新加载页面
                    }else {
                        _this.$alert( '菜品《'+row.name+'》订购失败,详情信息请联系技术人员!', 'error:', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.$message({
                                    center: true,
                                    type: 'error',
                                    message: '菜品《'+row.name+'》:订购失败',
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
            axios.get('http://localhost:8030/client/Menuclient/findByTid/1/5/1')
                .then(function (resp){
                    //  后端使用Page<>类型返回的，所有从响应对象的.data.content对象中取得数据
                    _this.tableData=resp.data;
                })
            axios.get('http://localhost:8030/client/Menuclient/countByTid/1')
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
                order:{
                    user: {
                        id: '',
                    },
                    menu: {
                        id: '',
                    }
                }
            }
        }
    }
</script>