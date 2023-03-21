exports.up = function (knex) {
    return knex.schema.createTable("users", (t) => {
        t.increments();
        t.string("first_name");
        t.string("last_name");
        t.string("email").unique().notNullable();
        t.string("password");
        t.string("phone");
        t.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
