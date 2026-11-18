
console.log("Main.js est travaille");

import {
    getCardsWithAxios,
    getFilteredCards,
    getelement,
    miseAjourStatus,
    modifierCard
} from "./api.js";

import {
    CounterCards,
    AfficherCards,
    Model,
    ValidationForm
} from "./ui.js";

let cards = [];



const errordiv = document.getElementById("errorDiv");
const loadingDiv = document.getElementById("loadingDiv");
const retry = document.getElementById("retry");


function loadCards() {

    errordiv.hidden = true;
    loadingDiv.hidden = false;

    getCardsWithAxios()
        .then(data => {

           cards = data;

            loadingDiv.hidden = true;

            CounterCards(cards);
            AfficherCards(cards);

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

            cards = data;

            CounterCards(cards);
            AfficherCards(cards);

            emptyMessage.hidden = data.length !== 0;

        })
        .catch(error => {
            console.error("erreur de filter ", error);
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
const BtnAddCard = document.querySelector("#Btn-AddCard");

let cardId = null;


const sectionTodo = document.querySelector("#section-todo");
    sectionTodo.addEventListener("click",async (e) => {
    if (e.target.closest(".btnEditData")) {
    
        const btn = e.target.closest(".btnEditData");
        const id = btn.dataset.id;

        BtnAddCard.hidden = true;
        document.getElementById("BtnModiferCarte").hidden = false;
        cardModal.showModal();
        const response = await getelement(id);
         
        // const {data} = await getelement(id);

        const card = response.data;
        console.log("geele" + getelement(id))
       cardId = btn.dataset.id;
      
        
        // console.log("ana data" , data);
        // console.log("ana card" , card);

       
    document.querySelector('[name="title"]').value = card.title;
    document.querySelector('[name="description"]').value = card.description;
    document.querySelector('[name="assignee"]').value = card.assignee;
    document.querySelector('[name="status"]').value = card.status;
    document.querySelector('[name="priority"]').value = card.priority;
    document.querySelector('[name="dueDate"]').value = card.dueDate;
    document.querySelector('[name="tags"]').value = card.tags;

        

    }
});






BtnModiferCarte.addEventListener("click" , async()=>{

   let cardData={
    title :  document.querySelector('[name="title"]').value,
    description : document.querySelector('[name="description"]').value,
    assignee : document.querySelector('[name="assignee"]').value ,
    status : document.querySelector('[name="status"]').value,
    priority : document.querySelector('[name="priority"]').value,
    dueDate :  document.querySelector('[name="dueDate"]').value ,
    tags : document.querySelector('[name="tags"]').value.split(",")
    }
console.log("Assignee :", cardData.assignee);
console.log("Toutes les données :", cardData);

    const response = await modifierCard(cardId, cardData);
console.log(response.data);
    AfficherCards(cards);
console.log(cardId)

cardModal.close();
location.reload();
})


sectionTodo.addEventListener("click" ,async (e)=>{
    
     const btnNext = e.target.closest(".btnNext");
     const btnbtnPrecedent = e.target.closest(".btnPrecedent");

    if (btnNext) {
        console.log(btnNext.dataset.id);
    
          const element =cards.find((opt)=>{
            return opt.id == btnNext.dataset.id
          }) 
          console.log(element);
          if(element.status ==="todo") {
            element.status = "in-progress"
          }
           else if (element.status === "in-progress") {
            element.status = "done";
        }

 await miseAjourStatus(element.id , element.status);
 console.log("id", element.id);
console.log("status", element.status);
 AfficherCards(cards);
CounterCards(cards);
location.reload();

    }

    if(btnbtnPrecedent) {
        console.log(btnbtnPrecedent.dataset.id);
           const element =cards.find((opt)=>{
            return opt.id == btnbtnPrecedent.dataset.id
          }) 
              console.log(element);
        
                if (element.status === "done") {
        element.status = "in-progress";
    }
    else if (element.status === "in-progress") {
        element.status = "todo";
    }


         await miseAjourStatus(element.id , element.status);
 console.log("id", element.id);
console.log("status", element.status);
 AfficherCards(cards);
CounterCards(cards);
location.reload();

    }

})


