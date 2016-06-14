import React, {PropTypes} from 'react';
import {IndexRoute, Router, Route} from 'react-router';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as MetadataProvider} from 'focus-redux/behaviours/metadata';
import * as definitions from './config/entity-definitions';
import * as domains from './config/domains';
/* Components */
import App from './app';
import Home from './views/home';
import User from './views/user';


const Root = ({store, history}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
<StoreProvider store={store}>
  <MetadataProvider definitions={definitions} domains={domains}>
    <Router history={history}>
      {/* On injecte comme composant d'application un composant connecté au store redux */}
        {/* Le composant IndexRoute signifie qui sera appellée par défaut*/}
        <Route path='/' component={App} >
        <IndexRoute component={Home}/>
        {/* Les :id sert à fournir un para  sssssssmètre à l'url on extrait les paramètres d'url via la props params*/}
        <Route path='user/:id' component={({params}) => <User id={params.id}/>} />
      </Route>
    </Router>
  </MetadataProvider>
</StoreProvider>;

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
