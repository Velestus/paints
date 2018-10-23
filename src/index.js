import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import 'styles/styles.scss';

import { rootReducer } from 'modules/root/reducer';
import { getRoutes } from 'modules/root/routing';

const history = createBrowserHistory();
const reduxRouterMiddleware = routerMiddleware(history);
const enhancer = composeWithDevTools({ maxAge: 25 });
const store = createStore(
	rootReducer,
	{},
	enhancer(applyMiddleware(thunk, reduxRouterMiddleware))
);

const routes = getRoutes(store);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>{routes}</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
