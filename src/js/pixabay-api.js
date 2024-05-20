const API_KEY = '43933435-35fbbd09623d667ed19d4c9fb'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPhotos(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data;
}
