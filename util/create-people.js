var faker = require('faker');
var _ = require('lodash');
var fs = require('fs');
var commandLineArgs = require('command-line-args');
 
faker.locale = "en_AU";

const optionDefinitions = [
  { name: 'count', alias: 'c', type: Number, defaultValue: 5 },
  { name: 'pretty', alias: 'p', type: Boolean, defaultValue: false }
];

const option = commandLineArgs(optionDefinitions);

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
}

let produceEntityArray = function(totalCount, generator, serialize, writer, pretty) {
    let entitySeparator = pretty? ',\n' : ',';
    writer(pretty? '[\n': '[')
    let currentCount = 0;
    while (currentCount < totalCount) {
        writer(serialize(generator.next().value, pretty));
        writer(currentCount < totalCount - 1? entitySeparator: '');
        ++currentCount;
    }
    process.stdout.write(pretty? ']\n': ']');
}

let serialize = (x, pretty) => pretty? JSON.stringify(x, null, 2): JSON.stringify(x);
let writer = x => process.stdout.write(x);

produceEntityArray(option.count, personGenerator(), serialize, writer, option.pretty);

