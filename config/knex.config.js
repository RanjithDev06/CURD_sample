const knex = require("knex");

const write_knex = knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        charset: "utf8",
    },
    debug: process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "staging1",
});

const read_knex = knex({
    client: "pg",
    connection: {
        host: process.env.REPLICA_DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        charset: "utf8",
    },
    debug: process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test",
});

module.exports = {
    write_knex,
    read_knex,
};
