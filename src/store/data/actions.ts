import { DataAction, IDataActionTypes } from "./types";
import { IChart } from "../../models/chart";
import { IUserInput } from "../../models/userInput";

/**
 * Записать ITEM vacancies в store
 * @param itemVacancies
 */
export const data__setItemVacancies = (itemVacancies: IChart | string | null): DataAction => ({
  type: IDataActionTypes.DATA__SET_ITEM_VACANCIES,
  payload: itemVacancies,
});

/**
 * Записать UserInput в store
 * @param userInput
 */
export const data__setUserInput = (userInput: IUserInput | null): DataAction => ({
  type: IDataActionTypes.DATA__SET_USER_INPUT,
  payload: userInput,
});

/**
 * Записать UserId в store
 * @param userId
 */
 export const data__setUserId = (userId: number | null): DataAction => ({
  type: IDataActionTypes.DATA__SET_USER_ID,
  payload: userId,
});

/**
 * Записать регионы в store
 * @param regions
 */
export const data__setAllRegions = (regions: Array<string> | null): DataAction => ({
  type: IDataActionTypes.DATA__SET_ALL_REGIONS,
  payload: regions,
});

/**
 * Записать города в store
 * @param citys
 */
export const data__setAllCitys = (citys: Array<string> | null): DataAction => ({
  type: IDataActionTypes.DATA__SET_ALL_CITYS,
  payload: citys,
});

/**
 * Записать отчет о вакансиях в store
 * @param reportVacancies
 */
 export const data__setReportVacancies = (reportVacancies: string | null): DataAction => ({
  type: IDataActionTypes.DATA__SET_REPORT_VACANCIES,
  payload: reportVacancies,
});

/**
 * Записать отчет о резюме в store
 * @param reportResumes
 */
 export const data__setReportResumes = (reportResumes: string | null): DataAction => ({
  type: IDataActionTypes.DATA__SET_REPORT_RESUMES,
  payload: reportResumes,
});

/**
 * Записать ITEM в store
 * @param itemResumes
 */
 export const data__setItemResumes = (itemResumes: IChart | string | null): DataAction => ({
  type: IDataActionTypes.DATA__SET_ITEM_RESUMES,
  payload: itemResumes,
});