

export function getCards() {
    
    return fetch("https://flowboard-api-virid.vercel.app/cards")
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });
}