export const storeProfileImage = (photoData: string) => {
  try {
    if (typeof window !== 'undefined' && photoData) {
      localStorage.setItem('profilePhoto', photoData);
      console.log('Photo stored in localStorage');
    }
  } catch (error) {
    console.error('Error storing photo in localStorage:', error);
  }
};
