//import


import { getCards } from "./api.js";


const state={
    cards: []
}



getCards()
    .then(data => {
        state.cards=data;

        CounterCards();
       
console.log("last me" , state.cards);


//         console.log("Data:", data);
// console.log("Is Array:", Array.isArray(data));
// console.log("Cards:", state.cards);
// console.log("Is Array:", Array.isArray(data));

        AfficherCards() 

        
    })
    .catch(error => {
        console.log(error);
    });



const SpanCountTodo = document.getElementById("SpanCountTodo");
const SpanCountInProgress = document.getElementById("SpanCountInProgress");
const SpanCountDone = document.getElementById("SpanCountDone");


function CounterCards() {
   
const todoCards = state.cards.filter(card => card.status === "todo");
const progressCards =state.cards.filter(card=> card.status === "in-progress");
const doneCards = state.cards.filter(card=> card.status === "done");

console.log("ana todoo card " , todoCards)
SpanCountTodo.textContent = todoCards.length;
SpanCountInProgress.textContent= progressCards.length;
SpanCountDone.textContent=doneCards.length;


// console.log("lenght all" ,  state.cards.length);
// console.log("lenght todo" , todoCards.length);
// console.log("lenght in" , progressCards.length);
// console.log("lenght done" ,doneCards.length);

// console.log("Cards:", state.cards);


SpanCountTodo.textContent = todoCards.length;
SpanCountInProgress.textContent= progressCards.length;
SpanCountDone.textContent=doneCards.length;
} 


const todoList = document.getElementById("todo-list");
const progressList = document.getElementById("progress-list");
const doneList = document.getElementById("done-list");

function  AfficherCards() {

todoList.innerHTML="";
progressList.innerHTML="";
doneList.innerHTML="";

state.cards.forEach(opt => {
  
    
    const div = document.createElement("div");
    const titleCard =document.createElement("h5");

  
    
    titleCard.textContent=opt.title;

    div.className = "bg-white p-4 rounded-lg shadow-sm border border-gray-200";

    if(opt.status === "todo") {
        div.appendChild(titleCard);
        todoList.appendChild(div);
        div.innerHTML+=`
      
        <strong>  Assignee: ${opt.assignee}     </strong>
        <p>Description :  ${opt.description}  </p>
        <p> Statue : ${opt.status} </p>
        <p> Priority : ${opt.priority}  </p>
        <p> Date : ${opt.dueDate}  </p>
        
        `
        opt.tags.forEach((opt)=>{
            
            const p = document.createElement("p");
           

            div.innerHTML+=`
        <p>Tags :  ${opt}  </p>
            
            `;
        })
        
    }
});


}


