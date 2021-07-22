import { GetState } from "../index";
import {
  data__setAllCitys, data__setAllRegions, data__setItemVacancies,
  data__setUserInput, data__setUserId, data__setReportVacancies,
  data__setReportResumes, data__setItemResumes
} from "./actions";
import { API } from "../../API";
import { IUserInput } from "../../models/userInput";

/**
 * Получили все данные по введенным полям для вакансий
 */
export const data__getItemByUserFiltersVacancies = (userInput: IUserInput) => async (dispatch: any, getState: GetState) => {
  dispatch(data__setItemVacancies(null))
  dispatch(data__setReportVacancies(null))
  try {
    // Первый запрос: отправляем ключевые слова и опцию сохранения на сервер
    const firstRequest = {
      saveOptional: null,
      keywords: userInput.keywords
    }
    const itemNumber = await API.items.sendKeywordsVacancies(firstRequest)
    dispatch(data__setUserId(!!itemNumber ? itemNumber : null))
    // Второй запрос: отправляем остальные фильтры и получаем ответ
    let item;
    if (itemNumber === "") {
      item = 'noItems'
    } else {
      const secondRequest = {
        userId: itemNumber,
        type: null,
        searchType: userInput.searchType,
        location: userInput.location,
        step: userInput.step,
        minValue: userInput.minValue,
        maxValue: userInput.maxValue,
      }
      item = await API.items.getByUserFiltersVacancies(secondRequest);
    }
    dispatch(data__setItemVacancies(!!item ? item : null))
    /**
    * Получаем отчет о вакансиях в формате CSV
    */
    const reportVacancies = await API.report.getReportVacancies(itemNumber)
    dispatch(data__setReportVacancies(!!reportVacancies ? reportVacancies : null))
  } catch (e) {
    console.error("Ошибка при запросе...", e)
  }
};

/**
 * Занесли введеные пользователем фильтры в store
 */
export const data__UserInput = (userInput: IUserInput) => (dispatch: any, getState: GetState) => {
  dispatch(data__setUserInput(null))
  try {
    dispatch(data__setUserInput(!!userInput ? userInput : null))
  } catch (e) {
    console.error("Ошибка при запросе...", e)
  }
};

/**
 * Получаем все регионы и города
 */
export const data__getAllRegionsAndCityes = () => async (dispatch: any, getState: GetState) => {
  dispatch(data__setAllRegions(null))
  dispatch(data__setAllCitys(null))
  try {
    //Получаем все регионы
    const itemRegions = await API.directory.getAllRegions();
    let regions = itemRegions.map((elem) => {
      return elem.name
    });
    regions.unshift('Все регионы')
    let forDeletion = ['Москва', 'Санкт-Петербург']
    regions = regions.filter(item => !forDeletion.includes(item))
    regions = regions.filter(function (item, pos) {
      return regions.indexOf(item) === pos;
    })
    dispatch(data__setAllRegions(!!regions ? regions : null))
    //Получаем все города
    const itemCitys = await API.directory.getAllCitys();
    let citys = itemCitys.map((elem) => {
      return elem.city
    });
    citys.unshift('Москва', 'Санкт-Петербург')
    citys = citys.filter(function (item, pos) {
      return citys.indexOf(item) === pos;
    })
    dispatch(data__setAllCitys(!!citys ? citys : null))
  } catch (e) {
    console.error("Ошибка при запросе...", e)
  }
};


/**
 * Обнулить item
 */
export const data__nulifyItem = () => (dispatch: any, getState: GetState) => {
  try {
    dispatch(data__setUserInput(null))
    dispatch(data__setItemVacancies(null))
    dispatch(data__setItemResumes(null))
  } catch (e) {
    console.error("Ошибка при запросе...", e)
  }
};

/**
 * Получили все данные по введенным полям для резюме
 */
export const data__getItemByUserFiltersResumes = (userId: number) => async (dispatch: any, getState: GetState) => {
  dispatch(data__setReportResumes(null))
  dispatch(data__setItemResumes(null))
  try {
    await API.items.sendKeywordsResumes(userId)
    const item = await API.items.getByUserFiltersResumes(userId);
    dispatch(data__setItemResumes(!!item ? item : null))
    /**
    * Получаем отчет о резюме в формате CSV
    */
    const reportResumes = await API.report.getReportResumes(userId)
    dispatch(data__setReportResumes(!!reportResumes ? reportResumes : null))
  } catch (e) {
    console.error("Ошибка при запросе...", e)
  }
};

