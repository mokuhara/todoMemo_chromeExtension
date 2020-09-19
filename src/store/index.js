import Vue from "vue";
import Vuex from "vuex";


import Repository from "./repository.js";
import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import {
  firebaseConfig
} from '../../config.js'

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


Vue.use(Vuex);

const state = {
  RouterLinkText: [{
      path: "",
      text: "memo",
    },
    {
      path: "todo",
      text: "todo",
    },
    {
      path: "search",
      text: "search",
    },
    {
      path: "wiki",
      text: "wiki",
    },
  ],
  activeRouterLink: "memo",
  modalIsOpen: false,
  unDoneFilter: true,
  archiveFilter: false,
  sharedMemos: [],
  memoCards: [],
  todoCards: [],
  wikiMemoCards: [],
  unDoneTodoCards: [],
  archiveMemoCards: [],
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
    isShared: false,
    order: "",
    isArchive: false,
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
    order: "",
  },
  mtMode: {
    type: "",
    method: "",
    submitButtonText: "",
  },
  user: {
    name: "",
    iconUrl: "",
    isLogin: false
  }
};

const getters = {};
const actions = {
  setOrder({
    dispatch
  }, payload) {
    const repository = new Repository(payload.type);
    repository.storeAll(payload.data)
    dispatch("getFromRepository", payload.type);
  },
  checkLogin({
    commit,
    state
  }) {
    const repository = new Repository("");
    if (state.user.isLogin) return
    if (!repository.isLogin()) return
    const user = repository.getUser()
    commit('storeUser', user)
  },
  signIn({
    dispatch
  }) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    firebase.auth().useDeviceLanguage();
    firebase
      .auth()
      .signInWithPopup(provider)
    dispatch('AuthStateChanged')
  },
  signOut({
    dispatch
  }) {
    firebase.auth().signOut()
    dispatch('AuthStateChanged')
  },
  AuthStateChanged({
    commit
  }) {
    const repository = new Repository("");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const _user = {
          name: user.displayName,
          iconUrl: user.photoURL
        }
        repository.setUser(_user)
        commit('storeUser', _user)
      } else {
        commit('deleteUser')
        repository.deleteUser()
      }
    })
  },
  wikiHandler({
    commit,
    state,
    dispatch
  }, payload) {
    try {
      if (!payload || !payload.method) throw new Error('[wikiHandler] payload or method is null')
      if (payload.method === 'create') {

        db.collection("memo").doc(payload.id).set({
          userName: payload.userName,
          userIconUrl: payload.userIconUrl,
          text: payload.text,
          updated_at: payload.updated_at,
          pageUrl: payload.pageUrl,
          pageTitle: payload.pageTitle,
          favIconUrl: payload.favIconUrl,
          tags: payload.tags,
        }).then(() => {
          console.log("Document successfully written!")
          dispatch("findMTFromRepository", {
            id: payload.id,
            type: "memo",
            changeValue: true,
            dtype: "isShared",
            data: true,
          })
          dispatch("pushMT", {
            type: "memo",
            method: "update"
          })
          if (state.searchKeyword) {
            dispatch("searchFromRepository", state.searchKeyword)
            commit("setSearchKeyword", "")
          }
        }).catch((error) => {
          console.error("Error writing document: ", error);
        })
      } else if (payload.method === 'get') {
        db.collection("memo").limit(3).get().then((querySnapshot) => {
          const memos = []
          querySnapshot.forEach((doc) => {
            // if((doc.data()).userName === state.user.name) return
            memos.push(doc.data())
          });
          commit('storeWikiMemo', memos)
        });
      } else if (payload.method === 'delete') {
        db.collection("memo").doc(payload.id).delete().then(() => {
          console.log("Document successfully deleted!");
          dispatch("findMTFromRepository", {
            id: payload.id,
            type: "memo",
            changeValue: true,
            dtype: "isShared",
            data: false,
          })
          dispatch("pushMT", {
            type: "memo",
            method: "update"
          })
          if (state.searchKeyword) {
            dispatch("searchFromRepository", state.searchKeyword)
            commit("setSearchKeyword", "")
          }
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      } else if (payload.method === 'find') {
        const keyword = state.searchKeyword
        db.collection("memo").get().then((querySnapshot) => {
          let memos = []
          querySnapshot.forEach((doc) => {
            if (!doc.exists) return
            const memo = doc.data()
            if (
              memo.pageTitle.toLowerCase().indexOf(keyword.toLowerCase()) != -1 ||
              memo.text.toLowerCase().indexOf(keyword.toLowerCase()) != -1 ||
              memo.userName.toLowerCase().indexOf(keyword.toLowerCase()) != -1
            ) {
              memos.push(memo)
            }
            if (memo.tags) {
              let filteredMemo = memo.tags.filter((tag) => {
                return tag.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1
              })
              memos.push(filteredMemo[0]);
            }
            memos = memos.filter((v) => v);
            commit('storeWikiMemo', memos)
            commit("setSearchKeyword", "")
          });
        }).catch((error) => {
          console.error("Error finding document: ", error);
        });
      }
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  },
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
    if (payload.type == "memo") {
      db.collection("memo").doc(payload.id).get().then((doc) => {
        if (!doc.exists) return
        db.collection("memo").doc(payload.id).delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      })
    }
    const repository = new Repository(payload.type);
    repository.delete(payload.id);
    dispatch("getFromRepository", payload.type);
  },
  storeToRepository(_, payload) {
    const repository = new Repository(payload.type);
    if (payload.method === "create") {
      repository.store(payload.data);
    } else if (payload.method === "update") {
      repository.update(payload.data);
    }
  },
  getFromRepository({
    commit,
  }, type) {
    const repository = new Repository(type);
    const data = repository.getAll;
    commit("pushMT", {
      type,
      data,
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
      data: MT,
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
    if (memo) return commit("saveMTtype", "memo");
    const repositoryT = new Repository("todo");
    const todos = repositoryT.getAll;
    const todo = todos.find((todo) => {
      return todo.id === id;
    });
    if (todo) return commit("saveMTtype", "todo");
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
        if (data.tags) {
          let result = data.tags.map((tag) => {
            if (tag.name.toLowerCase().indexOf(text.toLowerCase()) != -1) {
              return data;
            }
            if (result) {
              return result;
            }
          });
          result = result.filter((v) => v);
          return result[0];
        }
      });
      searchResult = searchResult.filter((v) => v);
      result.push({
        type: type,
        data: searchResult,
      });
    });
    commit("storeSearchMT", result);
  },
};
const mutations = {
  changeIsShared(state, isShared) {
    state.isShared = isShared
  },
  storeUser(state, user) {
    state.user.name = user.name
    state.user.iconUrl = user.iconUrl
    state.user.isLogin = true
  },
  deleteUser(state) {
    state.user.name = ''
    state.user.iconUrl = ''
    state.user.isLogin = false
  },
  storeWikiMemo(state, memos) {
    state.wikiMemoCards = memos
  },
  setSearchKeyword(state, keyword) {
    state.searchKeyword = keyword;
  },
  saveMTtype(state, type) {
    state.MTType = type;
  },
  changArchiveStatus(state, bool) {
    console.log(bool)
    state.archiveFilter = bool;
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
    if (!payload || !payload.data) return
    if (payload.type === "memo") {
      state.memoCards = payload.data;
      state.archiveMemoCards = payload.data.filter((memo) => {
        return memo.isArchive;
      });
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
          if (payload.data === null || payload.data === undefined) return;
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
        isShared: false,
        order: "",
        isArchive: false,
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
        order: "",
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