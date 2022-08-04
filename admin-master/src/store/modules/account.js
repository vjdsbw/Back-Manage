import { GetUserinfo } from '@/api/login'

export default {
  namespaced: true,
  state: {
    userinfo: null,
    permissionList: [],
    user: {},
  },
  mutations: {
    // 保存用户信息
    setUserinfo(state, data) {
      state.userinfo = data
    },
    // 清除用户信息
    clearUserinfo(state) {
      state.userinfo = null
    },

    setUser(state, data) {
      state.user = data
    },
    clearUser(state) {
      state.user = {}
    },
  },
  actions: {
    // 获取用户信息
    async getUserinfo({ commit }) {
      const { code, data } = await GetUserinfo()
      if (+code === 200) {
        commit('setUserinfo', data)
        return Promise.resolve(data)
      }
    },
  },
}
