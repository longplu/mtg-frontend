import { Route, Switch } from 'react-router-dom';
import DeckViewer from '../pages/DeckViewer'
import Search from '../pages/Search';

function Main() {
    return(
        <Switch>
            <Route exact path = '/'>
                <DeckViewer />
                <Search />
            </Route>
        </Switch>
    )
}

export default Main