'use strict';

const _ = require('lodash');
const { readFile } = require('fs');
const { inspect } = require('util');

readFile('input.txt', 'utf8', (err, data) => {
    const lines = _(data.trim())
    .split('\n')
    .map(line => parseInt(line))
    .value();
});
