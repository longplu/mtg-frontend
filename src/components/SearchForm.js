import { useState } from 'react';

function SearchForm(props) {
    const [formState, setFormState] = useState({
        searchTerm: ''
    });

    const handleChange = (event) => {
        setFormState({ searchTerm: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.getCards(formState.searchTerm)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formState.searchTerm} onChange={handleChange}/>
                <input type="submit" value="submit" />
            </form>
        </div>
    )
};

export default SearchForm;