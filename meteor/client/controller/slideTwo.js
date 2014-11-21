var sliderTimeout;

Template.slideTwoContent.rendered = function() {
    sliderTimeout = Meteor.setTimeout(function(){
        console.log('Timeout in SlideTwoContent fired.');
        Session.set('esTemplate', 'slideThree');
    }, 6000);
}

Template.slideTwoContent.events({
  'click #next': function(event, tpl) {
    console.log('click next button on SlideTwoContent');
    clearTimeout(sliderTimeout); // we need to disable the timout as we got a user action for the navigation now
    Session.set('esTemplate', 'slideThree');
  },
  'click #prev': function(event, tpl) {
    console.log('click prev button slideTwoContent');
    clearTimeout(sliderTimeout); // we need to disable the timout as we got a user action for the navigation now
    Session.set('esTemplate', 'slideOne');
  }
});