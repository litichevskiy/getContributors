const serverApi = require('../serverApi');
const QUANTITY_CONTRIBUTORS = 3;
const listUrl = {
  orgs: ( key ) => `https://api.github.com/orgs/${key}/repos`,
};

async function getContributors ( orgsName ) {
  if( typeof orgsName !== 'string' ) throw new Error('parameter url must be a string');

  let url = listUrl['orgs']( orgsName );
  let response = await serverApi.getData_v2( url );
  let reposName = getListByKey( response, 'name' );
  let contributorsUrl = getListByKey( response, 'contributors_url' );

  return getListContributors( contributorsUrl )
  .then( response => {
    if( response.status ) {
      return reposName.map( ( item, i ) => {
        return {[item]: response.data[i]};
      });

    }
    else throw response.data;
  })
  .catch( error => {
    throw error;
  });
};

async function getListContributors( list, result = [] ) {

  let url = list.pop();
  if( !url ) return { data: result, status: true };
  try{

    let response = await serverApi.getData_v2( url );
    result.push( response );
    return await getListContributors( list, result );

  } catch( error ) {
    return { status: null, data: error };
  }
};

function getListByKey( list, key ) {
  let result = [];
  for( let i = 0; i < QUANTITY_CONTRIBUTORS; i++ ) {
    result.push( list[i][key] );
  }

  return result;
}

module.exports = getContributors;