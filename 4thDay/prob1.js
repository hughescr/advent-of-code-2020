'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

const fieldFinder = /(?<field>byr|iyr|eyr|hgt|hcl|ecl|pid):(?<value>[^ ]+)/g;

readFile('input.txt', 'utf8', (err, data) => {
    const passports = _(data).trim().split('\n\n').map(p => p.split('\n').join(' '));
    const valid = _(passports).filter(p => p.match(fieldFinder).length === 7).value();
    console.log(valid.length);
});
