import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const middleware = [thunk];
const storageState = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

const store = createStore(rootReducer,storageState,compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : ''
    )
);
store.subscribe( () => {
    localStorage.setItem('orders', JSON.stringify(store.getState()))
});
export default store;