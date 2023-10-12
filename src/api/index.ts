import type { Entry } from '@/types';

const URL = 'http://localhost:3001/contacts';

export default {
  async createContact(body: Entry) {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  async getContacts() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  async getContact(id: string) {
    try {
      const response = await fetch(`${URL}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  async updateContact(id: string, body: Entry) {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  async deleteContact(id: string) {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};
