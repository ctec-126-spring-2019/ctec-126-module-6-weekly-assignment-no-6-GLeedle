// script.js
// Weekly Assignment No. 6
// Garth Leedle
// CTEC 126 - Java Script

/*
* All of the code must be adequetely commented.
* This includes the code that you write and the code that was provided.
*/

// building the playing card class
class PlayingCard {
    constructor(element, face, suit) {
        // setting the properties for the playingCard class
        this.element = element
        this.face = face
        this.suit = suit
        this.img= `img/${face}_of_${suit}.png`
        this.state = 0

        // Event Listener that engages when the element is clicked
        this.element.addEventListener('click', () => {
            // Condition to check the state of the card and changes the src when clicked
            if (this.state == 0 ) {
                this.element.src = this.img
                this.state = 1
            } else {
                this.element.src = 'img/back.png'
                this.state = 0
            }            
        })
    }

    // function call that sets the src to the face of the card
    showFaces() {
        this.element.src = this.img
    }

    // function cal that sets the src to the back of the card
    showBacks() {
        this.element.src = 'img/back.png'
    }
}

// function to create the card image to be displayed
function createCardImage() {
   const img = document.createElement('img')
   img.src = 'img/back.png'
   return img
}

// function to display the deck of cards, assigns card to the container variable that displays on the page under #container
function displayDeck() {
   deck.forEach(card => {
        container.appendChild(card.element)
   });
}

// uses the math library to randomize the order of the deck
function shuffleDeck() {
    for (let i = 0; i < 1000; i++) {
        deck.sort(() => Math.random() - 0.5)
    }
}

// condition to make sure the deck isn't 0 then grabs the handle on the img properties and removes a card from the array.
// if the deck is empty / equal to zero it displays error message
function removeCard() {
    if (deck.length != 0) {
        card = document.querySelector('img')
        card.remove()
        deck.shift()
        if (deck.length == 0) {
            actions.innerHTML = 'No cards left in the deck. :-('
        }
    }
}

// function that creates the deck of cards,  
function buildDeck() {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs']
    const faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

    // iterates through each suit and face of the card and assigns the id to the image
    suits.forEach(suit => {
        faces.forEach(face => {
            const image = createCardImage()
            image.setAttribute('id',`${face}_of_${suit}.png`)
            deck.push(new PlayingCard(image, face, suit))            
        })
    })
}

// function that sets the #actions to an empty string
function clearActions() {
    actions.innerHTML = ''
}

// accumulator array for the deck is created
let deck = []

// gets a handle on each of the id's of the buttons and div's from the HTML
const container = document.querySelector('#container')
const actions = document.querySelector('#actions')
const shuffleBtn = document.querySelector('#shuffle')
const removeBtn = document.querySelector('#remove')
const newDeckBtn = document.querySelector('#newdeck')
const showFacesBtn = document.querySelector('#showfaces')
const showBacksBtn = document.querySelector('#showbacks')

// Event listener to watch the shuffle button and calls the shuffleDeck() function, has a timeout to give the user a little pause before displaing the new deck.
shuffleBtn.addEventListener('click', () => {
    actions.innerHTML = 'The deck of cards has been shuffled.'
    container.innerHTML = ''
    shuffleDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

// Even listener that watches the remove card button and calls the removeCard() functions, again with a pause
removeBtn.addEventListener('click', () => {
    actions.innerHTML = 'A card was removed.'
    removeCard()
    setTimeout(clearActions, 5000)
})


newDeckBtn.addEventListener('click', () => {
    actions.innerHTML = 'A new deck of cards has been created.'
    deck = []
    container.innerHTML = ''
    buildDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

showFacesBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card faces are now showing.'
    deck.forEach(card => {
        card.showFaces()
    })
})

showBacksBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card backs are now showing.'
    deck.forEach(card => {
        card.showBacks()
    })
})

buildDeck()
shuffleDeck()
displayDeck()