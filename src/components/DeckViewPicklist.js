import { useState } from 'react'
import DeckViewerCards from './DeckViewerCards'
import Search from './Search'

function DeckViewerPicklist(props) {
    const deckPickListValues = props.decks.map((deck) => (
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
                _id: event.target.selectedIndex > 0 ? props.decks[event.target.selectedIndex-1]._id:'',
                name: event.target.value,
                cards:  event.target.selectedIndex > 0 ? props.decks[event.target.selectedIndex-1].cards:[]
            }))
        }
    

    return (
        <div>
        <form onChange={handleChange}>
            <select name="name">
                <option value="select a deck">Select a Decklist</option>
                { deckPickListValues }
            </select>
        </form>
        <DeckViewerCards selectedDeck={selectedDeck} />
        <Search selectedDeck={selectedDeck} getDecks={props.getDecks}/>
        </div>
    )
}

export default DeckViewerPicklist;