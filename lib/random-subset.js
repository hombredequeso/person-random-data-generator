var _ = require('lodash');


let m = function(){};

let tags = ["abc", "def"];

m.prototype.getNFrom = function(randomizer, list, n) {
    if (n < 0) {
        throw exception("n cannot be less than 0")
    }
    let x = Array(n)
        .fill(0)
        .map(function(a) { return randomizer(list);} );
    return x;
};


m.prototype.getNDistinctFrom = function(randomizer, list, n) {
    let getFrom = function(l, n) {
        if (n < 0) {
            throw exception("n cannot be less than 0")
        }
        if (n === 0) {
            return [];
        } 
        let a = randomizer(l);
        let remainingList = l.filter(x => x !== a)
        return _.concat(getFrom(remainingList, n-1), a);
    }

    let distinctList = _.uniq(list);
    if (n > distinctList.length) {
        throw exception("n cannot be larger than list size")
    } else if (n === list.length) {
        return list;
    }
    return getFrom(list, n);
};

module.exports = new m()
