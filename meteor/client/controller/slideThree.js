Template.slideThreeContent.events({
  'click #prev': function(event, tpl) {
    console.log('click prev button slideThreeContent');
    Session.set('esTemplate', 'slideTwo');
  }
});