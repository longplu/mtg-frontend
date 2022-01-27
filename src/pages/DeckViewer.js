import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DeckViewerCards from "../components/DeckViewerCards";
import DeckViewerPicklist from "../components/DeckViewerPicklist";
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

    useEffect(() => { 
        getDecks() 
    }, [])

    return (
            <div>DeckViewer Section
                <DeckViewerPicklist decks={decks}/>
                <DeckViewerCards />
                <Search />
            </div>
    )
}

export default DeckViewer;