export enum IAppActionTypes {
  APP__INIT_APP = "[APP] INIT_APP",
}

// Типы ActionCreators

interface SetInitAppAction {
  type: IAppActionTypes.APP__INIT_APP;
  payload: boolean;
}

// Общий тип Action
export type AppAction =
  | SetInitAppAction;
