import { AxiosInstance } from "axios";
import { IChart } from "../models/chart";

interface ISendKeywords {
  saveOptional: null,
  keywords: []
}

interface ISendUserInput {
  userId: number,
  type: null,
  searchType: string | null,
  location: string | null,
  step: number | null,
  minValue: number | null,
  maxValue: number | null,
}

export class ApiItems {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
  //Для вакансий
  sendKeywordsVacancies = (keywords: ISendKeywords) =>
    this.axios.post(`/vacancies/load`, keywords).then((d) => d.data);
  getByUserFiltersVacancies = (userInput: ISendUserInput) =>
    this.axios.post<IChart | string | null >(`/vacancies/read`, userInput).then((d) => d.data);
  //Для резюме
  sendKeywordsResumes = (userId: number) =>
    this.axios.post(`/resumes/load`, {id: userId}).then((d) => d.data);
  getByUserFiltersResumes = (userId: number) =>
    this.axios.post<IChart | string | null >(`/resumes/read`, {id: userId}).then((d) => d.data);
}
