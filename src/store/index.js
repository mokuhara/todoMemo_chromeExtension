import Vue from "vue";
import Vuex from "vuex";

import Repository from "./repository.js";

Vue.use(Vuex);

const state = {
  RouterLinkText: [{
      path: "memo",
      text: "memo",
    },
    {
      path: "",
      text: "todo",
    },
    {
      path: "search",
      text: "search",
    },
  ],
  activeRouterLink: "todo",
  modalIsOpen: false,
  unDoneFilter: true,
  memoCards: [],
  todoCards: [],
  unDoneTodoCards: [],
  searchMemoCards: [],
  searchTodoCards: [],
  searchKeyword: "",
  MTType: "",
  memo: {
    text: "",
    created_at: "",
    updated_at: "",
    pageUrl: "",
    pageTitle: "",
    favIconUrl: "",
    tags: [],
  },
  todo: {
    text: "",
    created_at: "",
    updated_at: "",
    pageUrl: "",
    pageTitle: "",
    favIconUrl: "",
    tags: [],
    done: false,
    dateRange: "",
  },
  mtMode: {
    type: "",
    method: "",
    submitButtonText: "",
  },
};

const getters = {};
const actions = {
  pushMT({
    dispatch,
    state,
    commit
  }, payload) {
    let data;
    if (payload.type === "memo") {
      data = state.memo;
    } else if (payload.type === "todo") {
      data = state.todo;
    }
    dispatch("storeToRepository", {
      data: data,
      type: payload.type,
      method: payload.method,
    });
    dispatch("getFromRepository", payload.type);
    commit("resetMT", payload.type);
  },
  deleteMT({
    dispatch
  }, payload) {
    const repository = new Repository(payload.type);
    repository.delete(payload.id);
    dispatch("getFromRepository", payload.type);
  },
  storeToRepository({}, payload) {
    const repository = new Repository(payload.type);
    if (payload.method === "create") {
      repository.store(payload.data);
    } else if (payload.method === "update") {
      repository.update(payload.data);
    }
  },
  getFromRepository({
    commit
  }, type) {
    const repository = new Repository(type);
    const data = repository.getAll;
    commit("pushMT", {
      type,
      data
    });
  },
  findMTFromRepository({
    commit
  }, payload) {
    const repository = new Repository(payload.type);
    const data = repository.getAll;
    const MT = data.find((data) => {
      return data.id === payload.id;
    });
    commit("setMT", {
      type: payload.type,
      data: MT
    });
    if (payload.changeValue) {
      commit("storeMTToState", payload);
    }
  },
  confirmMTType({
    commit
  }, id) {
    const repositoryM = new Repository("memo");
    const memos = repositoryM.getAll;
    const memo = memos.find((memo) => {
      return memo.id === id;
    });
    if (memo) commit("saveMTtype", "memo");
    const repositoryT = new Repository("todo");
    const todos = repositoryT.getAll;
    const todo = todos.find((todo) => {
      return todo.id === id;
    });
    if (todo) commit("saveMTtype", "todo");
  },
  searchFromRepository({
    commit
  }, text) {
    let result = [];
    const searchScope = ["memo", "todo"];
    searchScope.map((type) => {
      const repository = new Repository(type);
      const data = repository.getAll;
      let searchResult = data.map((data) => {
        if (
          data.pageTitle.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
          data.text.toLowerCase().indexOf(text.toLowerCase()) != -1
        ) {
          return data;
        }
        data.tags.map((tag) => {
          if (tag.name.toLowerCase().indexOf(text.toLowerCase()) != -1) {
            return data;
          }
        });
      });
      searchResult = searchResult.filter((v) => v);
      result.push({
        type: type,
        data: searchResult
      });
    });
    commit("storeSearchMT", result);
  },
};
const mutations = {
  setSearchKeyword(state, keyword) {
    state.searchKeyword = keyword;
  },
  saveMTtype(state, type) {
    state.MTType = type;
  },
  changeUndoneFlg(state) {
    state.unDoneFilter = !state.unDoneFilter;
  },
  storeSearchMT(state, payload) {
    payload.map((payload) => {
      if (payload.type === "memo") {
        state.searchMemoCards = payload.data;
      } else if (payload.type === "todo") {
        state.searchTodoCards = payload.data;
      }
    });
  },
  changeActiveRouterLink(state, linkText) {
    state.activeRouterLink = linkText;
  },
  changeMTmode(state, payload) {
    state.mtMode.type = payload.type;
    state.mtMode.method = payload.method;
    state.mtMode.submitButtonText = payload.submitButtonText;
  },
  setMT(state, payload) {
    if (payload.type === "memo") {
      state.memo = payload.data;
    } else if (payload.type === "todo") {
      state.todo = payload.data;
    }
  },
  createTimeStamp(state, payload) {
    if (payload.method === "create") {
      if (payload.type === "memo") {
        state.memo.created_at = new Date();
        state.memo.updated_at = new Date();
      } else if (payload.type === "todo") {
        state.todo.created_at = new Date();
        state.todo.updated_at = new Date();
      }
    } else if (payload.method === "update") {
      if (payload.type === "memo") {
        state.memo.updated_at = new Date();
      } else if (payload.type === "todo") {
        state.todo.updated_at = new Date();
      }
    }
  },
  pushMT(state, payload) {
    if (payload.type === "memo") {
      state.memoCards = payload.data;
    } else if (payload.type === "todo") {
      state.todoCards = payload.data;
      state.unDoneTodoCards = payload.data.filter((todo) => {
        return !todo.done;
      });
    }
  },
  changeMordalStatus(state) {
    state.modalIsOpen = !state.modalIsOpen;
  },
  storeMTToState(state, payload) {
    if (payload.type === "memo") {
      Object.keys(state.memo).map((key) => {
        if (key === payload.dtype) {
          if (!payload.data) return;
          state.memo[key] = payload.data;
        }
      });
    } else if (payload.type === "todo") {
      Object.keys(state.todo).map((key) => {
        if (key === payload.dtype) {
          // if (!payload.data) return;
          state.todo[key] = payload.data;
        }
      });
    }
  },
  resetMT(state, type) {
    if (type === "memo") {
      state.memo = {
        text: "",
        created_at: "",
        updated_at: "",
        pageUrl: "",
        pageTitle: "",
        favIconUrl: "",
        tags: [],
      };
    } else if (type === "todo") {
      state.todo = {
        text: "",
        created_at: "",
        updated_at: "",
        pageUrl: "",
        pageTitle: "",
        favIconUrl: "",
        tags: [],
        done: false,
        dateRange: "",
      };
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});