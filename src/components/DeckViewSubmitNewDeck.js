import { useState } from 'react'

function DeckViewSubmitNewDecks(props) {
    const [newDeck, setNewDeck] = useState({
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
            name:'',
            cards: []
        })
    }
    return (
        <div>


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

export default DeckViewSubmitNewDecks;