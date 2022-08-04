<template>
  <div class="container">
    <el-table :data="Lists" stripe style="width: 100%">
      <el-table-column
        align="center"
        header-align="center"
        prop="type"
        label="类型"
        width="80"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="time"
        label="发布时间"
        width="130"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="frequency"
        label="点击次数"
        width="100"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="title"
        width="220"
        label="标题"
      />
      <el-table-column label="内容" width="580" :show-overflow-tooltip="true">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <div class="ellipsis" v-html="scope.row.content"></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/news/exit/${scope.row.num}`)"
          >
            edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :current-page="current"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { getNews, deleteNews } from '@/api/news'
import { ElMessage } from 'element-plus'
export default {
  setup() {
    const Lists = ref([])
    const getList = async () => {
      let result = await getNews()
      result.code == 200 ? (Lists.value = result.data) : ''
    }
    getList()

    // 删除
    const handleDelete = async row => {
      deleteNews(row.num).then(response => {
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        window.location.reload()
      })
    }

    return { Lists, handleDelete }
  },
}
</script>
