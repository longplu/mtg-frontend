import { useEffect, useState } from "react";
import DeckViewerPicklist from "../components/DeckViewPicklist";
import DeckViewSubmitNewDecks from "../components/DeckViewSubmitNewDeck";

function DeckViewer(props) {
    const [decks, setDecks] = useState([]);

    // const URL = 'https://endofunit3build-backend.herokuapp.com/people/';
    const URL = "http://localhost:3001/decks";

    const deckPickListValues = decks.map((deck) => (
      <option key={deck._id} value={deck.name} cards={deck.cards}>{deck.name}</option>
      ))




    const [selectedDeck, setSelectedDeck] = useState({
      _id:'',
      name:'',
      cards: []
  })

//Will require a TON of refactoring...


  const handleChange = (event) => {
      setSelectedDeck( prevState => ({
          ...prevState, 
          // [event.target.name]:event.target.value
          _id: event.target.selectedIndex > 0 ? decks[event.target.selectedIndex-1]._id:'',
          name: event.target.value,
          cards:  event.target.selectedIndex > 0 ? decks[event.target.selectedIndex-1].cards:[]
      }))
  }
  const URL2 = `http://localhost:3001/decks/${selectedDeck._id}`;
  
  //
  const [newDeckCard, setNewDeckCard] = useState({

    scryfall_id: '',
    qty: ''

})

const handleChange2 = (event) => {
console.dir(event.target)
setNewDeckCard({...newDeckCard, 
scryfall_id: event.target.parentElement[0].value,
qty: event.target.value 
});
};

const handleSubmit = (event) => {
event.preventDefault()
props.updateDeck(newDeckCard)
setNewDeckCard({
    
        scryfall_id: '',
        qty: ''
    
})
}
//
    const getDecks = async () => {
      const response = await fetch(URL, {
        method: "GET",
      });
      const data = await response.json();
      setDecks(data);
    };

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

      const updateDeck = async (deck) => {
        await fetch(URL2, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deck),
        });
    
        getDecks()
      };

      

    useEffect(() => { 
        getDecks() 
    }, [])



    return (
            <div>
        <form onChange={handleChange}>
            <select name="name">
                <option value="select a deck">Select a Decklist</option>
                { deckPickListValues }
            </select>
        </form>
                <DeckViewSubmitNewDecks createDeck={createDeck} />
                <DeckViewerPicklist  
                decks={decks} 
                getDecks={getDecks} 
                updateDeck={updateDeck} 
                selectedDeck={selectedDeck} 
                handleChange={handleChange}
                deckPickListValues={deckPickListValues}

                newDeckCard={newDeckCard}
                handleChange2={handleChange2}
                handleSubmit={handleSubmit}
                />
                
            </div>
    )
}

export default DeckViewer;