// store.js
import { createStore, combineReducers } from 'redux';
import clientAuthReducer from './reducers/client_auth_reducer';
import modalReducer from './reducers/modal_reducer';
import loader_reducer from './reducers/loader_reducer';

const rootReducer = combineReducers({
  auth: clientAuthReducer,
  modal: modalReducer,
  loader: loader_reducer
  // Add more reducers as needed
});

const store = createStore(rootReducer);

export default store;
