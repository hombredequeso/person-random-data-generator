var fs = require('fs');
var commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'count', alias: 'c', type: Number, defaultValue: 5 },
  { name: 'pretty', alias: 'p', type: Boolean, defaultValue: false },
  { name: 'generator', alias: 'g', type: String, defaultValue: './sample-generator.js', defaultOption: true },
  { name: 'format', alias: 'f', type: String, defaultValue: 'json'},
];

const option = commandLineArgs(optionDefinitions);

const generatorX = require(option.generator);

let produceEntityArray = function(totalCount, generator, serialize, writer, pretty) {
    let entitySeparator = pretty? ',\n' : ',';
    writer(pretty? '[\n': '[')
    let currentCount = 0;
    while (currentCount < totalCount) {
        writer(serialize(generator.next().value, pretty));
        writer(currentCount < totalCount - 1? entitySeparator: '');
        ++currentCount;
    }
    writer(pretty? ']\n': ']');
}


let produceNdJson = function(totalCount, generator, serialize, writer, pretty) {
    let currentCount = 0;
    while (currentCount < totalCount) {
        writer(serialize(generator.next().value, false));
        writer('\n');
        ++currentCount;
    }
}

let serialize = (x, pretty) => pretty? JSON.stringify(x, null, 2): JSON.stringify(x);
let writer = x => process.stdout.write(x);

if (option.format == 'json') {
    produceEntityArray(option.count, generatorX(), serialize, writer, option.pretty);
}
if (option.format == 'ndjson') {
    produceNdJson(option.count, generatorX(), serialize, writer, option.pretty);
}
