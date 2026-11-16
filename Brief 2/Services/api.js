
import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";

const api = axios.create({
    baseURL: "https://flowboard-api-virid.vercel.app",
    timeout: 5000
});


export function getCards() {

    return new Promise((resolve, reject) => {

        api.get("/cards")
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });

    });
}



export function getFilteredCards(filters) {

    return new Promise((resolve, reject) => {

        api.get("/cards", {
            params: filters
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        });

    });
}
