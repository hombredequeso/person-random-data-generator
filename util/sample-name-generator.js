var faker = require('faker');

faker.locale = "en_AU";

function* personGenerator() {
    while (true) {
        yield {
            "firstname": faker.name.firstName(),
            "lastname": faker.name.lastName()
        };
    }
};

module.exports = personGenerator;
