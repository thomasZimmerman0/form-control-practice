let form = document.querySelector('form');
let cardsContainer = document.getElementById('cards');
let cardIdNo = -1;

let createCard = (formData) => {
    cardIdNo++
    let fname = '';
    let mname = '';
    let lname = '';
    let address = '';
    let phone = '';
    let color = '';

    for(let data of formData){
        switch(data.id){
            case 'fname' :
                fname = data.value
                break;
            case 'mname' :
                mname = data.value
                break;
            case 'lname' :
                lname = data.value
                break;
            case 'address' :
                address = data.value
                break;
            case 'phone' :
                phone = data.value
                break;
            case 'fav color' :
                color = data.value
                break;
        }
    }

    return `<div id="card-${cardIdNo}" class="row border border-black p-2">
                <h2>${fname} ${mname} ${lname}</h2>
                <ul>
                    <li>${address}</li>
                    <li>${phone}</li>
                    <li>${color}</li>
                </ul>
                <button class="btn btn-primary edit">Edit</button>
                <button class="btn btn-primary delete">Delete</button>
            </div>
    `
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let formData = document.querySelectorAll('form input');
    cardsContainer.innerHTML += createCard(formData, cardIdNo);

    let cards = document.querySelectorAll("#cards div")

    for(let card of cards){
        card.addEventListener('click', (e)=>{
            if(e.target.className.includes('edit')){
                if(e.target.textContent == 'Edit'){
                    e.target.textContent = 'Save';
                    let input = document.createElement('input');
                    input.setAttribute('class', 'name')
                    input.setAttribute('value', card.querySelector('h2').textContent);
                    card.replaceChild( input ,card.querySelector('h2'));
                    card.querySelectorAll('ul li').forEach(li => {
                        let input = document.createElement('input');
                        input.setAttribute('value', li.textContent);
                        li.textContent = "";
                        li.append(input);
                    });
                } else {
                    e.target.textContent = 'Edit';
                    let h2 = document.createElement('h2');
                    h2.textContent = card.querySelector('.name').value;
                    card.replaceChild(h2, card.querySelector('.name'));
                    card.querySelectorAll('ul li').forEach(li =>{
                        let input = li.querySelector('input').value;
                        li.innerHTML = ""
                        li.textContent = input;
                    })
                }
            }
            if(e.target.className.includes('delete')){
                card.remove()
            }
        });
    }
});