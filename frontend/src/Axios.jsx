/* eslint-disable no-useless-catch */
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// Function to make a GET request
export const getRequest = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a POST request
export const postRequest = async (endpoint, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a PT request
export const putRequest = async (endpoint, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

