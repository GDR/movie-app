import {StubState} from "./types";

const initialState: StubState = {
    value: null
}

function reducer(state: StubState = initialState) {
    return state;
}

export default reducer;