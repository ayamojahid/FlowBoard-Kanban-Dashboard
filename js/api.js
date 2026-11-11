

export function getCards() {
    
    return fetch("https://flowboard-api-virid.vercel.app/cards")
        .then(response => {
            if(!response.ok) {
                throw new Error(`Reponce Status : ${response.status}`)
            }

            return response.json();

        })
       
        .catch(error => {
            console.log(error);
             console.error( "error throw" , error);
        });
}





// fetch("https://flowboard-api-virid.vercel.app/cards")
// .then((response) => response.json())
// .then((json) => console.log(json));