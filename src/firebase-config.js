//инициализация базы данных firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBuiW2gvxpk7dpX2z_RVcgyaLoCWDe6yUU",
  authDomain: "todo-app-b3261.firebaseapp.com",
  databaseURL: "https://todo-app-b3261-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-app-b3261",
  storageBucket: "todo-app-b3261.appspot.com",
  messagingSenderId: "850757584901",
  appId: "1:850757584901:web:a7b00f0fc2a04ec3f6f46c",
  measurementId: "G-1T4XSNPSVB"
};
/** инициализация базы данных firebase */
const app = initializeApp(firebaseConfig);

/**инициализация базы данных и получение ссылки на сервис */
const db = getFirestore(app)
export {db}