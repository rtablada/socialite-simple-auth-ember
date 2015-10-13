import GithubProvider from 'torii/providers/github-oauth2';

export default GithubProvider.extend({
  open() {
    var name             = this.get('name');
    var url              = this.buildUrl();
    var redirectUri      = this.get('redirectUri');
    var responseParams   = this.get('responseParams');
    var responseType     = this.get('responseType');
    var state            = this.get('state');
    var shouldCheckState = responseParams.indexOf('state') !== -1;

    return this.get('popup').open(url, responseParams).then(function(authData) {
      var missingResponseParams = [];

      responseParams.forEach(function(param) {
        if (authData[param] === undefined) {
          missingResponseParams.push(param);
        }
      });

      if (missingResponseParams.length) {
        throw new Error('The response from the provider is missing ' +
              'these required response params: ' + missingResponseParams.join(', '));
      }

      if (shouldCheckState && authData.state !== state) {
        throw new Error('The response from the provider has an incorrect ' +
                        'session state param: should be "' + state + '", ' +
                        'but is "' + authData.state + '"');
      }

      return {
        state: state,
        authorizationCode: authData[responseType],
        provider: name,
        redirectUri: redirectUri,
      };
    });
  },
});
