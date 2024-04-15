import * as TypeORM from 'typeorm';

export const dataSource = new TypeORM.DataSource({
	type: 'sqlite',
	synchronize: true,
	dropSchema: false,
	database: './src/data.sqlite',
	entities: ['src/entities/*.ts'],
});
