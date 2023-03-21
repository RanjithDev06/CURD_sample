'use strict';
const write_knex = require('./knex.config').write_knex;
const write_bookshelf = require('bookshelf')(write_knex);
const read_knex = require('./knex.config').read_knex;
const read_bookshelf = require('bookshelf')(read_knex);
// Initialize bookshelf once and use it from anywhere
module.exports = {
    write_bookshelf,
    read_bookshelf   
};
