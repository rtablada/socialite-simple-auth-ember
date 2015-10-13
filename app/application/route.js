import Ember from 'ember';
import config from 'app-thing/config/environment';

console.log(config);

export default Ember.Route.extend({
  actions: {
    signInViaGithub: function() {
      this.get('torii').open('github-socialite').then((authData) => {
        console.log(authData);
        debugger;
        alert('success!');
      }, (error) => {
        this.controller.set('error', 'Could not sign you in: ' + error.message);
      });
    },
  },
});
