import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	ManyToOne,
	JoinTable,
	ManyToMany,
	UpdateDateColumn,
} from 'typeorm';
import { Length, Min } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Country {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ length: 2 })
	@Length(2, 2, { message: 'Le Code doit contenir exactement 2 caractères' })
	code: string;

	@Field()
	@Column({ type: 'text' })
	nom: string;

	@Field()
	@Column({ length: 2 })
	@Length(2, 2, { message: "L'emoji  doit contenir exactement 2 caractères" })
	emoji: string;

	@Field()
	@Column({ length: 2 })
	@Length(2, 2, {
		message: 'Le code_continent doit contenir exactement 2 caractères',
	})
	code_continent: string;
}

@InputType()
export class CountryInput {
	@Field()
	code: string;

	@Field()
	nom: string;

	@Field()
	emoji: string;

	@Field()
	code_continent: string;
}

@InputType()
export class CountryContinentFindInput {
	@Field()
	code_continent: string;
}
