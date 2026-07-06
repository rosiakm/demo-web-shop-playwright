import { faker } from '@faker-js/faker'
import { Address } from '../models/address'

export class AddressBuilder {
    private address: Address;

    constructor(){
        const country = faker.location.country();
        const city = faker.location.city();
        const firstAddress = faker.location.streetAddress();
        const zipCode = faker.location.zipCode();

        this.address = {
            country,
            city,
            firstAddress,
            zipCode
        }
    }

    build(): Address{
        return this.address;
    }
}