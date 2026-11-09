//import


import { getCards } from "./api.js";


const state={
    cards: []
}


getCards()
    .then(data => {
        state.cards=data;
        // console.log("ana" ,  state.cards)
        const todoCards = state.cards.filter(card => card.status === "todo");
        const progressCards =state.cards.filter(card=> card.status === "in-progress");
        const doneCards = state.cards.filter(card=> card.status === "done");
        // console.log(data);
          console.log(state.cards.length);
        console.log(todoCards.length);
        console.log(progressCards.length);
        console.log(doneCards.length);
        displayCards() 
    })
    .catch(error => {
        console.log(error);
    });



    const todoList = document.querySelector("#todo-list");
const progressList = document.querySelector("#progress-list");
const doneList = document.querySelector("#done-list");

    function displayCards() {

    todoList.innerHTML = "";
    progressList.innerHTML = "";
    doneList.innerHTML = "";

    state.cards.forEach(card => {

        const cardElement = createCard(card);

        if (card.status === "todo") {
            todoList.appendChild(cardElement);
        }

        else if (card.status === "in-progress") {
            progressList.appendChild(cardElement);
        }

        else if (card.status === "done") {
            doneList.appendChild(cardElement);
        }

    });
}



// console.log(state.cards.length);

// const todoCards = state.cards.filter(card => card.status === "todo");

// const progressCards = state.cards.filter(card => card.status === "in-progress");

// const doneCards = state.cards.filter(card => card.status === "done");



// console.log(todoCards.length);
// console.log(progressCards.length);
// console.log(doneCards.length);