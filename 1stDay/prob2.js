'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

readFile('input.txt', 'utf8', (err, data) =>
{
    const input = _.sortBy(_(data).trim()
    .split('\n')
    .map(s => parseInt(s)));
    _(input)
    .forEach((first, i, nums) => {
        _(nums).takeRightWhile(second => second > first)
        .takeWhile(second => first + second < 2020 && (2020 - (first + second) > second))
        .forEach(second => {
            const remain = 2020 - (first + second);
            const third = _(nums).takeRightWhile(third => third > second).find(n => n === remain);
            if(third) {
                console.log(first * second * third);
                process.exit(0);
            }
        });

    });
    process.exit(1);
})
