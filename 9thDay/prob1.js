'use strict';

const _ = require('lodash');
const { readFile } = require('fs');
const { inspect } = require('util');

readFile('input.txt', 'utf8', (err, data) => {
    const lines = _(data.trim())
    .split('\n')
    .map(line => parseInt(line))
    .value();

    let i = 25;
    while(i < lines.length) {
        const current = lines[i];
        const previous25 = _.slice(lines, i-25, i);
        const num1 = _(previous25).findLast((n, i) => _(previous25).take(i).find(n2 => n2 === current-n));
        if(!num1) {
            console.log(current);
            break;
        }
        i++;
    }
});
