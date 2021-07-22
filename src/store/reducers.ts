import { combineReducers } from "redux";
import { appReducer } from "./app/reducer";
import {dataReducer} from "./data/reducer";

export enum StoreSection {
  app = "app",
  data = "data",
}

export const rootReducer = combineReducers({
  [StoreSection.app]: appReducer,
  [StoreSection.data]: dataReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
