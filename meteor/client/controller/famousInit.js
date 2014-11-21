// set initial template to start with
Session.setDefault('esTemplate', 'slideOne');

Template.famousInit.helpers({
  esTemplate: function() {
    return Session.get('esTemplate');
  },
  showTemplate: function() {
    console.log('Showing now template: '+Session.get('esTemplate'));
    return  Template[Session.get('esTemplate')];
  }
});