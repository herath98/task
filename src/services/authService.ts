interface LoginResponse {
  status: boolean;
  code: string;
  message: string;
  data: {
    accessToken: string;
    role: number;
    userId: number;
  };
}

// In authService.ts, ensure login function is correct
export const login = async (email: string, password: string): Promise<LoginResponse['data']> => {
  const response = await fetch('https://skill-test.similater.website/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data: LoginResponse = await response.json();
  if (!data.status) {
    throw new Error(data.message);
  }

  return data.data;
};


// Retrieve token correctly
export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};


// Verify token function
export const verifyToken = async (token: string): Promise<boolean | null> => {
  try {
    const response = await fetch('https://skill-test.similater.website/api/v1/user/check', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.error('Token verification endpoint not found');
        // Return a specific error code or message
        return null;
      } else {
        console.error('Token verification failed with status code', response.status);
        return false;
      }
    }

    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error('Verification error:', error);
    // If the token is invalid, remove it from localStorage
    localStorage.removeItem('accessToken');
    return false;
  }
};