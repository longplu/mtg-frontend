import React from "react";
import DeckViewerCards from "../components/DeckViewerCards";
import DeckViewerPicklist from "../components/DeckViewerPicklist";

function DeckViewer(props) {
    return (
            <div>DeckViewer Section
                <DeckViewerPicklist />
                <DeckViewerCards />
            </div>
    )
}

export default DeckViewer;