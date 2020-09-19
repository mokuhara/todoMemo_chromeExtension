export default class Repository {
  constructor(key) {
    this.key = key;
  }

  store(data) {
    const localStrageData = localStorage.getItem(this.key);
    //新規の場合
    if (!localStrageData || localStrageData.length <= 2) {
      let saveData = [];
      data.id = this._createId();
      saveData.push(data);
      localStorage.setItem(this.key, JSON.stringify(saveData));
      return;
    }

    //追加の場合
    const _localStrageData = [...JSON.parse(localStorage.getItem(this.key))];
    data.id = this._createId();
    const upDatelocalStrageData = [..._localStrageData, data];
    localStorage.setItem(this.key, JSON.stringify(upDatelocalStrageData));
    return;
  }

  update(data) {
    const localStrageData = [...JSON.parse(localStorage.getItem(this.key))] || [];
    localStrageData.forEach((localStorageData) => {
      if (localStorageData.id == data.id) {
        Object.keys(data).map((key) => {
          localStorageData[key] = data[key];
        });
      }
    });
    localStorage.setItem(this.key, JSON.stringify(localStrageData));
  }

  delete(id) {
    const localStrageData = [...JSON.parse(localStorage.getItem(this.key))] || [];
    let _localStrageData = [];
    localStrageData.forEach((localStorageData) => {
      if (localStorageData.id != id) {
        _localStrageData.push(localStorageData);
      }
    });
    localStorage.setItem(this.key, JSON.stringify(_localStrageData));
  }

  //リスクあるので実装しない
  deleteAll() {
    // localStorage.removeItem(this.key)
  }

  storeAll(data) {
    localStorage.removeItem(this.key)
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  get getAll() {
    const localStrageData = localStorage.getItem(this.key);
    if (!localStrageData) return;
    return JSON.parse(localStrageData);
  }

  _createId() {
    const l = 10;
    const c = "abcdefghijklmnopqrstuvwxyz0123456789";
    const cl = c.length;
    let r = "";
    for (let i = 0; i < l; i++) {
      r += c[Math.floor(Math.random() * cl)];
    }
    return r;
  }

  getUser() {
    const localStrageData = localStorage.getItem("user");
    if (!localStrageData) return;
    return JSON.parse(localStrageData);
  }

  setUser(data) {
    localStorage.setItem("user", JSON.stringify({
      name: data.name,
      iconUrl: data.iconUrl
    }));
  }

  deleteUser() {
    localStorage.removeItem("user")
  }

  isLogin() {
    const user = this.getUser()
    return (user && user.name && user.iconUrl) ? true : false
  }

}