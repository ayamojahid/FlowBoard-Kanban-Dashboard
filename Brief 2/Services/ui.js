
console.log("UI.js est chargé !");

let state;


export function setUIState(appState) {
    state = appState;
}


const SpanCountTodo = document.getElementById("SpanCountTodo");
const SpanCountInProgress = document.getElementById("SpanCountInProgress");
const SpanCountDone = document.getElementById("SpanCountDone");


const todoList = document.getElementById("todo-list");
const progressList = document.getElementById("progress-list");
const doneList = document.getElementById("done-list");


export function CounterCards() {

    const todoCards = state.cards.filter(card => card.status === "todo");
    const progressCards = state.cards.filter(card => card.status === "in-progress");
    const doneCards = state.cards.filter(card => card.status === "done");

    SpanCountTodo.textContent = todoCards.length;
    SpanCountInProgress.textContent = progressCards.length;
    SpanCountDone.textContent = doneCards.length;
}


export function AfficherCards() {

    todoList.innerHTML = "";
    progressList.innerHTML = "";
    doneList.innerHTML = "";

    state.cards.forEach(opt => {

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


function AfficherTaskCard(ListType, opt) {

    const div = document.createElement("div");
    const titleCard = document.createElement("h2");

    const btnModifier = document.createElement("button");

    btnModifier.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modifier';

    btnModifier.className = "bg-blue-500 text-white px-3 py-1 rounded-lg";

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

    btnModifier.className = "block bg-slate-700 text-white px-3 py-1 rounded-lg mt-4 cursor-pointer";
    div.appendChild(btnModifier);

    ListType.appendChild(div);
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

    const cardForm = document.getElementById("cardForm");

    cardForm.addEventListener("submit", (e) => {

        e.preventDefault();

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

            console.log("ana new", newCard);

            return newCard;
        }
    });
}
