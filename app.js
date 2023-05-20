// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ccd5RK_q01Vr1Bh9bqR-6Bd7G-61BPE",
  authDomain: "new-webjong-server.firebaseapp.com",
  projectId: "new-webjong-server",
  storageBucket: "new-webjong-server.appspot.com",
  messagingSenderId: "1092753361332",
  appId: "1:1092753361332:web:5459ff3d4fd0df3767cae1",
  measurementId: "G-K1YM5L404Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const addItem = async (date, name, color) => {
  try {
    const docRef = await addDoc(collection(db, "member"), {
      date: date, 
      name: name,
      color: color,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

$(".submit-btn").click(()=>{
  let date = $(".submit-li-date").text()
  date = date.split(" ")[2] + date.split(" ")[3] + " " + date.split(" ")[5]
  let name = $(".submit-input").val()
  let color = 0
  $('.flex-row-center div').each(function() {
    if ($(this).text().trim() === '✔️') {
      color = $(this).attr("class")
      color = color.split(" ")[0].split("-")[2]*1
    }
  });
  console.log(date, name, color)
  if (name == "" || color == 0) {
    alert("값을 전부 입력해주세요")
  }
  addItem(date, name, color)
})

const querySnapshot = await getDocs(collection(db, "member"));
querySnapshot.forEach((doc) => {
  console.log(doc.data());
});
