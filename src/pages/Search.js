import { useState } from "react";

import SearchForm from "../components/SearchForm";
import SearchDisplay from "../components/SearchDisplay";

function Search() {

const [cards, setCards] = useState(null)

const getCards = async (searchTerm) => {
    const response = await fetch('https://api.scryfall.com/cards/search?q=' + searchTerm)
    const data = await response.json();
    data.object === 'error' ? setCards(null):setCards(data)

}


    return (
        <div>Search Section
        <SearchForm getCards={getCards}/>
        <SearchDisplay cards={cards}/>
        </div>
    )
}

export default Search;