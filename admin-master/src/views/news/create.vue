<template>
  <div class="createPost-container">
    <el-form
      ref="postFormRef"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <el-row>
        <el-col>
          <el-form-item
            label-width="60px"
            style="margin-bottom: 40px"
            label="类型"
            class="postInfo-container-item"
            prop="type"
          >
            <!-- <el-input name="type" required v-model="postForm.type" /> -->
            <el-select
              v-model="postForm.type"
              class="filter-item"
              placeholder="请选择新闻类型"
            >
              <el-option label="企业新闻" value="企业新闻" />
              <el-option label="行内资讯" value="行内资讯" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item
            label-width="60px"
            label="题目"
            class="postInfo-container-item"
            prop="author"
          >
            <el-input name="title" required v-model="postForm.title" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div :style="{ textAlign: 'center' }">
            <el-button
              v-loading="loading"
              style="margin-left: 10px"
              type="success"
              @click="submitForm"
            >
              发布
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-form-item prop="content" style="margin-bottom: 30px">
        <RichEditor
          :model-value="postForm.content"
          @update:modelValue="handleUpdateValue"
        ></RichEditor>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import RichEditor from '@/components/Editor/richEditor.vue'
import { createNews } from '@/api/news'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    RichEditor,
  },
  setup() {
    const router = useRouter()
    const postFormRef = ref(null)
    const loading = ref(false)

    const postForm = reactive({
      type: '', //类型
      time: '', //时间
      num: '',
      frequency: '', // 点击次数
      title: '', // 文章题目
      content: '', // 文章内容
    })

    //自定义校验
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }

    const rules = reactive({
      title: [{ validator: validateRequire }],
      content: [{ validator: validateRequire }],
      type: [{ validator: validateRequire }],
    })

    const submitForm = () => {
      loading.value = true
      postFormRef.value.validate(async valid => {
        if (valid) {
          postForm.time = new Date().getTime()
          postForm.frequency = Math.floor(Math.random() * 10) + 1
          postForm.num = Math.floor(Math.random() * 100) + 100
          await createNews(postForm)
          ElNotification.success({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000,
          })
          postFormRef.value.resetFields()
          loading.value = false

          setTimeout(() => {
            router.push('/news/list')
          }, 500)
        }
      })
    }

    const handleUpdateValue = val => {
      postForm.content = val
    }

    return {
      postFormRef,
      handleUpdateValue,
      postForm,
      rules,
      postFormRef,
      submitForm,
      loading,
    }
  },
})
</script>
