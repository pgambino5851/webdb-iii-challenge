
exports.seed = function(knex, Promise) {
  
  return knex('students').insert([
        { name: 'Austen', cohort_id: 1},
        { name: 'Ben', cohort_id: 1},
        { name: 'Alex', cohort_id: 2},
        { name: 'Peter', cohort_id: 0},
  ])
   
};
