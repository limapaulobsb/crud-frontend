const URL = 'http://localhost:3001/contacts';

export default {
  async getContacts() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};
