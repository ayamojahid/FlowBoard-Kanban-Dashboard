
import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";

const api = axios.create({
    baseURL: "https://flowboard-api-virid.vercel.app",
    timeout: 5000 ,
     headers: {
    'X-Workspace': 'aya',
  },
   params: {
        password: "1234"
    }
});

export async function getCardsWithAxios() {
    try {
        const response = await api.get("/cards");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getFilteredCards(filters) {
    try {
        const response = await api.get("/cards", {
            params: filters
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getelement(id) {
    return await api.get("/cards/"+id)
}

export async function modifierCard(id , cardData) {
    return await api.put("/cards/"+id , cardData)
}