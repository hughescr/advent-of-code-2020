'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

const fieldFinder = /(?<field>byr|iyr|eyr|hgt|hcl|ecl|pid):(?<value>[^ ]+)/g;

readFile('input.txt', 'utf8', (err, data) => {
    const passports = _(data).trim()
    .split('\n\n')
    .map(p => p.split('\n').join(' '))
    .filter(p => {
        const fields = _(Array.from(p.matchAll(fieldFinder)))
                            .reduce((o, match) => {
                                if(match.groups.field == 'pid') {
                                    return _.assign({ pid: match.groups.value }, o);
                                } else if(match.groups.field != 'hgt') {
                                    return _.assign({ [match.groups.field]: parseInt(match.groups.value) || match.groups.value }, o);
                                } else {
                                    const matches = match.groups.value.match(/^(?<height>\d+)(?<unit>in|cm)/);
                                    if(!matches) return o;
                                    const { height, unit } = matches.groups;
                                    return _.assign({ hgt: { height: height, unit: unit }}, o);
                                }
                            }, {});
        return (fields.byr && fields.byr >= 1920 && fields.byr <= 2002) &&
               (fields.iyr && fields.iyr >= 2010 && fields.iyr <= 2020) &&
               (fields.eyr && fields.eyr >= 2020 && fields.eyr <= 2030) &&
               (fields.hgt && ((fields.hgt.unit == 'cm' && fields.hgt.height >= 150 && fields.hgt.height <= 193) ||
                               (fields.hgt.unit == 'in' && fields.hgt.height >=  59 && fields.hgt.height <=  76))) &&
               (fields.hcl && /^#[0-9a-f]{6}$/.test(fields.hcl)) &&
               (fields.ecl && /^(?:amb|blu|brn|gry|grn|hzl|oth)$/.test(fields.ecl)) &&
               (fields.pid && /^\d{9}$/.test(fields.pid));
    });
    console.log(passports.length);
});
