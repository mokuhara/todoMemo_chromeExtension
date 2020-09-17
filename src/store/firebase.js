import * as firebase from "firebase/app";
import "firebase/auth";

export default class FirebaseHandler {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyCrvFTd_2bQWF5aMAXWloi1a8G0rp123Jg",
            authDomain: "todomemo-8809f.firebaseapp.com",
            databaseURL: "https://todomemo-8809f.firebaseio.com",
            projectId: "todomemo-8809f",
            storageBucket: "todomemo-8809f.appspot.com",
            messagingSenderId: "699798509849",
            appId: "1:699798509849:web:9b2f5ba3df837dcbc48d88",
        };
        firebase.initializeApp(firebaseConfig);
    }

    signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/userinfo.email");
        firebase.auth().useDeviceLanguage();
        firebase
            .auth()
            .signInWithPopup(provider)
    }

    signOut() {
        firebase.auth().signOut()
    }

    async watchAuthStateChange() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('aaaaaaa')
                console.log(user)
                return {
                    name: user.displayName,
                    iconUrl: user.photoURL
                }
            }
            return
        })
    }

    storeMemo(payload) {
        db.collection("memo").doc(payload.id).set({
            userName: payload.userName,
            userIconUrl: payload.userIconUrl,
            name: payload.name,
            text: payload.text,
            created_at: payload.created_at,
            pageUrl: payload.pageUrl,
            pageTitle: payload.pageTitle,
            favIconUrl: payload.favIconUrl,
            tags: payload.tags,
        }).then(() => {
            console.log("Document successfully written!")
        }).catch((error) => {
            console.error("Error writing document: ", error);
        })
    }

    getAllMemo(user) {
        db.collection("memo").limit(30).get().then((querySnapshot) => {
            const Memos = []
            querySnapshot.forEach((doc) => {
                console.log(user)
                // if((doc.data()).userName === user.name) return
                Memos.push(doc.data())
            });
            return Memos
        });
    }

    deleteMemo(id) {
        db.collection("memo").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}