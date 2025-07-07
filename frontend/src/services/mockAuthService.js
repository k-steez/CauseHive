// Mock authentication service

export const login = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        email: email,
        name: 'John Doe',
        role: 'user', // Default role
        token: 'mock-token'
      });
    }, 500);
  });
};

export const getCurrentUser = () => {
  return {
    id: 1,
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    token: 'mock-token'
  };
};

export const upgradeToOrganizer = (organizerInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      resolve({
        ...user,
        role: 'organizer',
        ...organizerInfo
      });
    }, 500);
  });
};
