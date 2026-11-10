//import


import { getCards } from "./api.js";


const state = {
    cards: []
}

const errordiv =document.getElementById("errorDiv");
const loadingDiv=document.getElementById("loadingDiv")
const retry =document.getElementById("retry");
console.log(retry);

function loadCards() {
      errordiv.hidden = true;

      loadingDiv.hidden=false;

    getCards()
        .then(data => {
            state.cards = data;
            loadingDiv.hidden = true; 
            CounterCards();
            AfficherCards();
        }
        // , 7000
    )
        .catch(error => {
            console.log(error);
            errordiv.hidden = false;
            loadingDiv.hidden=true;
        } 
    );
}

retry.addEventListener("click", () => {
    loadCards();
});

loadCards();

const SpanCountTodo = document.getElementById("SpanCountTodo");
const SpanCountInProgress = document.getElementById("SpanCountInProgress");
const SpanCountDone = document.getElementById("SpanCountDone");


function CounterCards() {

    const todoCards = state.cards.filter(card => card.status === "todo");
    const progressCards = state.cards.filter(card => card.status === "in-progress");
    const doneCards = state.cards.filter(card => card.status === "done");

    console.log("ana todoo card ", todoCards)
    SpanCountTodo.textContent = todoCards.length;
    SpanCountInProgress.textContent = progressCards.length;
    SpanCountDone.textContent = doneCards.length;


    // console.log("lenght all" ,  state.cards.length);
    // console.log("lenght todo" , todoCards.length);
    // console.log("lenght in" , progressCards.length);
    // console.log("lenght done" ,doneCards.length);

    // console.log("Cards:", state.cards);


    SpanCountTodo.textContent = todoCards.length;
    SpanCountInProgress.textContent = progressCards.length;
    SpanCountDone.textContent = doneCards.length;
}


const todoList = document.getElementById("todo-list");
const progressList = document.getElementById("progress-list");
const doneList = document.getElementById("done-list");

function AfficherCards() {

    todoList.innerHTML = "";
    progressList.innerHTML = "";
    doneList.innerHTML = "";

    state.cards.forEach(opt => {


        const div = document.createElement("div");
        const titleCard = document.createElement("h2");

        titleCard.textContent = opt.title;

        div.className = "bg-white p-4 rounded-lg shadow-sm border border-gray-200";

        if (opt.status === "todo") {
             AfficherTaskCard(todoList, opt)

        }

        if (opt.status === "in-progress") {
             AfficherTaskCard(progressList, opt)

        }

        if (opt.status === "done") {
             AfficherTaskCard(doneList, opt)
        }
    });


}



function  AfficherTaskCard(ListType, opt) {

    const div = document.createElement("div");
    const titleCard = document.createElement("h2");

    div.className = "bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition";

    titleCard.className = "font-bold text-lg text-gray-800 mb-3";
    titleCard.textContent = opt.title;

    div.appendChild(titleCard);

    div.innerHTML += `
        <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
            ${opt.status}
        </span>

        <p class="text-sm text-gray-500 mb-3 mt-2">
            ${opt.description}
        </p>

        <div class="flex justify-between text-sm mb-3">
            <strong>👤 ${opt.assignee}</strong>
       <span class="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
    ${opt.priority}
</span>
        </div>

        <p class="text-xs text-gray-400 mb-3">📅 ${opt.dueDate}</p>
    `;

    opt.tags.forEach((opt) => {

        const p = document.createElement("span");

        p.className = "inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mr-2 mb-2";

        p.textContent = `#${opt}`;

        div.appendChild(p);
    });

    ListType.appendChild(div);
}


// partir pour model
function Model() {
    const BoutonAjoutCard =document.getElementById("Bouton-Ajout-Card");
    BoutonAjoutCard.addEventListener("click", () => {
    cardModal.showModal();
});
    const cancelModal = document.getElementById("cancelModal");
cancelModal.addEventListener("click" , ()=>{
    cardModal.close();
})

}
Model()