module.exports = {

  getData( url ) {
    if( !url ) throw new Error('parameter url can not be empty');
    return fetch( url )
    .then( response => {
      if( response.ok ) return response.json();
      else return Promise.reject( response );
    })
    .then( response => Promise.resolve( response ))
    .catch( error => Promise.reject( error ))
  },

  async getData_v2( url ) {
    if( !url ) throw new Error('parameter url can not be empty');
    let response;
    try{
      response = await fetch( url );
      if( response.ok ) response = await response.json();
      else throw new Error();
    } catch( error ) {
      return Promise.reject( error )
    }
    return response;
  }
};