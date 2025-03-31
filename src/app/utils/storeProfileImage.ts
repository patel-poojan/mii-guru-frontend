export const storeProfileImage = (photoData: string) => {
  try {
    if (typeof window !== 'undefined' && photoData) {
      localStorage.setItem('profilePhoto', photoData);
    }
  } catch (error) {
    console.error('Error storing photo in localStorage:', error);
  }
};
