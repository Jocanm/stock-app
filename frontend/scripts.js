const BASE_URL = 'http://localhost:5000/api/stocks';

//Selectors
const symbolInput = document.querySelector('.symbol-input');
const symbolButton = document.querySelector('.symbol-button');
const symbolsList = document.querySelector('.symbols-list');
const loader = document.querySelector('.loader-container');

// Event Listeners
symbolButton.addEventListener('click', addSymbolForm);
symbolsList.addEventListener('click', deleteOrUpdate);

// Listeners Callbacks
async function addSymbolForm(event) {

    event.preventDefault()

    const symbol = symbolInput.value
    if (!symbol.trim()) return;

    loader.classList.add('show')

    try {
        const res = await fetch(`${BASE_URL}/${symbol}`, {
            method: 'POST'
        })
        const { data, inList } = await res.json()

        if (!inList) {
            addASymbol(data)
        }

    } catch (error) {
        alert('Symbol not found')
    } finally {
        symbolInput.value = ''
        loader.classList.remove('show')
    }

}

async function deleteOrUpdate(event) {

    const symbolListItem = event.target.parentElement.parentElement
    const isDelete = event.target.classList.contains('delete-button')
    const isUpdate = event.target.classList.contains('update-button')

    const symbol = symbolListItem.id

    loader.classList.add('show')

    try {
        if (isDelete) {

            await fetch(`${BASE_URL}/${symbol}`, {
                method: 'DELETE'
            })
            symbolListItem.remove()

        } else if (isUpdate) {

            const res = await fetch(`${BASE_URL}/${symbol}`, {
                method: 'PUT'
            })

            const data = await res.json()

            symbolListItem.innerHTML = symbolHtmlGenerator(data)

        }
    } catch (error) {
        console.log({error})
        alert('Symbol not found')
    } finally {
        loader.classList.remove('show')
    }

}


//Extra funtions
function addASymbol(symbol) {
    const symbolItem = document.createElement('li')
    symbolItem.className = 'symbol-item'
    symbolItem.id = symbol.symbol
    symbolItem.innerHTML = symbolHtmlGenerator(symbol)

    symbolsList.appendChild(symbolItem)
}

function symbolHtmlGenerator(symbol) {

    const isNegativeChane = symbol.change < 0
    const changeClass = isNegativeChane? 'negative-change' : 'positive-change'

    return `

    <span>
        <img
            src=${symbol.logo}
            alt=${symbol.name}
        />
    </span>

    <span>${symbol.name.toUpperCase()}</span>

    <div class="price-container ${changeClass}">
        <span>${symbol.price}</span>
        ${
            isNegativeChane
            ? "<img src='./assets/red-arrow.svg'/>"
            : "<img src='./assets/green-arrow.svg'/>"
        }
    </div>
    
    <div class="options-container">

        <button class="delete-button">
            <img src="./assets/trahs.svg"/>
        </button>

        <button class="update-button">
            <img src="./assets/update.svg"/>
        </button>
        
    </div>

`
}

// Initial Request
const getInitialData = async () => {

    console.log("getting data")

    loader.classList.add('show')

    try {
        const res = await fetch(`${BASE_URL}/all`)
        const data = await res.json()

        data.forEach(symbol => {

            addASymbol(symbol)

        })

    } catch (error) {
        console.log(error)
    } finally {
        loader.classList.remove('show')
    }

}

getInitialData()