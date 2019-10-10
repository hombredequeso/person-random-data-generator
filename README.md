# Random Person Data Generator

This project generates random person data.
Beyond the generate of basic person details, for which it primarily relies on [faker.js](https://github.com/marak/Faker.js/), it adds the ability to produce semi-realistic geo-coordinate data.


## Getting Started

### Prerequisites

* nodejs/npm


### Installing

After getting the source code:

```
npm install
```

### Generating Random Person Data

Examples of generating random person data:
```
cd util
node create-people.js
node create-people.js --generator ./sample-generator-2.js --pretty
node create-people.js --generator ./sample-name-generator.js --format ndjson
```

The main options are:

--count *count*             Specify the number of people
--pretty                    Produce pretty json
--generator *generator*     Specify the person generator, in a form that can be required. This should be a parameterless, infinite, generator function.
--format *output-format*    Specify the output format. Either: json/ndjson. Default is json, which will be a json array of objects.

## Running the tests

To run the tests:
```
npm test
```

To continuously run the tests, running when files change:
```
npm run watch
```

## Author

* **Mark Cheeseman** -  - [homdredequeso](https://github.com/hombredequeso)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

