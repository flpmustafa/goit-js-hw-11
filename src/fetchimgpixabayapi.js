import axios from 'axios';

async function fetchImgPixabayAPI(name, page, perPage) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '33037708-78be3fad6ecee7435e5675b43';

    try {
      const resp = await axios.get(
        `${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
      );
      return resp.data;
    } catch (error) {
      console.log('ERROR: ' + error);
  }
}
export { fetchImgPixabayAPI };