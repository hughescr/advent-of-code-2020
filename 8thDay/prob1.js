'use strict';

const _ = require('lodash');
const { readFile } = require('fs');
const { inspect } = require('util');

const instructionParser = /^(?<opcode>...) (?<argument>[-+0-9]+)$/;

readFile('input.txt', 'utf8', (err, data) => {
    const program = _(data.trim())
    .split('\n')
    .map(line => line.match(instructionParser).groups)
    .map(line => ({ opcode: line.opcode, argument: parseInt(line.argument) }))
    .value();

    let acc = 0;
    let pc = 0;
    let executedLines = _.times(program.length, _.constant(false));
    while(!executedLines[pc]) {
        executedLines[pc] = true;

        if(program[pc].opcode === 'acc') {
            acc += program[pc].argument;
        }

        if(program[pc].opcode === 'jmp') {
            pc += program[pc].argument;
        } else {
            pc++;
        }
    }

    console.log(acc);
});
