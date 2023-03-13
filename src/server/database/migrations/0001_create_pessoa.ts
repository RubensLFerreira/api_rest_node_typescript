import { Knex } from 'knex';
import { ETableNames } from '../ETableName';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.pessoa, table => {
      table.bigIncrements('id').primary().index(),
      table.string('nome', 150).checkLength('<=', 150).index().notNullable();
      table.string('sobrenome', 150).checkLength('<=', 150).index().notNullable();
      table.string('email', 150).checkLength('<=', 150).unique().notNullable();

      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para armazenar pessoas do sistema');
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.pessoa)
    .then(() => {
      console.log(`# Drop table ${ETableNames.pessoa}`);
    });
}