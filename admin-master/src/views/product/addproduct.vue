<template>
  <div class="productdetail">
    <el-form class="form" :model="model" ref="ProductForm" label-width="100px">
      <el-form-item prop="CName" label="产品名称">
        <el-input
          class="text"
          v-model="model.CName"
          clearable
          placeholder="产品名称"
        />
      </el-form-item>
      <el-form-item prop="EName" label="英文名称">
        <el-input
          class="text"
          v-model="model.EName"
          clearable
          placeholder="英文名称"
        />
      </el-form-item>
      <el-form-item prop="Cas" label="  CAS  ">
        <el-input
          class="text"
          v-model="model.Cas"
          clearable
          placeholder="CAS"
        />
      </el-form-item>
      <el-form-item prop="content" label="含量">
        <el-input
          class="text"
          v-model="model.content"
          clearable
          placeholder="含量"
        />
      </el-form-item>
      <el-form-item prop="molecularFormula" label="分子式">
        <el-input
          class="text"
          v-model="model.molecularFormula"
          clearable
          placeholder="分子式"
        />
      </el-form-item>
      <el-form-item prop="molecularWight" label="分子量">
        <el-input
          class="text"
          v-model="model.molecularWeight"
          clearable
          placeholder="分子量"
        />
      </el-form-item>
      <el-form-item label="类型" prop="region" width="100px">
        <el-select v-model="model.page" placeholder="类型">
          <el-option label="生化检验" value="sh"></el-option>
          <el-option label="医药中间体" value="yy"></el-option>
          <el-option label="材料化学" value="cl"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传图片" prop="img">
        <div class="img">
          <el-upload   
            class="avatar-uploader"
            action="/api/uploadPro/upImg"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="imageUrl" :src="`http://localhost:3001/public/pro-img/${imageUrl}`" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              +
            </el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="btn"
          @click="submit"
        >
          {{ btnText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  computed,
} from 'vue'
import { AddProduct, UploadImage } from '@/api/product'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'productdetail',
  setup() {
    const { proxy: ctx } = getCurrentInstance() // 可以把ctx当成vue2中的this
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      model: {
        CName: '',
        EName: '',
        Cas: '',
        content: '',
        molecularFormula: '',
        molecularWeight: '',
        img: '',
        page: '',
        id: '',
      },
      loading: false,
      btnText: computed(() => (state.loading ? '新增...' : '新增')),
      ProductForm: ref(null),
      submit: () => {
        if (state.loading) {
          return
        }
        state.ProductForm.validate(async valid => {
          if (valid) {
            state.loading = true
            state.model.id = Math.floor(Math.random() * 100) + '1'
            console.log(state.model)
            const result = await AddProduct(state.model)
            if (result.code == 200) {
              setTimeout(() => {
                state.loading = false
                ctx.$message.success({
                  message: '新增成功',
                  duration: 1000,
                })
                router.push('/product')
                state.model.CName = ''
                state.model.EName = ''
                state.model.Cas = ''
                state.model.molecularFormula = ''
                state.model.molecularWeight = ''
                state.model.content = ''
                state.model.page = ''
                state.model.img = ''
              }, 2000)
            }
          }
        })
      },
    })

    //图片上传
    const imageUrl = ref('')
    //图片上传成功
    const handleAvatarSuccess = (response, uploadFile) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw)
    }
    //在图片上传之前做的事情
    const beforeAvatarUpload = rawFile => {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    }

    const upload = async f => {
      console.log(f)
      // 1. 获取表单数据   fromData 表单数据
      let fromData = new FormData()
      fromData.append('file', f.file)
      // 2. 发起请求
      let result = await UploadImage(fromData)
      imageUrl.value = result.url
      state.model.img = imageUrl.value
    }

    return {
      ...toRefs(state),
      imageUrl,
      handleAvatarSuccess,
      beforeAvatarUpload,
      upload,
    }
  },
})
</script>

<style lang="scss" scoped>
.productdetail {
  color: $mainColor;
  width: 800px;
  .img {
    width: 178px;
    height: 178px;
    border: 1px solid red;
    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.name{
  background-image: url(http://localhost:3001/public/pro-img/165841655198116566472665222.jpg);
}
</style>
