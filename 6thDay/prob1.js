'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

readFile('input.txt', 'utf8', (err, data) => {
    const sum = _(data.trim()).split('\n\n')
    .map(group => _.chain(group).split('\n') // Break into individual people
                    .map(person => _(person).split('') // Split individual answers
                                            .reduce((o, c) => _.assign(o, { [c]: 1 }), {}) // Build a map of the person's answers
                    )
                    .reduce((o, c) => _.assign(o, c), {}) // Merge down
                    .keys()
                    .value()
                    .length
        )
    .value();
    console.log(_.sum(sum));
});
