import { Route, Switch } from 'react-router-dom';
import Index from '../pages/Index';

function Main2() {

    

    return(
        <Switch>
            <Route exact path = '/'>
                <Index />
            </Route>
        </Switch>
    )
}

export default Main2