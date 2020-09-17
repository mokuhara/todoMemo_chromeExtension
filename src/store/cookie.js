export default class CookieHandler {

    getCookie() {
        const cookiesArr = document.cookie.split(";");
        const cookie = cookiesArr.find((cookie) => {
            const decodeCookie = decodeURIComponent(cookie);
            const coookieKey = decodeCookie.split("=")[0];
            return coookieKey === "todomemo";
        });
        if (!cookie || !cookie.split("=")[1]) return "";
        return JSON.parse(decodeURIComponent(cookie).split("=")[1]);
    }

    setCookie(user) {
        const key = "todomemo";
        const jsonVal = {
            name: user.name,
            iconUrl: user.iconUrl,
        };
        document.cookie = key + "=" + encodeURIComponent(JSON.stringify(jsonVal));
    }

    resetCoookie() {
        const key = "todomemo";
        document.cookie = key + "=; expires=0";
    }

    isLogin() {
        return !!this.getCookie() ? true : false;
    }
}