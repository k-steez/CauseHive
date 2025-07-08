export const createEvent = async (eventData) => {
  return { id: 1, ...eventData };
};

export const getEvents = async () => {
  return [
    { id: 1, name: 'Event 1', description: 'Description for Event 1' },
    { id: 2, name: 'Event 2', description: 'Description for Event 2' },
  ];
};

export const getEventById = async (id) => {
  return { id, name: `Event ${id}`, description: `Description for Event ${id}` };
};

export const updateEvent = async (id, eventData) => {
  return { id, ...eventData };
};

export const deleteEvent = async (id) => {
  return { success: true, id };
};
