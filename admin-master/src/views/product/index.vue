<template>
    <pro-table ref="table" title="列表" :request="getList" :columns="columns" :search="searchConfig"
        :pagination="paginationConfig" @selectionChange="handleSelectionChange">
        <!-- 工具栏 -->
        <template #toolbar>
            <el-button type="primary" icon="el-icon-delete" @click="batchDelete">
                批量删除
            </el-button>
            <el-button type="primary" icon="el-icon-plus" @click="$router.push('/product/addproduct')">
                添加一条
            </el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refresh">
                刷新
            </el-button>
        </template>
        <template #operate="scope">
            <el-button size="mini" type="primary" @click="$router.push(`/product/productdetail/${scope.row.id}`)">
                编辑
            </el-button>
            <el-button size="mini" type="danger" @click="deldata($event)">删除</el-button>
        </template>
    </pro-table>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { Getallproduct, DelProduct } from '@/api/product'
export default defineComponent({
    name: 'product',
    setup() {
        const state = reactive({
            // 表格列配置，大部分属性跟el-table-column配置一样
            columns: [
                { type: 'selection' },
                { label: '序号', type: 'index' },
                { label: 'id', prop: 'id' },
                // { label: '名称', prop: 'nickName', sortable: true, width: 180 },
                { label: 'CName', prop: 'CName' },
                { label: 'Cas', prop: 'Cas' },
                { label: 'EName', prop: 'EName' },
                { label: 'img', prop: 'img' },
                { label: 'molecularFormula', prop: 'molecularFormula' },
                { label: 'molecularWeight', prop: 'molecularWeight' },
                { label: 'page', prop: 'page' },
                {
                    label: '操作',
                    width: 180,
                    align: 'center',
                    tdSlot: 'operate', // 自定义单元格内容的插槽名称
                },
            ],
            // 分页配置
            paginationConfig: {
                layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
                pageSize: 5,
                limit: 5,
                pageSizes: [5, 10, 20, 50],
                style: { textAlign: 'left' },
            },
            selectedItems: [],
            batchDelete() {
         
                state.selectedItems.map(async (item) => {
                    console.log(item.id);
                    let result = await DelProduct(item.id)
                })
                refresh()
            },
            // 选择
            handleSelectionChange(arr) {
                state.selectedItems = arr
            },
            // 请求函数
            async getList(params) {
            console.log(params);
            // params是从组件接收的，包含分页和搜索字段。
              const result= await Getallproduct(params); 
              const data = result.data     
                return {
                    data: data,
                    total: result.total,
                }
            },
        })
        const table = ref(null)
        const refresh = () => {
            table.value.refresh()
        }
        const deldata = async (e) => {
            let id = e.currentTarget.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText
            let result = await DelProduct(id)
            refresh()
        }
        return { ...toRefs(state), refresh, table, deldata }
    },
})
</script>
