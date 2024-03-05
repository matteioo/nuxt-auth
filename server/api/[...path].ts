interface FetchOptions {
  method: string;
  headers: { [key: string]: string };
  body?: string;
}

export default defineEventHandler(async (event) => {  
  if (!process.env.NUXT_API_BASE_URL) throw new Error('NUXT_API_BASE_URL is not set');

  const baseUrl = process.env.NUXT_API_BASE_URL;
  const path = getRequestURL(event).pathname.replace('/api/', '/');
  const requestParams = getRequestURL(event).search ?? '';
  const apiUrl = `${baseUrl}${path}${requestParams}`;

  const fetchOptions: FetchOptions = {
    method: String(event.method),
    headers: {
      'Authorization': event.headers.get('Authorization') ?? '',
    },
  };
  
  if (event.method !== 'GET') {
    fetchOptions.headers['Content-Type'] = getRequestHeader(event, 'content-type') ?? 'application/json';
    fetchOptions.body = JSON.stringify(await readBody(event));
  }

  const foo = getRequestHeader(event, 'cookie');
  if (foo) {
    fetchOptions.headers['Cookie'] = foo;
  }

  try {
    const response = await fetch(apiUrl, fetchOptions);
    return response;
  } catch (error) {
    console.error('error', error);
  }
});