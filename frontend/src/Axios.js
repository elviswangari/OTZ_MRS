/* eslint-disable no-useless-catch */
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3001';

const token = Cookies.get('_auth');
// const token = ''
// const role = Cookies.get('_auth_state');

const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}

// Function to make a GET request with headers
export const getRequest = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a GET request without headers
export const getRequestNoHeader = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a POST request with headers
export const postRequest = async (endpoint, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, data, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a POST request without headers
export const postRequestNoHeader = async (endpoint, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a PUT request with headers
export const putRequest = async (endpoint, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${endpoint}`, data, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}
