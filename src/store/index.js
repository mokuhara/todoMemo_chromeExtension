import Vue from "vue";
import Vuex from "vuex";

import Repository from "./repository.js";

Vue.use(Vuex);

const state = {
  RouterLinkText: [
    {
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
  memoCards: [],
  todoCards: [],
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
  pushMT({ dispatch, state, commit }, payload) {
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
  deleteMT({ dispatch }, payload) {
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
  getFromRepository({ commit }, type) {
    const repository = new Repository(type);
    const data = repository.getAll;
    commit("pushMT", { type, data });
  },
  findMTFromRepository({ commit }, payload) {
    const repository = new Repository(payload.type);
    const data = repository.getAll;
    const MT = data.find((data) => {
      return data.id === payload.id;
    });
    commit("setMT", { type: payload.type, data: MT });
    if (payload.changeValue) {
      commit("storeMTToState", payload);
    }
  },
};
const mutations = {
  changeActiveRouterLink(state, linkText) {
    console.log(linkText)
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
    }
  },
  changeMordalStatus(state) {
    state.modalIsOpen = !state.modalIsOpen;
  },
  storeMTToState(state, payload) {
    console.log("storeMTToState");
    console.log(payload);
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
    console.log(state.memo);
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
