/* eslint-disable no-useless-catch */
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3001';

const token = Cookies.get('_auth');
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjBmOThjZjY5NWE4NmM5ZGMyOTAzOWUiLCJpYXQiOjE3MTI0NjcyOTgsImV4cCI6MTcxMjQ3MDg5OH0.jcs5VqBIqj9il86AlvG33S-bNJig-1hh25XR2FHoB90'
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
