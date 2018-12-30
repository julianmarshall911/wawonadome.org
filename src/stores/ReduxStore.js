'use es6';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/Reducer';

export const store = createStore(reducers, applyMiddleware(thunk));
