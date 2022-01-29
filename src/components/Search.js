import { useState } from "react";

import SearchForm from "./SearchForm";
import SearchDisplay from "./SearchDisplay";
// import selectedDeck from "./DeckViewPicklist";

function Search(props) {

  const URL = `http://localhost:3001/decks/${props.selectedDeck._id}`;

  console.log(props.selectedDeck)

const [cards, setCards] = useState(null)

const getCards = async (searchTerm) => {
    const response = await fetch('https://api.scryfall.com/cards/search?q=' + searchTerm)
    const data = await response.json();
    data.object === 'error' ? setCards(null):setCards(data)

}

const updateDeck = async (deck) => {
    await fetch(URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deck),
    });

    props.getDecks()
  };


    return (
        <div>
        <SearchForm getCards={getCards}/>
        <SearchDisplay cards={cards} updateDeck={updateDeck} selectedDeck={props.selectedDeck}/>
        </div>
    )
}

export default Search;