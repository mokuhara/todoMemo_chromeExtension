import Vue from 'vue'
import Vuex from 'vuex'

// import Repository from './repository.js'

Vue.use(Vuex)


const state = {
  RouterLinkText: [{
    path: "memo",
    text: "memo"
  }, {
    path: "todo",
    text: "todo"
  }, {
    path: "search",
    text: "search"
  }],
  memoCards: []
}

const getters = {}
const actions = {
  createMemo({
    dispatch,
    // commit
  }, data) {
    dispatch("storeMemo", data)
    // commit("storeMemo", data)
  },
  // storeMemo({
  //   state
  // }, data) {
  //   // const repository = new Repository('memo')
  //   // repository.store(data)
  // }
}
const mutations = {
  storeMemo(state, data) {
    state.memoCards.push(data)
  }
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})