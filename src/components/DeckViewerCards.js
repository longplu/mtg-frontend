function DeckViewerCards(props) {

    const listDeckCards = props.selectedDeck.cards.map((card) => (
        <h4 key={card._id}>
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