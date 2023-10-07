import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getDatabase,ref,set,push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
var firebaseConfig = {
  apiKey: "AIzaSyDVSLliAehdtgrm_Tq-KMjX_zcTQsylMJI",
  authDomain: "quize-database.firebaseapp.com",
  projectId: "quize-database",
  storageBucket: "quize-database.appspot.com",
  messagingSenderId: "21691630219",
  appId: "1:21691630219:web:d2a4862e5cde0a62a44a8e",
  measurementId: "G-EZXLDLFG2K"
};
var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
var database = getDatabase(app);

var name1 = document.getElementById("name1");
var email1 = document.getElementById("email1");
var password1 = document.getElementById("password1");
var singup = document.getElementById("singup");
var login = document.getElementById("login");
// var quize = document.getElementById("quize");
var email2 = document.getElementById("email2");
var password2 = document.getElementById("password2");
var questionNumber = document.getElementById("questionNumber")
// var duration = document.getElementById("duration")
var questionIndex = document.getElementById("questionIndex")
var options = document.getElementById("options")
// var container = document.getElementById("container")
var resuldata = document.getElementById("resuldata")
var result = document.getElementById("result")
var grade = document.getElementById("grade")
// var btn = document.getElementById("btn")
// var emoji = document.getElementById("em")
// var emoji2 = document.getElementById("em2")
// var userNameGet = document.getElementById("userNameGet")
// var userName = document.getElementById("userNAme")
// var emailGet = document.getElementById("emailGet")
// var email = document.getElementById("email")
// var Login = document.getElementById("Login")
var main = document.getElementById("main")
var A1grade = document.getElementById("A1grade");
var Agrade = document.getElementById("Agrade");
var Bgrade = document.getElementById("Bgrade");
var Cgrade = document.getElementById("Cgrade");
var Dgrade = document.getElementById("Dgrade");
var failgrade = document.getElementById("failgrade");
var logout = document.getElementById("logout");

window.logout = function(){
  logout.style.display = "none"
  singup.style.display = "inline-block"
  resuldata.style.display = "none"
}


var questionData = [
  {
    question: "What country has the highest life expectancy? ",
    options: [
      "Thailand",
      "Newzeland",
      "HongKong",
      "Turkey",
    ],
    answer: "HongKong",
  },

  {
    question: "Which language has the more native speakers: English or Spanish?",
    answer: "Spanish",
    options: [
      "English",
      "Spanish",
      "Urdu",
      "Arabic",
    ],
  },

  {
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Makeup Language",
      "Hyper Text Markup Language",
      "Hyper Trainer market Language",
    ],
  },
  {
    question: "How many time zones are there in Russia?",
    answer: "11",
    options: [
      "11",
      "18",
      "12",
      "09",
    ],
  },
  {
    question: "Whats the national animal of Australia?",
    answer: "Red Kangaroo",
    options: [
      "Lion", 
      "Red Kangaroo", 
      "Rabbit", 
      "Bear"
    ],
  },
  {
    question: "Whats the smallest country in the world? ",
    answer: "The Vatican",
    options: ["Westendies", "Newzeland", "The Vatican", "France"],
  },
  {
    question: "Whats the capital of Canada? ",
    answer: "Ottawa",
    options: ["Berlin", "Helsinki", "Ottawa", "Paris"],
  }
];

window.singupbtn = function(){
    if(name1.value == ""){
        swal({
            title: "Note!",
            text: "Please fill the Name",
            timer: 2000
          });
    return false;
}else if (email1.value == ""){
    swal({
        title: "Note!",
        text: "Please fill the Email",
        timer: 2000
      });
    return false;
}else if (password1.value == ""){
    swal({
        title: "Note!",
        text: "Please fill the Password Atlest 7 Letter ",
        timer: 2000
      });
    return false;
}

createUserWithEmailAndPassword (auth,email1.value,password1.value).then(function(sucess){
    console.log(sucess);
    swal({
        title: "Congratulations",
        text: "Your Singup is Complete",
        timer: 2000
      });
    var singupdata = {
        Name:name1.value,
        Email:email1.value,
        Password:password1.value,
        }
var referId = ref(database)
var ID = push(referId).key
singupdata.id = ID
var reference = ref(database,`students/${singupdata.id}`)
set(reference,singupdata)
singup.style.display = "none";
login.style.display = "inline-block";
})
.catch(function(error){
console.log(error)
swal({
    title: "Sorry!",
    text: "Some thing went wrong plz try Again",
    timer: 2000
  });
})
}
window.loginhere = function(){
login.style.display = "inline-block";
singup.style.display = "none";
}


window.loginbtn = function(){
    if (email2.value == ""){
        swal({
            title: "Note!",
            text: "Please fill the Email",
            timer: 2000
          });
        return false;
    }else if (password2.value == ""){
        swal({
            title: "Note!",
            text: "Please fill the Password",
            timer: 2000
          });
        return false;
    }else if (password2.value < 6){
        alert("write pass greater then 6 word")
        return false;
    }
    signInWithEmailAndPassword(auth,email2.value,password2.value).then(
      function(success){
      sendResult.id = success.user.uid
      sendResult.email = email2.value
           swal({
            title: "Congratulations",
            text: "Login Sucessfuly",
            timer: 2000
          });
           login.style.display = "none";
           main.style.display = "block"
           Question()
       }).catch(
       function(){
           swal({
            title: "Sorry!",
            text: "Some thing went wrong plz try Again",
            timer: 2000
          });
       })
}
var index = 0
var right = 0
var sendResult = {}
function Question() {
  if (index < questionData.length) {
    questionNumber.innerHTML = questionData[index].question
    questionIndex.innerHTML = `Question Number ${index + 1}/${questionData.length}`
    options.innerHTML = ""
    for (var i = 0; i < questionData[index].options.length; i++) {
      options.innerHTML += `<div class="col-md-6 mt-2" >
<div class="p-2 shadow-lg rounded bg-dark">
    <button   onclick="recive('${questionData[index].options[i]}','${questionData[index].answer}')" class="btn w-100 text-white">${questionData[index].options[i]}</button>
</div>
</div>`
    }
  }else {
    main.style.display = "none"
    resuldata.style.display = "block"
    result.innerHTML = `Your Result ${right}/${questionData.length}`
    sendResult.result = right
    var refe = ref(database, `Results/${sendResult.id}`)
    set(refe, sendResult)
    grade.style.color = "skyBlue"
    if (right === 7) {
      grade.innerHTML = `Your grade is A+1`
      A1grade.style.display = "inline-block";

    } else if (right === 6) {
      grade.innerHTML = `Your grade is A`
      Agrade.style.display = "inline-block";

    } else if (right === 5) {
      grade.innerHTML = `Your grade is B`
      Bgrade.style.display = "inline-block";

    } else if (right === 4) {
      grade.innerHTML = `Your grade is C`
      Cgrade.style.display = "inline-block";

    }else if (right === 3) {
      grade.innerHTML = `Your grade is D`
      Dgrade.style.display = "inline-block";

    } else {
      grade.innerHTML = `You are Fail Bater luck next Time`
      grade.style.color = "red"
      failgrade.style.display = "inline-block";
    }
  }

}
window.change = function () {
  index++
  Question()
}
window.recive = function (que, ans) {
  if (que === ans) {
    right++
  }
  change()
}