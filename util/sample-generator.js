var faker = require('faker');

faker.locale = "en_AU";

function* personGenerator() {
    while (true) {
        yield {
            "name": faker.name.findName(),
            "username": faker.internet.userName(),
            "email": faker.internet.email(),
            "address": {
                "street": faker.address.streetName(true),
                "suite": faker.address.secondaryAddress(),
                "city": faker.address.city(),
                "zipcode": faker.address.zipCode(),
                "geo": {
                    "lat": faker.address.latitude(),
                    "lon": faker.address.longitude()
                }
            },
            "phone": faker.phone.phoneNumber(),
            "website": faker.internet.domainName(),
            "company": {
                "name": faker.company.companyName(),
                "catchPhrase": faker.company.catchPhrase(),
                "bs": faker.company.bs()
            }
        };
    }
};

module.exports = personGenerator;
