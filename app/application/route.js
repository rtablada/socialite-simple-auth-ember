import Ember from 'ember';
import config from 'app-thing/config/environment';

console.log(config);

export default Ember.Route.extend({
  actions: {
    signInViaGithub: function() {
      const controller = this.controller;

      this.get('torii').open('github-oauth2').then((authData) => {
        Ember.$.ajax({
          url: 'http://localhost:8000/session',
          type: 'GET',
          data: { code: authData.authorizationCode },
          dataType: 'json',
          success(result) {
            controller.set('email', result.email);
          },

          error: (jqXHR, textStatus, errorThrown) => {
            debugger;
          },
        });

        console.log(authData);
        alert('success!');
      }, (error) => {
        this.controller.set('error', 'Could not sign you in: ' + error.message);
      });
    },
  },
});
