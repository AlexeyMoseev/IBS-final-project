import { AxiosInstance } from 'axios';

interface IDirectoryCitys {
	city: string,
	type: string
}

interface IDirectoryRegions {
	name: string,
	type: string
}

export class ApiDirectory {
	private axios: AxiosInstance;

	constructor(axios: AxiosInstance) {
		this.axios = axios;
	}

	getAllCitys = () =>
		this.axios.get<IDirectoryCitys[]>(`/area/cities`).then((d) => d.data);
	getAllRegions = () =>
		this.axios.get<IDirectoryRegions[]>(`/area/region`).then((d) => d.data);
}
