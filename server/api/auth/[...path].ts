interface FetchOptions {
	method: string;
	headers: { [key: string]: string };
	body?: string;
}

export default defineEventHandler(async (event) => {
	if (!process.env.NUXT_API_BASE_URL) throw new Error('NUXT_API_BASE_URL is not set');
	
	const baseUrl = process.env.NUXT_API_BASE_URL;
	const path = event.context.params!.path;
  const apiUrl = `${baseUrl}/auth/${path}`;
	
	const fetchOptions: FetchOptions = {
		method: String(event.method),
		headers: {
			'Authorization': event.headers.get('Authorization') ?? '',
		},
	};

	if (event.method !== 'GET') {
		fetchOptions.headers['Content-Type'] = 'application/json';
		fetchOptions.body = JSON.stringify(await readBody(event));
	}

	try {
		const response = await fetch(apiUrl, fetchOptions);
		return response;
	} catch (error) {
		console.error('error', error);
	}
});