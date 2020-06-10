// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function (res) {
//     return res.json()
// }).then(function (data) {

// });

function getUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( (res) => { return res.json() })
    .then( states => {
        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        } 
    } )
}

getUFs();

function getCities (event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    
    citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)  

// Itens de coleta
// Pegar todos os <li>

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


let collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLI = event.target;
    //Toggle: add or remove a class 
    itemLI.classList.toggle("selected");

    const itemId = itemLI.dataset.id;

    // verify if there are items selected

    // if the item is selected, add to  the selection

    // if the item is already on the list and it's selected again, remove it from the collection

    const alreadySelected = selectedItems.findIndex( item => {
        return item === itemId
    })

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            return item != itemId
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems
}