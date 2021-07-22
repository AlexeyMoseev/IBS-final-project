import axios, { AxiosInstance } from 'axios';
import { ApiDirectory } from './directory';
import { ApiItems } from './items';
import { ApiReport } from './report';
// export const API_URL = "http://group08-back.apps.ocp4.trainee.ru.com";
export const API_URL = "http://localhost:3001";

class Api {
	private axios: AxiosInstance;
	items: ApiItems;
	directory: ApiDirectory;
	report: ApiReport;
	constructor(axios: AxiosInstance) {
		this.axios = axios;
		this.items = new ApiItems(axios);
		this.directory = new ApiDirectory(axios);
		this.report = new ApiReport(axios);
	}
}
//главный объект для запросов
let API: Api;
const createAPI = (headers = {}) => {
	API = new Api(
		axios.create({
			baseURL: API_URL,
			headers,
			// headers: {
			//   //  "Authorization": "API_KEY"
			// },
		})
	);
};
createAPI({});

export { API, createAPI };

export enum HTTP_STATUS {
	AppError = 100,
	ServerError = 500,
	Access = 200,
	Error = 400,
	Unauthorized = 401,
	Forbidden = 403,
	BadRequest = 400,
	NotFound = 404,
}
