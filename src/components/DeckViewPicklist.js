
import DeckViewerCards from './DeckViewerCards'
import Search from './Search'

function DeckViewerPicklist(props) {
    // const deckPickListValues = props.decks.map((deck) => (
    //     <option key={deck._id} value={deck.name} cards={deck.cards}>{deck.name}</option>
    //     ))

//         const [selectedDeck, setSelectedDeck] = useState({
//             _id:'',
//             name:'',
//             cards: []
//         })

// //Will require a TON of refactoring...


//         const handleChange = (event) => {
//             setSelectedDeck( prevState => ({
//                 ...prevState, 
//                 _id: event.target.selectedIndex > 0 ? props.decks[event.target.selectedIndex-1]._id:'',
//                 name: event.target.value,
//                 cards:  event.target.selectedIndex > 0 ? props.decks[event.target.selectedIndex-1].cards:[]
//             }))
//         }

    return (
        <div>
        {/* <form onChange={props.handleChange}>
            <select name="name">
                <option value="select a deck">Select a Decklist</option>
                { props.deckPickListValues }
            </select>
        </form> */}
        <DeckViewerCards 
        selectedDeck={props.selectedDeck} 
        updateDeck={props.updateDeck} 
        newDeckCard={props.newDeckCard} 
        handleChange2={props.handleChange2} 
        handleSubmit={props.handleSubmit}/>
        <Search selectedDeck={props.selectedDeck} getDecks={props.getDecks} updateDeck={props.updateDeck}/>
        </div>
    )
}

export default DeckViewerPicklist;