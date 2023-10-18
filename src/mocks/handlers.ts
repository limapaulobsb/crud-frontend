import { rest } from 'msw';
import { contacts } from '../../db.json' assert { type: 'json' };

const URL = 'http://localhost:3001/contacts';

export const handlers = [
  rest.post(`${URL}`, async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ ...body, id: 5 }));
  }),

  rest.get(`${URL}/:id`, (req, res, ctx) => {
    const id = Number(req.params.id);
    return res(ctx.status(200), ctx.json(contacts.find((e) => e.id === id)));
  }),

  rest.get(`${URL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(contacts));
  }),

  rest.put(`${URL}/:id`, async (req, res, ctx) => {
    const body = await req.json();
    const id = Number(req.params.id);
    return res(ctx.status(200), ctx.json({ ...body, id }));
  }),

  rest.delete(`${URL}/:id`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Contato removido com sucesso.' }));
  }),
];
