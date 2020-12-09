'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

const countTrees = (({ forest, right, down }) => {
    let i = 0;
    return _(forest).reduce((trees, line, lineNumber) => {
                    if(lineNumber % down) return trees;
                    i = i % line.length;
                    const isTree = line.charAt(i) === '#';
                    i += right;
                    return trees + isTree;
                }, 0);
})

readFile('input.txt', 'utf8', (err, data) => {
    const forest = data.trim().split('\n');
    console.log(countTrees({ forest: forest, right: 1, down: 1 }) *
                countTrees({ forest: forest, right: 3, down: 1 }) *
                countTrees({ forest: forest, right: 5, down: 1 }) *
                countTrees({ forest: forest, right: 7, down: 1 }) *
                countTrees({ forest: forest, right: 1, down: 2 }));
});
