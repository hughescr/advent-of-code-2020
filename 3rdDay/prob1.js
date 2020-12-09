'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

readFile('input.txt', 'utf8', (err, data) => {
    let i = 0;
    console.log(_(data).trim()
                .split('\n')
                .reduce((trees, line) => {
                    i = i % line.length;
                    const isTree = line.charAt(i) === '#';
                    i += 3;
                    return trees + isTree;
                }, 0)
    );
});
