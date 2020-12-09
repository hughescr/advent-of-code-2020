'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

readFile('input.txt', 'utf8', (err, data) => {
    console.log(_(data).trim()
    .split('\n')
    .filter(line => {
        const {min_s, max_s, char, passwd} = line.match(/^(?<min_s>\d+)-(?<max_s>\d+) (?<char>.): (?<passwd>.*)$/).groups;
        const min = parseInt(min_s);
        const max = parseInt(max_s);
        const finds = passwd.match(new RegExp(char, "g"));
        return finds && finds.length >= min && finds.length <= max;
    })
    .length);
});
