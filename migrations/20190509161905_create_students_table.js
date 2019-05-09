
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', tbl => {
        //each table needs a primary key
        //we'll call it id, integer, auto-increment
        tbl.increments(); //pass in name if you want to call it anything other than id
        tbl.string('name', 128).notNullable().unique();
        tbl.timestamps(true, true); //create_at and updated_at made for free
        tbl
            .integer('cohort_id')
            .unsigned()
            .references('id')
            .inTable('cohorts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students')
};
