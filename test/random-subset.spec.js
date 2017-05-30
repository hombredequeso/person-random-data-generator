var faker = require('faker');
var randomSubset = require('../lib/random-subset');
var chai = require('chai');
var _ = require('lodash');

var jsc = require("jsverify");

describe('jsverify', function() {
    jsc.property("idempotent", "array nat", function (arr) {
        return _.isEqual(arr.sort().sort(), arr.sort());
    });

    jsc.property("idempotent2", "array nat", function (arr) {
        return _.isEqual(arr.sort().sort(), arr.sort());
    });

    jsc.property("returns requested count", "array nat", "nat", function(arr, n) {
        let result = randomSubset.getNFrom(
            faker.random.arrayElement, 
            arr, 
            n);
        return result.length == n;
    });

    jsc.property("returns sub-set of input", "nearray nat", "nat", function(arr, n) {
        let result = randomSubset.getNFrom(
            faker.random.arrayElement, 
            arr, 
            n);

        return result
            .filter(r => arr.findIndex(i => i === r))
            .every(i => i >= 0);
    });
});

var expect = chai.expect;
faker.locale = "en_AU";

describe('random-subset', function() {
    describe('getNFrom', function() {
        it('should return the requested number of tags', function() {
            let tags = ["abc", "def", "mno", "xyz"];
            let tagCount = 2;

            let result = randomSubset.getNFrom(
                faker.random.arrayElement, 
                tags, 
                tagCount);

            expect(result.length).to.equal(tagCount);
            expect(tags).to.include.members(result);
        });
    });

    describe('getNDistinctFrom', function() {
        it('should return all elements from a list when n is list length', function() {
            let tags = ["abc", "def", "ghi", "mno", "xyz"];
            let tagCount = tags.length; // maximize odds of getting same one
            let result = randomSubset.getNDistinctFrom(
                faker.random.arrayElement, 
                tags, 
                tagCount);

            expect(result.length).to.equal(tagCount);
            expect(result).to.eql(_.uniq(result));
        });

        it('should return n distinct elements from a list', function() {
            let tags = ["abc", "def", "ghi", "mno", "xyz"];
            let tagCount = 3;
            let result = randomSubset.getNDistinctFrom(
                faker.random.arrayElement, 
                tags, 
                tagCount);

            expect(result.length).to.equal(tagCount);
            expect(result).to.eql(_.uniq(result));
        });
    });
});
