import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { dataSource } from './db';
import path from 'node:path';
import { CountryResolver } from './resolvers/country.resolver';

async function bootstrap() {
	// Create TypeORM connection
	await dataSource.initialize();

	// Build TypeGraphQL executable schema
	const schema = await buildSchema({
		// Array of resolvers
		resolvers: [CountryResolver],
		// Create 'schema.graphql' file with schema definition in current directory
		emitSchemaFile: path.resolve(__dirname, 'schema.graphql'),
	});

	// Create mocked context
	// Create GraphQL server
	const server = new ApolloServer({ schema });

	// Start server
	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});
	console.log(`GraphQL server ready at ${url}`);
}

bootstrap().catch(console.error);
