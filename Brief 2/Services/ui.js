
console.log("UI.js travaille");




const SpanCountTodo = document.getElementById("SpanCountTodo");
const SpanCountInProgress = document.getElementById("SpanCountInProgress");
const SpanCountDone = document.getElementById("SpanCountDone");


const todoList = document.getElementById("todo-list");
const progressList = document.getElementById("progress-list");
const doneList = document.getElementById("done-list");


export function CounterCards(cards) {

    const todoCards = cards.filter(card => card.status === "todo");
    const progressCards = cards.filter(card => card.status === "in-progress");
    const doneCards = cards.filter(card => card.status === "done");

    SpanCountTodo.textContent = todoCards.length;
    SpanCountInProgress.textContent = progressCards.length;
    SpanCountDone.textContent = doneCards.length;

}


export function AfficherCards(cards) {


 

    
    todoList.innerHTML = "";
    progressList.innerHTML = "";
    doneList.innerHTML = "";

    cards.forEach(opt => {

        if (opt.status === "todo") {
            AfficherTaskCard(todoList, opt);
            
        }

        if (opt.status === "in-progress") {
            AfficherTaskCard(progressList, opt);
        }

        if (opt.status === "done") {
            AfficherTaskCard(doneList, opt);
        }
    });

    
}

    const div = document.createElement("div");

function AfficherTaskCard(ListType, opt) {

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

    opt.tags.forEach((tag) => {

        const p = document.createElement("span");

        p.className = "inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md mr-2 mb-2";

        p.textContent = `#${tag}`;

        div.append(p);
    });

    // creer de bouton modifier
    const btnModifier = document.createElement("button");
    btnModifier.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modifier';
    btnModifier.className = "block bg-slate-700 text-white px-3 py-1 rounded-lg mt-4 cursor-pointer";
    btnModifier.dataset.id=opt.id;
    

    btnModifier.classList.add("btnEditData")

      const btnSupprimer = document.createElement("button");
      
      btnSupprimer.innerHTML='<i class="fa-solid fa-trash-can"></i>Supprimer'
      btnSupprimer.className="btnSupprimer block bg-red-700 text-white px-3 py-1 rounded-lg mt-4 cursor-pointer"
      btnSupprimer.dataset.id=opt.id;


    div.append(btnModifier , btnSupprimer);
    
    ListType.appendChild(div);

    const divBtnPrecNext =document.createElement('div');
    divBtnPrecNext.classList=" flex mt-3 justify-between "

 const btnPrecedent = document.createElement("button");
btnPrecedent.className = "btnPrecedent bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-lg transition";
btnPrecedent.innerHTML = '<i class="fa-solid fa-circle-arrow-left text-slate-600"></i>';
btnPrecedent.dataset.id = opt.id;


    const btnNext = document.createElement("button");
    btnNext.className = "btnNext bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-lg transition";
    btnNext.innerHTML = '<i class="fa-solid fa-circle-arrow-right  text-slate-600"></i>';
btnNext.dataset.id = opt.id;
    

    if(opt.status == "todo") {
        divBtnPrecNext.append(btnNext)
         div.appendChild(divBtnPrecNext);
    }
    else if (opt.status === "in-progress") {
        divBtnPrecNext.append(btnPrecedent , btnNext)
    div.append(divBtnPrecNext);
} 
else if (opt.status === "done") {
        divBtnPrecNext.append(btnPrecedent)

    div.appendChild(divBtnPrecNext);
}

}


const cardModal = document.getElementById("cardModal");

export function Model() {

    const BoutonAjoutCard = document.getElementById("Bouton-Ajout-Card");

    BoutonAjoutCard.addEventListener("click", () => {
        cardModal.showModal();
    });

    const cancelModal = document.getElementById("cancelModal");

    cancelModal.addEventListener("click", () => {
        cardModal.close();
    });
}



const titleInput = document.querySelector("#title");
const assigneeInput = document.querySelector("#assignee");
const tagsInput = document.querySelector("#tags");
const dueDateInput = document.querySelector("#dueDate");
const priorityInput = document.querySelector("#priority");
const statusInput = document.querySelector("#status");
const descriptionText = document.querySelector("#description");


export function RejexModel() {

    const RejexText = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
    const RejexTags = /^[a-zA-ZÀ-ÿ\s,'-]{2,100}$/;

    const ValidTitle = RejexText.test(titleInput.value.trim());
    const ValidAssigne = RejexText.test(assigneeInput.value.trim());
    const ValidTags = RejexTags.test(tagsInput.value.trim());

    const mesageErrorTitle = document.getElementById("mesageErrorTitle");
    const mesageErrorAssigne = document.getElementById("mesageErrorAssigne");
    const mesageErrorTags = document.getElementById("mesageErrorTags");

    if (ValidTitle) {
        titleInput.style.borderColor = "green";
        mesageErrorTitle.textContent = "";
    } else {
        titleInput.style.borderColor = "red";
        mesageErrorTitle.textContent = "Invalid Title";
    }

    if (ValidAssigne) {
        assigneeInput.style.borderColor = "green";
        mesageErrorAssigne.textContent = "";
    } else {
        assigneeInput.style.borderColor = "red";
        mesageErrorAssigne.textContent = "Invalid Assignee";
    }

    if (ValidTags) {
        tagsInput.style.borderColor = "green";
        mesageErrorTags.textContent = "";
    } else {
        tagsInput.style.borderColor = "red";
        mesageErrorTags.textContent = "Invalid Tags";
    }

    const NewdueDate = new Date(dueDateInput.value);
    const CurrentDate = new Date();

    NewdueDate.setHours(0, 0, 0, 0);
    CurrentDate.setHours(0, 0, 0, 0);

    const ValiditeDate = NewdueDate >= CurrentDate;

    if (ValiditeDate) {
        dueDateInput.style.borderColor = "green";
    } else {
        dueDateInput.style.borderColor = "red";
    }

    const validatePriority = priorityInput.value !== "";
    const validateStatus = statusInput.value !== "";

    priorityInput.style.borderColor = validatePriority ? "green" : "red";
    statusInput.style.borderColor = validateStatus ? "green" : "red";

    return ValidTitle && ValidAssigne && ValidTags &&
        ValiditeDate && validateStatus && validatePriority;
}



export function ValidationForm() {

    if (RejexModel()) {

        const newCard = {
            title: titleInput.value,
            assignee: assigneeInput.value,
            tags: tagsInput.value.split(","),
            description: descriptionText.value,
            dueDate: dueDateInput.value,
            priority: priorityInput.value,
            status: statusInput.value
        };
        return newCard;
    }
    
}



export function sessionS() {

    titleInput.addEventListener("input", () => {
        sessionStorage.setItem("title", titleInput.value);
    });

    assigneeInput.addEventListener("input", () => {
        sessionStorage.setItem("assigne", assigneeInput.value);
    });

    tagsInput.addEventListener("input", () => {
        sessionStorage.setItem("tags", tagsInput.value);
    });

    descriptionText.addEventListener("input", () => {
        sessionStorage.setItem("description", descriptionText.value);
    });

    dueDateInput.addEventListener("change", () => {
        sessionStorage.setItem("date", dueDateInput.value);
    });

    priorityInput.addEventListener("change", () => {
        sessionStorage.setItem("priority", priorityInput.value);
    });

    statusInput.addEventListener("change", () => {
        sessionStorage.setItem("status", statusInput.value);
    });
}


export function getSession() {
    titleInput.value = sessionStorage.getItem("title") || "";
    assigneeInput.value = sessionStorage.getItem("assigne") || "";
    tagsInput.value = sessionStorage.getItem("tags") || "";
    descriptionText.value = sessionStorage.getItem("description") || "";
    dueDateInput.value = sessionStorage.getItem("date") || "";
    priorityInput.value = sessionStorage.getItem("priority") || "";
    statusInput.value = sessionStorage.getItem("status") || "";
}