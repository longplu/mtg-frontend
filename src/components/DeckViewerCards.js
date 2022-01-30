import { useState } from "react";



function DeckViewerCards(props) {

    const [newDeckCard, setNewDeckCard] = useState({

        scryfall_id: '',
        qty: ''
    
    })
    
    const handleChange = (event) => {
        setNewDeckCard( prevState => ({
            ...prevState, 
            [event.target.name]: event.target.value 
        }))
    }

    const listDeckCards = props.selectedDeck.cards.map((card) => (
        <h4 key={card._id} onChange={handleChange}>
            {card.qty}  {card.scryfall_id}
        </h4>
    ))


    return (
        <div>

            {listDeckCards}
        
        </div>
    )
}

export default DeckViewerCards;