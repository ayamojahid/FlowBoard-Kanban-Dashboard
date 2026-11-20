
console.log("main.js est travaille");

import {
    getCardsWithAxios,
    getFilteredCards,
    getelement,
    miseAjourStatus,
    modifierCard,
    deleteCard,
    AffichageAvecAI
} from "./api.js";

import {
    CounterCards,
    AfficherCards,
    Model,
    ValidationForm
} from "./ui.js";

let cards = null;



const errordiv = document.getElementById("errorDiv");
const loadingDiv = document.getElementById("loadingDiv");
const retry = document.getElementById("retry");

async function featchingCard() {
    errordiv.hidden=true;
    loadingDiv.hidden = false;

    try{
        const data = await getCardsWithAxios();
        cards = data;
        CounterCards(cards);
        AfficherCards(cards);

    }
    catch{
        errordiv.hidden = false;
    }
    finally{
    loadingDiv.hidden = true;
    }

}


retry.addEventListener("click", () => {
    featchingCard();
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
            console.error("erreur de filte est ", error);
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


featchingCard();


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
   
console.log("je suis carte id de l'element " , cardId)


cardModal.close();
Swal.fire({
  title: "L'Element a ete Modifier Avec succes",
  text: "You clicked the button!",
  icon: "success"
});
featchingCard();
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
featchingCard()


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

    }

})




// sectionTodo.addEventListener("click" , async(e)=>{

    
// // console.log(e.target.closest(".btnSupprimer"))
// const btnSupprimerElement = e.target.closest(".btnSupprimer");
// if(btnSupprimerElement){
// // console.log(btnSupprimerElement.dataset.id);

// const idbtnId = btnSupprimerElement.dataset.id;
// console.log(idbtnId)
// try{

// const funSupprimer = await deleteCard(idbtnId);
// featchingCard() 

// Swal.fire({
//   title: "Element supprimer Avec succes",
//   text: "You clicked the button!",
//   icon: "success"
// });

// }
// catch{
//     console.log("elemement ne modifier pas");
//     Swal.fire({
//   title: "Element n'ont supprimer reassayer",
//   text: "You clicked the button!",
//   icon: "error"
// });
// }} })




sectionTodo.addEventListener("click" , async(e)=>{
const emptyMessageDeSuppression =document.getElementById("emptyMessageDeSuppression");
    console.log(emptyMessageDeSuppression)
// console.log(e.target.closest(".btnSupprimer"))
const btnSupprimerElement = e.target.closest(".btnSupprimer");
if(btnSupprimerElement){
// console.log(btnSupprimerElement.dataset.id);

const idbtnId = btnSupprimerElement.dataset.id;
console.log(idbtnId)

Swal.fire({
      title: "vous etre sur ",
      text: "voulez vous suprimer la tache ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui,suprime",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
            emptyMessageDeSuppression.textContent=""
        const funSupprimer = await deleteCard(idbtnId);
          featchingCard() 
        Swal.fire({
          title: "Deleted!",
          text: "Votre tache etait suprimée.",
          icon: "success",
        });
        }
        catch(error){
            emptyMessageDeSuppression.textContent="  Erreur  Suppression nest pas fait"
          console.log(  "Erreur de supprimer cette carte" )
        }
      }
    });

}})



// generalisation   avec ai

const btnAjAI = document.querySelector("#Bouton-Ajout-Card-withIA");
const dialogAI = document.querySelector("#dialogAI");

btnAjAI.addEventListener("click", () => {
    dialogAI.showModal();
});

const closeBtn = document.querySelector("#closeBtn");

closeBtn.addEventListener("click", () => {
    dialogAI.close();
});


const FormAi = document.querySelector("#FormAi");

FormAi.addEventListener("submit" ,async (e)=>{
e.preventDefault();

// console.log("salaa")

if(FormAi.checkValidity()) {

    const objetAi = {
description : document.querySelector('[name ="descriptionduprojet"]').value ,

count : Number(document.querySelector('[name="countAiNumber"]').value)
}

 console.log(objetAi)

try{
    const nouvelleCard = await AffichageAvecAI(objetAi)
    featchingCard()
    console.log(nouvelleCard)
}
catch(error) {
    console.log(error)

}
}
})
