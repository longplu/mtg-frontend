function SearchDisplay(props) {
    const loaded = () => {
    return (
        props.cards.data.map((card) => (
            <div key={card.id}>
                <h3>{card.name}</h3>
            </div>
        ))
    )
    }
    const loading = () => <h1>No cards to display...</h1>

    return props.cards ? loaded() : loading()
}

export default SearchDisplay;