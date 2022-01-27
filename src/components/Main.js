import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeckViewer from '../pages/DeckViewer'

function Main() {

    

    return(
        <Switch>
            <Route exact path = '/'>
                <DeckViewer />
            </Route>
        </Switch>
    )
}

export default Main