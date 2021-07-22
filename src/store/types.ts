import { AppAction } from "./app/types";
import { DataAction } from "./data/types";

export type IAction = AppAction & DataAction;