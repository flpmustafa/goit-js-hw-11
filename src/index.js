import Notiflix from 'notiflix';
const axios = require('axios');

function PixabayAPI() {
    const BASE_URL = 'https://pixabay.com/api/';
    const qParam = {
        key: '33037708-78be3fad6ecee7435e5675b43',
        q: 'cat',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
    }

return fetch(`${BASE_URL}?key=${qParam.key}
                &q=${qParam.q}
                &image_type=${qParam.image_type}
                &orientation=${qParam.orientation}
                &safesearch=${qParam.safesearch}`)
                .then(resp => {
                    console.log(resp);
                    if(!resp.ok) {
                        throw new Error(resp.statusText);
                    }
                    return resp.json();
                });
}

PixabayAPI()

// https://pixabay.com/api/?q=cat&image_type=photo&orientation=horizontal&safesearch =true
