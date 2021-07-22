import { GetState } from "../index";
import { IAppActionTypes } from "./types";

/**
 * Инициализвация приложения
 */
export const app__initApp = () => (dispatch: any, getState: GetState) => {
  dispatch({ type: IAppActionTypes.APP__INIT_APP, payload: true });
};
