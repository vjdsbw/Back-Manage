<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-23 15:16:12
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="home">
    <div>
      用户姓名:{{ userName }} 用户昵称：{{ nickname }} 联系方式：{{ email }}
    </div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="公司邮箱">
        <el-input v-model="formInline.email" placeholder="公司邮箱"></el-input>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input
          v-model="formInline.address"
          placeholder="公司地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formInline.tel" placeholder="联系电话"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="公司简介">
        <el-input
          style="width:500px;height: 150px;"
          type="textarea"
          v-model="formInline.introduce"
          placeholder="简介"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { GetContact } from '@/api/login'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'home',
  setup() {
    const store = useStore()
    const state = reactive({
      formInline: {
        email: '',
        address: '',
        tel: '',
        introduce: '',
      },
      userName: '',
      email: '',
      nickname: '',
    })

    const onSubmit = () => {}
    const get = async () => {
      let result = await GetContact()
      console.log(result);
      if (result.code == 200) {
        state.userName = store.state.account.user.name
        state.email = store.state.account.user.email
        state.nickname = store.state.account.user.nickname
        state.formInline.email = result.data.email
        state.formInline.address = result.data.address
        state.formInline.introduce = result.data.introduce
        state.formInline.tel = result.data.tel
      }
    }
    get()
    return {
      ...toRefs(state),
      onSubmit,
      get,
    }
  },
})
</script>

<style lang="scss" scoped>
.home {
  color: $mainColor;
}
:deep(.el-textarea__inner) {
  height: 100%;
}
</style>
