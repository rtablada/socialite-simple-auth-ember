import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    signInViaGithub: function() {
      const controller = this.controller;

      this.get('session').authenticate('simple-auth-authenticator:torii', 'github-oauth2');
    },

    sessionAuthenticationSucceeded() {
      alert('hey');
      const secure = this.get('session.secure');
      const code = secure.authorizationCode;

      Ember.$.ajax({
        url: 'http://localhost:8000/session',
        type: 'GET',
        data: { code },
        dataType: 'json',
        success: (result) => {
          result.authenticator = 'simple-auth-authenticator:oauth2-password-grant';

          this.get('session.store').persist({secure:result});
        },

        error: (jqXHR, textStatus, errorThrown) => {
          debugger;
        },
      });
    },
  },
});
