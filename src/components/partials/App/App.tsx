import React, {FunctionComponent} from "react";
import configureStore from "../../../../store/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

const { store, persistor } = configureStore();

export const App: FunctionComponent = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div>
                    React app
                </div>
            </PersistGate>
        </Provider>
    )
}