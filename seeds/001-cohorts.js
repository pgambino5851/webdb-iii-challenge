
exports.seed = function(knex, Promise) {
  
  return knex('cohorts').insert([
        { name: 'WEB15'},
        { name: 'WEB16'},
        { name: 'WEB17'},
        { name: 'WEB18'}
  ])
   
};
