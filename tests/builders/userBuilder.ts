import { faker } from '@faker-js/faker'
import { User, Gender } from '../models/user'
import { AddressBuilder } from './addressBuilder'

export class UserBuilder {
    private user: User;

    constructor() {
        const gender: Gender = faker.helpers.arrayElement(['male', 'female']);
        const firstName = faker.person.firstName(gender);
        const lastName = faker.person.lastName();
        const phoneNumber = faker.phone.number();

        this.user = {
            gender,
            firstName,
            lastName,
            email: this.buildEmail(firstName, lastName),
            password: faker.internet.password(),
            phoneNumber,
            address: new AddressBuilder().build()
        }
    }

    private buildEmail(firstName: string, lastName: string): string {
        return `${firstName}.${lastName}@test.com`.toLowerCase();
    }

    withGender(gender: Gender): UserBuilder {
        this.user.gender = gender;
        this.user.firstName = faker.person.firstName(gender);
        this.user.email = this.buildEmail(
            this.user.firstName,
            this.user.lastName
        );
        return this;
    }

    withFirstName(firstName: string): UserBuilder {
        this.user.firstName = firstName;
        this.user.email = this.buildEmail(firstName, this.user.lastName);
        return this;
    }

    withLastName(lastName: string): UserBuilder {
        this.user.lastName = lastName;
        this.user.email = this.buildEmail(this.user.firstName, lastName);
        return this;
    }

    withEmail(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    withPassword(password: string): UserBuilder {
        this.user.password = password;
        return this;
    }

    build(): User {
        return this.user;
    }
}