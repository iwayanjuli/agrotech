import { initializeApp } from "firebase/app"
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database"

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyBCWw8G4_CZGZcu2C_izKjZYT6ezl1EMCk",
    authDomain: "agrotech-ab7ce.firebaseapp.com",
    databaseURL: "https://agrotech-ab7ce-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "agrotech-ab7ce",
    storageBucket: "agrotech-ab7ce.appspot.com",
    messagingSenderId: "817958039448",
    appId: "1:817958039448:web:e71cb41f74a82e36f785ed",
    measurementId: "G-CR5DBDB6CN"
  }

  const app = initializeApp(firebaseConfig)
  const db = getDatabase(app)

  return {
    provide: {
      db,
      dbRef,
      onValue,
      set
    }
  }
})
