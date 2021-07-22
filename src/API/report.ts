import { AxiosInstance } from 'axios';

export class ApiReport {
	private axios: AxiosInstance;

	constructor(axios: AxiosInstance) {
		this.axios = axios;
	}

	getReportVacancies = (userId: number) =>
		this.axios.get<string>(`/vacancies/download`, { params: { id: userId } }).then((d) => d.data);
	getReportResumes = (userId: number) =>
		this.axios.get<string>(`/resumes/download`, { params: { id: userId } }).then((d) => d.data);
}
