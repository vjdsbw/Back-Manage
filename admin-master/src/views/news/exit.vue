<template>
  <div>
    <el-form
      :model="editForm"
      ref="formRef"
      :rules="rules"
      label-position="left"
      label-width="80px"
      style="width: 500px; margin-left: 50px"
    >
      <el-form-item required label="新闻类型" prop="type">
        <el-select
          v-model="editForm.type"
          class="filter-item"
          placeholder="请选择新闻类型"
        >
          <el-option label="企业新闻" value="企业新闻" />
          <el-option label="行内资讯" value="行内资讯" />
        </el-select>
      </el-form-item>
      <el-form-item required label="支出" prop="title">
        <el-input v-model="editForm.title" placeholder="请输入文章的标题" />
      </el-form-item>
      <el-form-item required label="内容" prop="content">
        <el-input
          v-model="editForm.content"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="closeTag({ reload: true })">取消</el-button>
        <el-button type="primary" @click="update()">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getNewsData, exitNews } from '@/api/news'
import { useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import useCloseTag from '@/hooks/useCloseTag'
import { ElMessage } from 'element-plus'
export default {
  setup(props) {
    const { closeTag } = useCloseTag()
    const route = useRoute()
    const state = reactive({
      rules: {
        type: [{ required: true, message: '新闻类型必填', trigger: 'change' }],
        title: [{ required: true, message: '新闻题目必填', trigger: 'blur' }],
        content: [{ required: true, message: '新闻内容必填', trigger: 'blur' }],
      },
      editForm: {
        type: '', //类型
        title: '', // 文章题目
        content: '', // 文章内容
        num: route.params.num,
      },
    })

    const getnewData = async () => {
      let result = await getNewsData(route.params.num)
      if (result.code == 200) {
        state.editForm.type = result.data[0].type
        state.editForm.title = result.data[0].title
        state.editForm.content = result.data[0].content
      }
    }
    getnewData()

    const update = async () => {
      console.log(state.editForm)
      exitNews(state.editForm).then(response => {
        ElMessage({
          message: '更新成功',
          type: 'success',
        })
        setTimeout(() => {
          closeTag.value({ reload: true })
        }, 1000)
      })
    }

    return { ...toRefs(state), closeTag, update }
  },
}
</script>
