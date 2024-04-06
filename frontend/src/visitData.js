import { getRequest } from './Axios.js'

async function fetchData() {
    try {
      const data = await getRequest('roc/');
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();