import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const key = '39853966-e469fabc3a3d91d6ce6cd4aef';

export const getImages = async (q, page) => {
  const params = {
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    q: q,
    page: page,
  };

  try {
    const response = await axios.get(`${BASE_URL}?key=${key}`, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
};

export default getImages;




