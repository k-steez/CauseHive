export const uploadPhoto = async (photoData) => {
  return { id: 1, ...photoData };
};

export const getPhotos = async () => {
  return [
    { id: 1, title: 'Photo 1', url: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Photo 2', url: 'https://via.placeholder.com/150' },
  ];
};

export const getPhotoById = async (id) => {
  return { id, title: `Photo ${id}`, url: 'https://via.placeholder.com/150' };
};

export const getPhotosByUser = async () => {
  return [
    { id: 1, title: 'User Photo 1', url: 'https://via.placeholder.com/150' },
    { id: 2, title: 'User Photo 2', url: 'https://via.placeholder.com/150' },
  ];
};

export const searchPhotos = async (query) => {
  return [
    { id: 1, title: `Search Result for ${query}`, url: 'https://via.placeholder.com/150' },
  ];
};
