import { useEffect, useState } from "react";
function Index(props) {

//List all states

//All decks
const [decks, setDecks] = useState([]);

//Selected deck
const [selectedDeck, setSelectedDeck] = useState({
    _id:'',
    name:'',
    cards: []
})

//New deck
const [newDeck, setNewDeck] = useState({
    name:'',
    cards: []
})


//Selected deck cards
// const [deckCards, setDeckCards] = useState([])

//Search cards

const [formState, setFormState] = useState({
    searchTerm: ''
});

const [searchCards, setSearchCards] = useState(null)

//New deck card
const [newDeckCard, setNewDeckCard] = useState({

    scryfall_id: '',
    qty: '',
    image: '',
    name: ''

})


//List all backend routes

const URL = "https://mtg-manager-plus-backend.herokuapp.com/decks/";

const getDecks = async () => {
    const response = await fetch(URL, {
      method: "GET",
    });
    const data = await response.json();
    setDecks(data);
  };

// const getDeckCards = async () => {
//     const response = await fetch(URL+selectedDeck._id, {
//       method: "GET",
//     });
//     const data = await response.json();
//     console.log(data)
//     // setDeckCards(data.cards);
//   };

const createDeck = async (deck) => {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deck),
    });

    getDecks();
  };

const deleteDeck = async (deck) => {
      console.log(deck)
    await fetch(URL + deck, {
      method: "DELETE",
    });

    getDecks();
}

  const updateDeck = async (card) => {
    await fetch(URL+selectedDeck._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });

    getDecks()
  };
  

  useEffect(() => { 
      getDecks()
  }, [])

const getSearchCards = async (searchTerm) => {
    const response = await fetch('https://api.scryfall.com/cards/search?q=' + searchTerm)
    const data = await response.json();
    data.object === 'error' ? setSearchCards(null):setSearchCards(data)
}

//Helper Function
  const deckPickListValues = decks.map((deck) => (
    <option key={deck._id} value={deck.name} cards={deck.cards}>{deck.name}</option>
    ))

// const listDeckCards = selectedDeck.cards.map((card) => (
//     <h4 key={card._id}>
//         {card.qty}  {card.scryfall_id}
//     </h4>
// ))
// console.log(!!selectedDeck.selectedIndex)
const listDeckCards = !!selectedDeck.selectedIndex ? decks[selectedDeck.selectedIndex-1].cards.map((card) => (
    <div>
    <h4 key={card._id}>
        {card.qty} X
    </h4>
    <img src={card.image} alt={card.name} ></img>

    </div>
)):<h1>No cards to display...</h1>

const loaded = () => {
    // console.log(searchCards.data[0].image_uris.normal)
    // console.log(searchCards.data)

    return (
        searchCards.data.map((card) => (
            <div key={card.id}>
                <img src={card.image_uris ? card.image_uris.small:'#' } alt={card.name} ></img>
                <h3 >{card.name}</h3>
                <form onSubmit={handleSubmitNewDeckCard}>
                    <input type="text" value={card.id} name="scryfall_id" hidden readOnly="isReadOnly" />
                    <input 
                    type="number" 
                    id={searchCards.data.indexOf(card)} 
                    name="qty" 
                    onChange={handleChangeNewDeckCard}/>
                    <input type="text" value={card.name} name="name" hidden readOnly="isReadOnly" />
                    <input type="text" value={card.image_uris ? card.image_uris.small:'#'} name="image" hidden readOnly="isReadOnly" />
                    <input type="submit" value="add to deck"/>
                </form>
            </div>
        ))
    )
    }
    const loading = () => <h1>No cards to display...</h1>

//Event Handlers
    const handleChangeNewDeck = (event) => {
        setNewDeck( prevState => ({
            ...prevState, 
            [event.target.name]: event.target.value 
        }))
    }

    const handleSubmitNewDeck = (event) => {
        event.preventDefault()
        console.dir(event.target)
        createDeck(newDeck)
        setNewDeck({
            name:'',
            cards: []
        })
    }
    const handleChangeSelectDeck = (event) => {
        setSelectedDeck( prevState => ({
            ...prevState, 
            // [event.target.name]:event.target.value
            _id: event.target.selectedIndex > 0 ? decks[event.target.selectedIndex-1]._id:'',
            name: event.target.value,
            cards:  event.target.selectedIndex > 0 ? decks[event.target.selectedIndex-1].cards:[],
            selectedIndex: event.target.selectedIndex
        }))
    }

    const handleChangeSearchCards = (event) => {
        setFormState({ searchTerm: event.target.value });
    };

    const handleSubmitSearchCards = (event) => {
        event.preventDefault();
        getSearchCards(formState.searchTerm)
    }
    const handleChangeNewDeckCard = (event) => {
        console.dir(event.target.parentElement[0])
        setNewDeckCard((prevState) => ({
            ...prevState, 
            scryfall_id: event.target.parentElement[0].value,
            qty: event.target.value,
            name: event.target.parentElement[2].value,
            image: event.target.parentElement[3].value,

            

        }));
    };

    const handleSubmitNewDeckCard = (event) => {
        event.preventDefault()
        updateDeck(newDeckCard)
        setNewDeckCard({
                
                    scryfall_id: '',
                    qty: ''
                
        })
    }

    const handleClickDeleteDeck = () => {
        deleteDeck(selectedDeck._id);
        setSelectedDeck({
            _id:'',
            name:'',
            cards: []
        })
    }

//List all 

return (
    <div>

{/* PICKLIST */}
        <form onChange={handleChangeSelectDeck}>
        <select name="name">
            <option>Select a Decklist</option>
            { deckPickListValues }
        </select>
        </form>

{/* CREATE NEW DECK */}
        <form onSubmit={handleSubmitNewDeck}>
        <input 
            type="text"
            value={newDeck.name}
            name="name"
            placeholder='deck name'
            onChange={handleChangeNewDeck}
            />

        <input type="submit" value="Create a New Deck" />
        </form>

{/* DELETE SELECTED DECK */}
        <button onClick={handleClickDeleteDeck}>
            Delete Selected Deck
        </button>

{/* SHOW SELECTED DECK CARDS */}
        <div>

            { listDeckCards }
        
        </div>

{/* SEARCH NEW DECK CARDS */}
        <form onSubmit={handleSubmitSearchCards}> Search Cards to add: 
                <input type="text" value={formState.searchTerm}  onChange={handleChangeSearchCards}/>
                <input type="submit" value="submit" />
        </form>

{/* SHOW NEW DECK CARD FORMS */}
        <div>

            {searchCards ? loaded() : loading()}

        </div>
    </div>


)

}

export default Index;