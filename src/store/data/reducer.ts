import { IChart } from "../../models/chart";
import { IUserInput } from "../../models/userInput";
import { DataAction, IDataActionTypes } from "./types";

const initialState = {
  userInput: null as IUserInput | null,
  itemVacancies: null as IChart | string | null,
  userId: null as number | null,
  regions: null as Array<string> | null,
  citys: null as Array<string> | null,
  reportVacancies: null as string | null,
  reportResumes: null as string | null,
  itemResumes: null as IChart | string | null,
};
type IDataState = typeof initialState;

export const dataReducer = (
  state = initialState,
  action: DataAction
): IDataState => {
  switch (action.type) {
    case IDataActionTypes.DATA__SET_ITEM_VACANCIES:
      return { ...state, itemVacancies: action.payload };
    case IDataActionTypes.DATA__SET_USER_INPUT:
      return { ...state, userInput: action.payload };
    case IDataActionTypes.DATA__SET_USER_ID:
      return { ...state, userId: action.payload };
    case IDataActionTypes.DATA__SET_ALL_REGIONS:
      return { ...state, regions: action.payload };
    case IDataActionTypes.DATA__SET_ALL_CITYS:
      return { ...state, citys: action.payload };
    case IDataActionTypes.DATA__SET_REPORT_VACANCIES:
      return { ...state, reportVacancies: action.payload };
    case IDataActionTypes.DATA__SET_REPORT_RESUMES:
      return { ...state, reportResumes: action.payload };
    case IDataActionTypes.DATA__SET_ITEM_RESUMES:
      return { ...state, itemResumes: action.payload };
    default:
      return state;
  }
};
