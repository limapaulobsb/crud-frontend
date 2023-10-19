import { rest } from 'msw';

import api from '@/api';
import { server } from '@/mocks/server';

const URL = 'http://localhost:3001/contacts';

describe('createContact function', () => {
  const body = {
    name: 'Paulo',
    email: 'limapaulobsb@gmail.com',
    phoneNumber: '+55 61 993597997',
  };

  it('should return the posted contact', async () => {
    const data = await api.createContact(body);
    expect(data).toHaveProperty('id');
  });

  it('should return an empty object with an error', async () => {
    server.use(
      rest.post(URL, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    const data = await api.createContact(body);
    expect(data).toEqual({});
  });
});

describe('fetchContact function', () => {
  it('should return the correct contact', async () => {
    const data = await api.fetchContact('6a5caa8c-f6d6-42e9-b7d9-14869b0f5526');

    expect(data).toEqual({
      id: '6a5caa8c-f6d6-42e9-b7d9-14869b0f5526',
      email: 'joao@gmail.com',
      name: 'João',
      phoneNumber: '+55 99 99999999',
    });
  });

  it('should return an empty object with an error', async () => {
    server.use(
      rest.get(`${URL}/:id`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    const data = await api.fetchContact('1');
    expect(data).toEqual({});
  });
});

describe('fetchContacts function', () => {
  it('should return the correct number of contact items', async () => {
    const data = await api.fetchContacts();
    expect(data).toHaveLength(6);
  });

  it('should return an empty array with an error', async () => {
    server.use(
      rest.get(URL, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    const data = await api.fetchContacts();
    expect(data).toHaveLength(0);
  });
});

describe('updateContact function', () => {
  const body = {
    name: 'Paulo',
    email: 'limapaulobsb@gmail.com',
    phoneNumber: '+55 61 993597997',
  };

  it('should return the updated contact', async () => {
    const data = await api.updateContact('1', body);
    expect(data).toEqual({ ...body, id: 1 });
  });

  it('should return an empty object with an error', async () => {
    server.use(
      rest.put(`${URL}/:id`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    const data = await api.updateContact('1', body);
    expect(data).toEqual({});
  });
});

describe('deleteContact function', () => {
  it('should return a success message', async () => {
    const data = await api.deleteContact('1');
    expect(data.message).toBe('Contato removido com sucesso.');
  });

  it('should return an empty object with an error', async () => {
    server.use(
      rest.delete(`${URL}/:id`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    const data = await api.deleteContact('1');
    expect(data).toEqual({});
  });
});
