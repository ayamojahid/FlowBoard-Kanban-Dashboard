

export function getCards() {
    
    return fetch("https://flowboard-api-virid.vercel.app/cards")
        .then(response => {
            if(!response.ok) {
                throw new Error(`Reponce Status : ${response.status}`)
            }

            return response.json();

        })
       
}


export function getFilteredCards(filters) {

    const params = new URLSearchParams(filters);

    return fetch(`https://flowboard-api-virid.vercel.app/cards?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();
        });
}


// fetch("https://flowboard-api-virid.vercel.app/cards")
// .then((response) => response.json())
// .then((json) => console.log(json));