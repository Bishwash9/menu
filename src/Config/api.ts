
export const BASE_URL = import.meta.env.VITE_API_URL ;

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('accessToken');

    const headers: Record<string, string> = {
        'Content-type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...((options.headers as Record<string, string>) || {}),
    };

    try {
        const fullUrl = `${BASE_URL}${endpoint}`;
        console.log('🌐 Fetching:', fullUrl);

        const response = await fetch(fullUrl, { ...options, headers });

        //Handle 401 error specifically
        if (response.status === 401) {
          if (endpoint.includes('login')) {
            const errorData = await response.json().catch(() => ({}));
            throw { status: 401, message: errorData.message || 'Invalid credentials.' };
          }
            localStorage.removeItem('accessToken');
            console.error('Session expired. Please log in again.');
            window.location.href = '/';
            return;
       }

        

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: error.message || 'API request failed. Please try again.',
            };
        }

        return response.json();

    } catch (error: any) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}


//api.thefoodhubcafe.com.np/api/login 
