import 'babel-polyfill';
import 'focus-components/style';
import 'focus-graph/src/style/field.scss';
import 'focus-application/style';

import i18next from 'i18next';
//------------------------------
// INIT FOCUS TRANSLATION
import {intializeTranslation} from 'focus-application/translation';
import componentsFr from 'focus-components/translation/resources/fr-FR';
intializeTranslation(i18next, 'fr-FR', [componentsFr]);
//------------------------------

import React , {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {createStore} from 'redux';
import Root from './root';
import reducer from './reducer'
import configureStore from './store';
import {initFetch} from './services/fetch';
const store = configureStore();
initFetch(store.dispatch);

const renderApp = RootComponent => {
    console.info('App rendered')
    ReactDOM.render(
        <AppContainer>
            <RootComponent store={store} />
        </AppContainer>,
        document.querySelector('.focus-graph-demo-app')
    );
}

renderApp(Root);

if (module.hot) {

    //   module.hot.decline('./routes.js');
    module.hot.accept('./root', () => {
        console.log('Root change')

        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextRoot = require('./root');
        renderApp(NextRoot);
    });
}
