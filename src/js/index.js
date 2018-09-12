const getContributors = require('./utils/getContributors');
const getContributors_v2 = require('./utils/getContributors_v2');

getContributors('nodejs')
.then( response => {
  console.log( response );
})
.catch( error => console.error( error ));

getContributors_v2('atom')
.then( response => {
  console.log( response );
})
.catch(error => console.error( error ) );