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

    program.forEach((line, lineNumber) => {
        if(line.opcode === 'acc') return; // Don't try and change "acc"s

        const testProgram = _.cloneDeep(program); // Copy the original program
        testProgram[lineNumber].opcode = testProgram[lineNumber].opcode === 'jmp' ? 'nop' : 'jmp'; // Swap the opcode

        // Now try running and see if we hang, blow the stack or exit
        let acc = 0;
        let pc = 0;
        let executedLines = _.times(testProgram.length, _.constant(false));
        while(pc < testProgram.length && !executedLines[pc]) {
            executedLines[pc] = true;

            if(testProgram[pc].opcode === 'acc') {
                acc += testProgram[pc].argument;
            }

            if(testProgram[pc].opcode === 'jmp') {
                pc += testProgram[pc].argument;
            } else {
                pc++;
            }

            if(pc === testProgram.length) {
                console.log(acc);
                process.exit(0);
            }
        }
    });

    console.log(undefined);
    process.exit(1);
});
