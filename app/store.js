import { createStore } from "redux";
import blockchainReducer from "./containers/Main/reducer";

const store = createStore(blockchainReducer);

export default store;
