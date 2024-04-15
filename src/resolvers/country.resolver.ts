import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql';
import { dataSource } from '../db';
import { Repository } from 'typeorm';
import {
	Country,
	CountryContinentFindInput,
	CountryInput,
} from '../entities/country.entity';

@Resolver(() => Country)
export class CountryResolver {
	private readonly repository: Repository<Country>;
	constructor() {
		this.repository = dataSource.getRepository(Country);
	}
	// @Query((_returns) => Ad, { nullable: true })
	// recipe(@Arg('recipeId', (_type) => String) recipeId: string) {
	// 	return this.repository.findOneBy({ id: recipeId });
	// }

	@Query((_returns) => [Country])
	countries(): Promise<Country[]> {
		return this.repository.find();
	}

	@Query((_returns) => [Country])
	countriesByContinent(
		@Arg('countryContinentCode') countryInput: CountryContinentFindInput
	): Promise<Country[]> {
		return this.repository.findBy({
			code_continent: countryInput.code_continent,
		});
	}

	@Mutation((_return) => Country)
	async addCountry(
		@Arg('country') countryInput: CountryInput
	): Promise<Country> {
		const country = this.repository.create(countryInput);

		return await this.repository.save(country);
	}
}
