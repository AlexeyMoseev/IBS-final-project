import { IChart } from "../../models/chart";
import { IUserInput } from "../../models/userInput";

export enum IDataActionTypes {
  DATA__SET_ITEM_VACANCIES = "[DATA] SET_ITEM_VACANCIES",
  DATA__SET_USER_INPUT = "[DATA] SET_USER_INPUT",
  DATA__SET_USER_ID = "[DATA] SET_USER_ID",
  DATA__SET_ALL_REGIONS = "[DATA] SET_ALL_REGIONS",
  DATA__SET_ALL_CITYS = "[DATA] SET_ALL_CITYS",
  DATA__SET_REPORT_VACANCIES = "[DATA] SET_REPORT_VACANCIES",
  DATA__SET_REPORT_RESUMES = "[DATA] SET_REPORT_RESUMES",
  DATA__SET_ITEM_RESUMES = "[DATA] SET_ITEM_RESUMES",
}

// Типы ActionCreators
interface SetItemVacancies {
  type: IDataActionTypes.DATA__SET_ITEM_VACANCIES;
  payload: IChart | string | null;
}
interface SetUserInput {
  type: IDataActionTypes.DATA__SET_USER_INPUT;
  payload: IUserInput | null;
}
interface SetUserId {
  type: IDataActionTypes.DATA__SET_USER_ID;
  payload: number | null;
}
interface SetAllRegions {
  type: IDataActionTypes.DATA__SET_ALL_REGIONS;
  payload: Array<string> | null;
}
interface SetAllCitys {
  type: IDataActionTypes.DATA__SET_ALL_CITYS;
  payload: Array<string> | null;
}
interface SetReportVacancies {
  type: IDataActionTypes.DATA__SET_REPORT_VACANCIES;
  payload: string | null;
}
interface SetReportResumes {
  type: IDataActionTypes.DATA__SET_REPORT_RESUMES;
  payload: string | null;
}
interface SetItemResumes {
  type: IDataActionTypes.DATA__SET_ITEM_RESUMES;
  payload: IChart | string | null;
}

// Общий тип Action
export type DataAction =
  | SetItemVacancies
  | SetUserInput
  | SetUserId
  | SetAllRegions
  | SetAllCitys
  | SetReportVacancies
  | SetReportResumes
  | SetItemResumes