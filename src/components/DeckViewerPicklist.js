import { useState } from 'react'

function DeckViewerPicklist(props) {
    const deckPickListValues = props.decks.map((deck) => (
        <option key={deck._id} value={deck.name}>{deck.name}</option>
        ))

    return (
        <div>
        <form action="">
            <select name="list" placeholder='Select a Decklist'>
                ${deckPickListValues}
            </select>
        </form>

        <form action="/decks">
            <input 
                type="text"
                name="name"
                placeholder='deck name'
            />

            <input type="submit" value="Create a New Deck" />
        </form>
        </div>
    )
}

export default DeckViewerPicklist;