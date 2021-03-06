import { Knex } from 'knex';

const TABLE_NAME = 'episodes';
const COLUMN_NAME = 'status';

const EpisodeStatus = {
  PUBLISHED: 'published',
  STAGING: 'staging',
} as const;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .enum(COLUMN_NAME, [EpisodeStatus.PUBLISHED, EpisodeStatus.STAGING])
      .defaultTo(EpisodeStatus.PUBLISHED);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

