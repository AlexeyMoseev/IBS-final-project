import { AppAction, IAppActionTypes } from "./types";

const initialState = {
  initApp: false,
};
type IAppState = typeof initialState;

export const appReducer = (
  state = initialState,
  action: AppAction
): IAppState => {
  switch (action.type) {
    case IAppActionTypes.APP__INIT_APP:
      return { ...state, initApp: action.payload };
    default:
      return state;
  }
};
