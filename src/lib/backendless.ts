import Backendless from 'backendless';

const APP_ID = 'FB4BB267-9A58-4CD2-9BBE-BDCC367DDBFE';
const API_KEY = '5998616D-5E24-4404-BFAC-7FFBB1C94F4C';

export interface ProductRecord {
	objectId?: string;
	name: string;
	price: number;
	imageurl: string;
	description?: string;
}

export interface TestimonyRecord {
	objectId?: string;
	reviewer: string;
	rating: number;
	comment: string;
	productObjectId: string;
	created?: string;
}

export interface BlogPostRecord {
	objectId?: string;
	title: string;
	author: string;
	content: string;
	published?: string;
}

export const ensureCompanyBackendless = () => {
	Backendless.initApp(APP_ID, API_KEY);
	return Backendless;
};

ensureCompanyBackendless();

export const ProductStore = Backendless.Data.of('Products');
export const TestimonyStore = Backendless.Data.of('Testimonies');
export const BlogStore = Backendless.Data.of('Blog');

export default Backendless;