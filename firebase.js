import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB-TYhBxvGlwYvlxl194udnTinMX4LGgE",
  authDomain: "studio-8362245741-7bdea.firebaseapp.com",
  projectId: "studio-8362245741-7bdea",
  storageBucket: "studio-8362245741-7bdea.firebasestorage.app",
  messagingSenderId: "257711236964",
  appId: "1:257711236964:web:09271b32da288953c37c71"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
