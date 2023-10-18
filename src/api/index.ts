import type { Entry } from '@/types';

const URL = 'http://localhost:3001/contacts';

export default {
  async createContact(body: Entry): Promise<Entry | {}> {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data: Entry = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }

      return {};
    }
  },

  async fetchContact(id: string): Promise<Entry | {}> {
    try {
      const response = await fetch(`${URL}/${id}`);
      const data: Entry = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }

      return {};
    }
  },

  async fetchContacts(): Promise<Entry[]> {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }

      return [];
    }
  },

  async updateContact(id: string, body: Entry): Promise<Entry | {}> {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data: Entry = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }

      return {};
    }
  },

  async deleteContact(id: string) {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }

      return {};
    }
  },
};
