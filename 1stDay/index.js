'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

readFile('input.txt', 'utf8', (err, data) =>
{
    _(data).split('\n')
    .map(s => parseInt(s))
    .sort()
    .forEach((val, i, nums) => {
        const remain = 2020 - val;
        const found = _.findLast(nums, n => n ===remain);
        if(found)
        {
            console.log(val * remain);
            process.exit(0);
        }
    });
    process.exit(1);
})
