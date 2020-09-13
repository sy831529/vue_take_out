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
                    prop="menu.name"
                    label="菜品"
                    width="300">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="date"
                    label="下单时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="menu.price"
                    label="价格(元)"
                    width="150">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="user.address"
                    label="配送地址"
                    width="200">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="state"
                    label="是否配送完成"
                    width="150">
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
            page(currentPage) {
                const _this = this
                const uid = JSON.parse(localStorage.getItem('user')).id;
                axios.get('http://localhost:8030/client/Orderclient/findByUid/' + currentPage + '/5/' + uid)
                    .then(function (resp) {
                        console.log(resp);
                        _this.tableData = resp.data;
                        for (let i = 0; i < _this.tableData.length; i++) {
                            if (_this.tableData[i].state == 1) {
                                _this.tableData[i].state = '已完成';
                            } else {
                                _this.tableData[i].state = '未完成';
                            }
                            ;
                        }
                        ;
                    })
            },
        },
        // 初始化页面函数
        // created()函数会在页面加载完后自动调用一次,一般用于初始化页面获取数据
        created() {
            const _this=this
            const uid=JSON.parse(localStorage.getItem('user')).id;
            axios.get('http://localhost:8030/client/Orderclient/findByUid/1/5/'+uid)
                .then(function (resp){
                    console.log(resp);
                    //  后端使用Page<>类型返回的，所有从响应对象的.data.content对象中取得数据
                    _this.tableData=resp.data;
                    for(let i=0;i<_this.tableData.length;i++)
                    {
                        if (_this.tableData[i].state==1)
                        {
                            _this.tableData[i].state='已完成';
                        }else
                        {
                            _this.tableData[i].state='未完成';
                        };
                    };
                })
            axios.get('http://localhost:8030/client/Orderclient/countByUid/'+uid)
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