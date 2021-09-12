import Vue from "vue"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAPPDBjkSTtz7LWXrdphm25QyOFILZIj-s",
  authDomain: "riku-love.firebaseapp.com",
  projectId: "riku-love",
  storageBucket: "riku-love.appspot.com",
  messagingSenderId: "1066304267814",
  appId: "1:1066304267814:web:d2c321d184d1e65e7b68e7",
  measurementId: "G-68PGRRPBDS",
}

firebase.initializeApp(firebaseConfig)

/**
 * Vue.observable を使って、firebase.auth()をVueアプリ全体に共有する。
 * this.$authがアプリ全体でアクセスできる様になる。
 * @example
 * computed() を通じて firebase.auth().currentUser.displayにアクセスする例。任意のコンポーネントで以下の様に記述できる。
 * ```vue
 * computed: {
 *  user() {
 *    reutrn this.$auth.currentUser
 *  }
 }
 * ```
 */

const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
