'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

readFile('input.txt', 'utf8', (err, data) => {
    const sum = _(data.trim()).split('\n\n')
    .map(group => _.intersection(..._.chain(group).split('\n') // Break into individual people
                    .map(person => person.split('')) // Split individual answers
                    .value()).length
        )
    .value();
    console.log(_.sum(sum));
});
