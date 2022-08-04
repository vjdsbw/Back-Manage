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
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="btn"
          @click="submit"
        >
          {{ btnText }}
        </el-button>
        <el-button
          type="primary"
          class="btn"
          @click="$router.push('/product/addproduct')"
        >
          新增
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
import { GetProductDetail, UpdateProduct } from '@/api/product'
import { useStore } from 'vuex'
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
      btnText: computed(() => (state.loading ? '更新...' : '更新')),
      ProductForm: ref(null),
      submit: () => {
        if (state.loading) {
          return
        }
        state.ProductForm.validate(async valid => {
          if (valid) {
            state.loading = true
            console.log(state.model.page)
            const result = await UpdateProduct(state.model)
            if (result.code == 200) {
              setTimeout(() => {
                state.loading = false
                ctx.$message.success({
                  message: '更新成功',
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
    const product = async () => {
      let result = await GetProductDetail({ id: route.params.id })
      if (result.code == 200) {
        state.model.CName = result.data[0].CName
        state.model.EName = result.data[0].EName
        state.model.Cas = result.data[0].Cas
        state.model.molecularFormula = result.data[0].molecularFormula
        state.model.molecularWeight = result.data[0].molecularWeight
        state.model.content = result.data[0].content
        state.model.page = result.data[0].page
        state.model.img = result.data[0].img
        state.model.id = result.data[0].id
      } else {
        console.log(result)
      }
    }
    product()

    return {
      ...toRefs(state),
      product,
    }
  },
})
</script>

<style lang="scss" scoped>
.productdetail {
  color: $mainColor;
  width: 800px;
  .form {
    .img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
