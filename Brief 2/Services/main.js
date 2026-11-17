
console.log("Main.js est chargé !");

import {
    getCardsWithAxios,
    getFilteredCards
} from "./api.js";

import {
    setUIState,
    CounterCards,
    AfficherCards,
    Model,
    ValidationForm
} from "./ui.js";


const state = {
    cards: []
};

setUIState(state);

const errordiv = document.getElementById("errorDiv");
const loadingDiv = document.getElementById("loadingDiv");
const retry = document.getElementById("retry");


function loadCards() {

    errordiv.hidden = true;
    loadingDiv.hidden = false;

    getCardsWithAxios()
        .then(data => {

            state.cards = data;

            loadingDiv.hidden = true;

            CounterCards();
            AfficherCards();
        })
        .catch(error => {

            console.log(error);

            errordiv.hidden = false;
            loadingDiv.hidden = true;

            console.error("error throw", error);
        });
}


retry.addEventListener("click", () => {
    loadCards();
});



Model();


ValidationForm();


function Filter() {

    const priority = document.getElementById("prioriteS");
    const member = document.getElementById("MemberS");
    const search = document.getElementById("search");
    const emptyMessage = document.getElementById("emptyMessage");

    const filters = {};

    if (priority.value !== "all") {
        filters.priority = priority.value;
    }

    if (member.value !== "all") {
        filters.assignee = member.value;
    }

    if (search.value.trim() !== "") {
        filters.q = search.value.trim();
    }

    getFilteredCards(filters)
        .then(data => {

            state.cards = data;

            CounterCards();
            AfficherCards();

            emptyMessage.hidden = data.length !== 0;

        })
        .catch(error => {
            console.error("Erreur Filter :", error);
        });
}


function SearchCard() {

    const priority = document.getElementById("prioriteS");
    const member = document.getElementById("MemberS");
    const search = document.getElementById("search");
    const reset = document.getElementById("resetFilters");

    priority.addEventListener("change", Filter);
    member.addEventListener("change", Filter);
    search.addEventListener("input", Filter);

    reset.addEventListener("click", () => {

        priority.value = "all";
        member.value = "all";
        search.value = "";

        Filter();
    });
}

SearchCard();


loadCards();

const sectionEdit = document.querySelector('section-todo');




import  {getelement} from './api.js';

const BtnAddCard = document.querySelector("#Btn-AddCard");



let cardId = null;
    document.addEventListener("click",async (e) => {
       
        
    if (e.target.closest(".btnEditData")) {
    
        const btn = e.target.closest(".btnEditData");


        const id = btn.dataset.id;

          BtnAddCard.hidden = true;

        document.getElementById("BtnModiferCarte").hidden = false;

        cardModal.showModal();

        const response = await getelement(id);

        const card = response.data;

        // console.log(btn.dataset.id);
         
        // getelement(btn.dataset.id);
        // const data =  Response.data
cardId = btn.dataset.id;
        
        console.log(card);

        function elementModifierFromDta(card) {
    document.querySelector('[name="title"]').value = card.title;
    document.querySelector('[name="description"]').value = card.description;
    document.querySelector('[name="assignee"]').value = card.assignee;
    document.querySelector('[name="status"]').value = card.status;
    document.querySelector('[name="priority"]').value = card.priority;
    document.querySelector('[name="dueDate"]').value = card.dueDate;
    document.querySelector('[name="tags"]').value = card.tags;

}

    elementModifierFromDta(card)
        

    }
});


BtnModiferCarte.addEventListener("click" , async()=>{

})


