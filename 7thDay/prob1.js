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

    const containedRules = _(rules).reduce((o, rule, bag) => {
        const thisRule = _.merge(..._.chain(rule).keys().filter(k => rule[k] > 0).map(v => ({[v]: [bag]})).value());
        _.mergeWith(o, thisRule, (objV, srcV, key, obj, src) => {
            return _.union(objV, srcV);
        });
        return o;
    }, {});

    const recursiveContains = (bag) => {
        const expand = containedRules[bag];
        if(!expand) return [];
        return _.union(expand, ..._(expand).map(recursiveContains).value());
    };

    console.log(recursiveContains('shiny gold').length);
});
