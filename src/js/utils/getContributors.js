const serverApi = require('../serverApi');
const QUANTITY_CONTRIBUTORS = 3;
const listUrl = {
  orgs: ( key ) => `https://api.github.com/orgs/${key}/repos`,
};

function getContributors( orgsName ) {
  if( typeof orgsName !== 'string' ) throw new Error('parameter url must be a string');

  return new Promise((resolve, reject) => {
    let url = listUrl['orgs']( orgsName )
    serverApi.getData( url )
    .then( response => {
      const { listContributors, reposName } = getContributorsList( response, orgsName );
      Promise.all( listContributors )
      .then(responseList => {
        let result = createResponseList( reposName, responseList );
        resolve( result );
      })
      .catch(error => reject( error ));
    })
    .catch( error => reject( error ));
  });
};

function createResponseList( reposName, responseList ) {
  return reposName.map( ( item, i ) => {
    return {[item]: responseList[i]};
  });
};

function getContributorsList( response, orgsName ) {
  let contributors = [];
  let repositories = [];
  let url;
  let data;
  for( let i = 0; i < QUANTITY_CONTRIBUTORS; i++ ) {
    data = response[i];
    url = data['contributors_url'];
    contributors.push(serverApi.getData( url ));
    repositories.push( data['name'] );
  }
  return {listContributors: contributors, reposName: repositories};
};

module.exports = getContributors;