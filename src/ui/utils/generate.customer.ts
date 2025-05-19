import { CustomerBody } from "../types/createcustomer.type";
import { COUNTRIES } from "../data/Salesportal.countries.enum";
import { faker } from "@faker-js/faker";

export function generateCustomerBody(
  params?: Partial<CustomerBody>
): CustomerBody {
  return {
    email: `${Date.now()}${faker.internet.email({ firstName: 'Aleksey', lastName: 'Naumov' })}`,
    name: `Aleks ${faker.string.alpha(11)}`,
    country: COUNTRIES.CANADA,
    city: `Test town Colorado`,
    street: `${faker.location.streetAddress()}`,
    house: faker.number.int({ min: 1, max: 10 }),
    flat: faker.number.int({ min: 1, max: 3 }),
    phone: `${faker.phone.number({ style: 'international' })}`,
    notes: `Test ${faker.lorem.sentence()}`,
  };
}
