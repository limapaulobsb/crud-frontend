import { rest } from 'msw';

const URL = 'http://localhost:3001/contacts';

import mockContacts from './mockContacts';

export const handlers = [
  rest.post(URL, async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ ...body, id: 'jB1qshu' }));
  }),

  rest.get(`${URL}/:id`, (req, res, ctx) => {
    const id = req.params.id;

    return res(
      ctx.status(200),
      ctx.json(mockContacts.find((contact) => contact.id === id))
    );
  }),

  rest.get(URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockContacts));
  }),

  rest.put(`${URL}/:id`, async (req, res, ctx) => {
    const body = await req.json();
    const { id } = req.params;
    return res(ctx.status(200), ctx.json({ ...body, id }));
  }),

  rest.delete(`${URL}/:id`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Contato removido com sucesso.' }));
  }),
];
