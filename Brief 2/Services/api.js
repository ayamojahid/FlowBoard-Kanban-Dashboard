import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";


const api = axios.create({
    baseURL: "https://flowboard-api-virid.vercel.app",
    timeout: 5000 ,
     headers: {
    'X-Workspace': 'aya',
    'Content-Type': 'application/json'
  },
   params: {
        password: "1234"
    }
});

export async function getCardsWithAxios() {
        const response = await api.get("/cards");
        return response.data;
}

export async function getFilteredCards(filters) {
        const response = await api.get("/cards", {
            params: filters
        });
        return response.data;
}



export async function getelement(id) {
    return await api.get("/cards/"+id)
}

export async function modifierCard(id , cardData) {
    return await api.put("/cards/"+id , cardData)
}

// +9+
export async function miseAjourStatus(id, status) {
    return await api.patch(`/cards/${id}`, {
        status: status
    });
}

export async function deleteCard(id) {
    return await api.delete("/cards/"+id)
}



export async function AffichageAvecAI(elementCard) {
    const response = await api.post("/ai/cards", elementCard);
}
