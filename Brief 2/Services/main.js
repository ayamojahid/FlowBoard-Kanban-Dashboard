
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
