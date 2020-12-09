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
        const charAtMin = passwd.charAt(min - 1);
        const charAtMax = passwd.charAt(max - 1);
        return charAtMin != charAtMax && (char === charAtMin || char === charAtMax);
    })
    .length);
});
