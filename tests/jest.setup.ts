import supertest from 'supertest';

import { server } from '../src/server/Server';
import { Knex } from '../src/server/database/knex';

// Antes do teste espere as migrations
beforeAll( async () => {
  await Knex.migrate.latest();
});

// Desconecta do Knex após o migrations
afterAll( async () => {
  await Knex.destroy();
});

export const testServer = supertest(server);