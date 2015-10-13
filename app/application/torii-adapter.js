import Ember from 'ember';

export default Ember.Object.extend({
  open(authorization) {
    var temporaryCode = authorization.authorizationCode;

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: 'http://localhost:8000/session',
        type: 'POST',
        data: { 'github-auth-code': temporaryCode },
        dataType: 'json',
        success(result) {
          console.log(result);
        },

        error: (jqXHR, textStatus, errorThrown) => {
          Ember.run.bind(null, reject({message: errorThrown}));
        },
      });
    });
  },
});
