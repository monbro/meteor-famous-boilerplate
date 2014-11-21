// a random array which represents some data from the database maybe
var textWords = [{'name':'Box One'},{'name':'Box Two'},{'name':'Box Three'}];

// add a click event
Template.slideOneContent.events({
  'click #next': function(event, tpl) {
    console.log('click next button on name content');
    Session.set('esTemplate', 'slideTwo');
  }
});

// add a helper method to meteors blaze template enginge
Template.slideOne.helpers({
  textWords: function() {
    return textWords;
  }
});

// load needed famous views
// https://famous-views.meteor.com/views/README
FView.registerView('GridLayout', famous.views.GridLayout);
FView.registerView('RenderController', famous.views.RenderController);

Template.slideOne.rendered = function() {
  var Transform = famous.core.Transform;
  var Easing = famous.transitions.Easing;
  var Surface = famous.core.Surface;
  var Modifier = famous.core.Modifier;
  var Engine = famous.core.Engine;

  // var fview = FView.from(this); // this seems not to work for me so far
  var fview = FView.byId('ourBasicStateModifierContainer');

  var modifier = fview.modifier;
  Meteor.setTimeout(function() {
    console.log('start animation dmonstration in slideOne');
    modifier.setOpacity(0.75);
    modifier.setTransform(Transform.translate(100, 0, 220), { // here it throws the error, that Transform is not defined
        duration: 2000,
        curve: Easing.outBack
    });
  }, 2000);

  // add new surfaces via javascript
  var renderController = new famous.views.RenderController(); // https://famous-views.meteor.com/views/RenderController
  var surfaces = [];
  var counter = 0;

  // automatically generate four random surfaces to put them inside our new renderController object
  for (var i = 0; i < 4; i++) {
      surfaces.push(new Surface({
           content: "Surface: " + (i + 1),
           size: [200, 200],
           properties: {
               backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 50%)",
               lineHeight: "200px",
               textAlign: 'center'
           }
      }));
  }

  renderController.show(surfaces[counter]);

  fview.node.add(new Modifier({
      origin: [.5, .5],
      align: [.5, .5],
  })).add(renderController);

  // now simply change the surfaces in the RenderController after two seconds each
  Meteor.setTimeout(function() {
      counter = counter+1;
      renderController.show(surfaces[counter]);
      console.log('changed RenderController.show() to surface '+counter);
  }, 2000);

  Meteor.setTimeout(function() {
      counter = counter+1;
      renderController.show(surfaces[counter]);
      console.log('changed RenderController.show() to surface '+counter);
  }, 4000);

  Meteor.setTimeout(function() {
      counter = counter+1;
      renderController.show(surfaces[counter]);
      console.log('changed RenderController.show() to surface '+counter);
  }, 6000);

}

Template.examples_animate_item.rendered = function() {
  var fview = FView.from(this);
  var modifier = fview.modifier;

  var Transform = famous.core.Transform;
  var Easing = famous.transitions.Easing;

  // Set origin to center, and align middle left
  modifier.setOrigin([.5,.5]);
  modifier.setAlign([0,.5]);

  // Start off with width 0, scaled to zero and rotated half a revolution
  modifier.setSize([0,100]);
  modifier.setTransform(
    Transform.multiply(Transform.rotate(0,0,-Math.PI), Transform.scale(0.001,0.001))
  );

  Meteor.setTimeout(function() {
    modifier.setTransform(Transform.translate(200, 300, 220), { // here it throws the error, that Transform is not defined
        duration: 3000,
        curve: Easing.outBack
    });
  }, 2000);

};