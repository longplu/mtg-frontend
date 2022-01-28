import { useEffect, useState } from "react";
import DeckViewerPicklist from "../components/DeckViewPicklist";
import DeckViewSubmitNewDecks from "../components/DeckViewSubmitNewDeck";
import Search from "./Search";

function DeckViewer(props) {
    const [decks, setDecks] = useState([]); // represent emptiness of state with what is appropriate. If state is set with an array use an empty array not null.

    // const URL = 'https://endofunit3build-backend.herokuapp.com/people/';
    const URL = "http://localhost:3001/decks";
  
    const getDecks = async () => {
      const response = await fetch(URL, {
        method: "GET",
      });
      const data = await response.json();
      setDecks(data);
    };

    const createDeck = async (deck) => {
        await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deck),
        });
    
        getDecks();
      };

    useEffect(() => { 
        getDecks() 
    }, [])

    return (
            <div>DeckViewer Section
                <DeckViewSubmitNewDecks createDeck={createDeck} />
                <DeckViewerPicklist  decks={decks}/>
                <Search />
            </div>
    )
}

export default DeckViewer;