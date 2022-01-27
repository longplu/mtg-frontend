import { useState } from 'react'

function DeckViewerPicklist(props) {
    const deckPickListValues = props.decks.map((deck) => (
        <option key={deck._id} value={deck.name}>{deck.name}</option>
        ))
        
    const [newDeck, setNewDeck] = useState({
        user:'',
        name:'',
        cards: []
    })

    const handleChange = (event) => {
        setNewDeck( prevState => ({
            ...prevState, 
            [event.target.name]: event.target.value 
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.createDeck(newDeck)
        setNewDeck({
            user:'',
            name:'',
            cards: []
        })
    }

    return (
        <div>
        <form action="">
            <select name="list" placeholder='Select a Decklist'>
                ${deckPickListValues}
            </select>
        </form>

        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={newDeck.name}
                name="name"
                placeholder='deck name'
                onChange={handleChange}
            />

            <input type="submit" value="Create a New Deck" />
        </form>
        </div>
    )
}

export default DeckViewerPicklist;