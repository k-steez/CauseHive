// Mock data for frontend development
const mockPhotos = [
  {
    id: 1,
    title: 'Community Garden',
    description: 'Volunteers planting vegetables in the community garden',
    imageUrl: 'https://picsum.photos/id/1018/600/400',
    likes: 24,
    tags: ['environment', 'community'],
  },
  {
    id: 2,
    title: 'Beach Cleanup',
    description: 'Cleaning up plastic waste on the local beach',
    imageUrl: 'https://picsum.photos/id/1031/600/400',
    likes: 42,
    tags: ['environment', 'ocean'],
  },
  {
    id: 3,
    title: 'Food Drive',
    description: 'Organizing donations at the annual food drive',
    imageUrl: 'https://picsum.photos/id/1039/600/400',
    likes: 18,
    tags: ['hunger', 'community'],
  },
  {
    id: 4,
    title: 'Animal Shelter',
    description: 'Caring for rescued animals at the shelter',
    imageUrl: 'https://picsum.photos/id/1062/600/400',
    likes: 31,
    tags: ['animals', 'welfare'],
  },
];

// Mock comments data
const mockComments = [
  { id: 1, photoId: 1, userId: 2, text: 'This is an amazing photo!', createdAt: '2025-01-15' },
  { id: 2, photoId: 1, userId: 3, text: 'Love the colors!', createdAt: '2025-01-16' },
];

export const getPhotos = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPhotos), 500); // Simulate network delay
  });
};

export const likePhoto = (photoId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const photo = mockPhotos.find(p => p.id === photoId);
      if (photo) {
        photo.likes += 1;
      }
      resolve();
    }, 300);
  });
};

export const getPhotoById = async (id) => {
  console.log(`getPhotoById called with id: ${id}`);
  const numId = Number(id);
  return new Promise((resolve) => {
    setTimeout(() => {
      const photo = mockPhotos.find(p => p.id === numId);
      resolve(photo || null);
    }, 500);
  });
};

export const getComments = (photoId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comments = mockComments.filter(c => c.photoId === photoId);
      resolve(comments);
    }, 500);
  });
};

export const searchPhotos = async (query = '', tag = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockPhotos.filter(photo => {
        const matchesQuery = 
          !query || 
          photo.title.toLowerCase().includes(query.toLowerCase()) || 
          photo.description.toLowerCase().includes(query.toLowerCase());
        
        const matchesTag = !tag || photo.tags.includes(tag);
        
        return matchesQuery && matchesTag;
      });
      
      resolve(filtered);
    }, 500);
  });
};

export const getPhotosByUser = (userId) => {
  return new Promise((resolve) => {
    // Filter photos by userId
    const userPhotos = mockPhotos.filter(photo => photo.userId === userId);
    resolve(userPhotos);
  });
};
