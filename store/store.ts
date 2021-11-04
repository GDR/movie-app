import {applyMiddleware, combineReducers, compose, createStore, Middleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {IS_DEV} from "../utils/env";
import rootSaga from "./saga";
import stubReducer from "./stub/reducer";
import {sagaMiddleware} from "./middlewares";

const rootReducers = combineReducers({
    stubReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const middlewares: Middleware[] = [sagaMiddleware];

export default function configureStore(initialState = {}) {
    const enhancer = (IS_DEV ? composeWithDevTools : compose) as typeof compose;
    const composeMiddlewares = enhancer(applyMiddleware(...middlewares));
    const store = createStore(persistedReducer, initialState, composeMiddlewares);

    sagaMiddleware.run(rootSaga);

    const persistor = persistStore(store);

    return { store, persistor };
}