'use strict';

const _ = require('lodash');
const { readFile } = require('fs');
const { inspect } = require('util');

const ruleParser = /^(?<container>.*?) bags contain (?<contents>.*?)\.$/;
const contentsParser = /^(?<number>\d+) (?<bagtype>.*) bags?$/;

readFile('input.txt', 'utf8', (err, data) => {
    const rules = _(data.trim()).split('\n')
    .map(line => line.match(ruleParser).groups)
    .map(bag => _.assign(bag, { contents: _(bag.contents).split(', ')
                                                        .map(content => {
                                                            const matches = content.match(contentsParser);
                                                            if(!matches) return { number: 0, bagtype: undefined };
                                                            return {
                                                                bagtype: matches.groups.bagtype,
                                                                number: parseInt(matches.groups.number),
                                                            };
                                                        })
                                                        .keyBy('bagtype')
                                                        .mapValues('number')
                                                        .value()
                              }
                        )
        )
    .keyBy('container')
    .mapValues('contents')
    .value();

    const recursiveNeed = (bag) => {
        const expand = rules[bag];

        if(!expand) return 0;
        return 1 + _(expand).map((number, bag) => {
            if(number === 0) return 0;
            return number * recursiveNeed(bag)
        }).sum();
    };

    console.log(recursiveNeed('shiny gold') - 1);
});
