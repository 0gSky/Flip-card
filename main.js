import { setValue, resetValue, checkCard} from "./functions.js";
import { Countdown } from "./time.js";
const cardS = document.querySelectorAll(".cards")
const cards = Array.from(cardS)
const outer_cards = document.querySelectorAll(".cards .outer-card")
const values = ["apple","mango", "banana","grapes","orange","pineapple"];
const level = document.querySelector(".level-drop");
const time = document.querySelector(".time-drop");
const timer_x = document.querySelector(".timer")
const images = {
    apple: "../practiceDesign/pics/apple.avif",
    mango: "../practiceDesign/pics/mango.avif",
    banana: "../practiceDesign/pics/banana.avif",
    grapes: "../practiceDesign/pics/grapes.avif",
    orange: "../practiceDesign/pics/orange.avif",
    pineapple: "../practiceDesign/pics/Pineapple.png"
}
let timer_value = timer_x.value
let timer_content = timer_x.textContent
let timerFunc
// document.body.appendChild(ele)

$(".diff-butn").click(function() {
    console.log(time.value, level.value)
    if(time.value !== "" && level.value !== ""){
        $(".difficulty-IF").removeClass("show")
        $(cards).css({
        transform: "rotateY(0deg)",
        transition: "transform 0.5s ease"
        })

    } else if(time.value == "" && level.value !== ""){
        alert("Please set the time.")
    } else if(time.value !== "" && level.value == ""){
        alert("Please set the level.")
    } else if(time.value == "" && level.value == ""){
        alert("Please set the level and time.")
    }
})

$(".start").click(function() {
    if(time.value == "" && level.value !== ""){
        alert("Please set the time.")
    } else if(time.value !== "" && level.value == ""){
        alert("Please set the level.")
    } else if(time.value == "" && level.value == ""){
        alert("Please set the level and time.")
    } else {
        $(cards).css({
        transform: "rotateY(0deg)",
        transition: "transform 0.5s ease"
        })
        $(".start").prop("disabled", true);
        $(".difficulty").prop("disabled", true);
        document.querySelector(".level-show").textContent = `${Number(level.value) + 1}`
        setTimeout(function(){
            timer_value = time.value
            timer_content = time.value
            resetValue(cards)
            //----------------------------------------------------------------------------
            console.log(timer_content)
            timerFunc = new Countdown(timer_value,timer_x)
            timerFunc.checker()
            timerFunc.start()
            difficulty(level.value)
        }, 400)
    }
})

$(".difficulty").click(function() {
    $(".difficulty-IF").toggleClass("show")
})

$(".cards").click(function(clicked) {
    $(clicked.currentTarget).css({
        transform: "rotateY(180deg)",
        transition: "transform 0.5s ease"
    })
    clicked.currentTarget.dataset.open = "open"
    // checkCard(clicked.currentTarget, cards, level.value)
    checkCard(cards,level.value)
})

$(".reset").click(function() {  
    $(cards).css({
        transform: "rotateY(0deg)",
        transition: "transform 0.5s ease"
    })
    $(".start").prop("disabled", false);
    $(".difficulty").prop("disabled", false);

    cards.forEach( card => {card.dataset.open = "close";card.dataset.complete = "false"})
    // timer_x.textContent = "0:00"
    timer_x.value = 0
    level.value = ""
    time.value = ""
    timerFunc.stopp()
    resetValue(cards)
})
function difficulty(difflevel){
    if(difflevel == 3){
       setValue(outer_cards,values, cards, images,2,5)
    } else if(difflevel == 2){
       setValue(outer_cards,values, cards, images,3,4)
    } else if(difflevel == 1){
       setValue(outer_cards,values, cards, images,5,3)
    }
}
