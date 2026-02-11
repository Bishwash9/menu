const BASE_URL = '';

export const apiClient = async(endpoint: string, options: RequestInit = {}) =>{
    const token = localStorage.getItem('accessToken');

    const headers = {
        'Content-type' : 'application/json',
        ...(token && { 'Authorization' : `Bearer ${token}`}),
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`,{...options, headers});

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    } 

    return response.json();
}   