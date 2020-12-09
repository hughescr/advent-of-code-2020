'use strict';

const _ = require('lodash');
const { readFile } = require('fs');

const seatParser = /^(?<row_enc>[FB]{7})(?<column_enc>[LR]{3})$/;

readFile('input.txt', 'utf8', (err, data) => {
    const seats = _(data.trim()).split('\n').map(seat => {
        const { row_enc, column_enc } = seat.match(seatParser).groups;
        const row    = parseInt(row_enc   .replaceAll('F','0').replaceAll('B','1'), 2);
        const column = parseInt(column_enc.replaceAll('L','0').replaceAll('R','1'), 2);
        return row * 8 + column;
    })
    .sortBy()
    .value();
    const min_seat = seats[0];
    const max_seat = seats[seats.length-1];
    const all_seats = _.range(min_seat, max_seat+1);
    console.log(_.difference(all_seats, seats)[0]);
});
