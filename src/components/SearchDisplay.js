import { useState } from "react";

function SearchDisplay(props) {
  
    // console.log(props)

    const [newDeckCard, setNewDeckCard] = useState({

                scryfall_id: '',
                qty: ''

    })

    const handleChange = (event) => {
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
    
    console.log(props.selectedDeck._id)
    // console.log(props.newDeckCard)

    const loaded = () => {
    return (
        props.cards.data.map((card) => (
            <div key={card.id}>
                <h3>{card.name}</h3>
                <form onSubmit={handleSubmit}>
                    {/* <input type="string" value={props.selectedDeck._id} name="_id" hidden readOnly="isReadOnly"/> */}
                    {/* <input type="string" value={props.selectedDeck._name} name="name" hidden readOnly="isReadOnly"/> */}
                    <input type="string" value={card.id} name="scryfall_id" hidden readOnly="isReadOnly" onChange={handleChange}/>
                    <input type="number" name="qty" onChange={handleChange}/>
                    <input type="submit" value="add to deck"/>
                </form>
            </div>
        ))
    )
    }
    const loading = () => <h1>No cards to display...</h1>

    return props.cards ? loaded() : loading()
}

export default SearchDisplay;