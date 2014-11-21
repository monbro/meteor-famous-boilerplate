/* METEOR related configurations and functions
 ***************************************************/

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

Template.slideOne.rendered = function() {
  animateOurMainContainerView();
  addSomeSurfacesWithJavascriptOnly();
}

// whenever the template "animatedItem" is used, do these animations
Template.animatedItem.rendered = function() {
  animateThisTemplateWithRotation(this); // pass the reference variabe for our template 'this' to the function
};

/* FAMO.US related configurations and functions
 ***************************************************/

// we need to access some famous modules in this file so lets create some reference variables
var Transform = famous.core.Transform;
var Easing = famous.transitions.Easing;
var Surface = famous.core.Surface;
var Modifier = famous.core.Modifier;
var Engine = famous.core.Engine;

// load needed famous views
// https://famous-views.meteor.com/views/README
FView.registerView('GridLayout', famous.views.GridLayout);
FView.registerView('RenderController', famous.views.RenderController);

function animateThisTemplateWithRotation(meteorTemplate) {
  // create a reference variable to the modifier
  var fview = FView.from(meteorTemplate);
  var modifier = fview.modifier;

  // Set origin to center, and align middle left
  modifier.setOrigin([.5,.5]);
  modifier.setAlign([0,.5]);

  // INITIAL position of the element "animatedItem": set width and height for our boxes
  modifier.setSize([120,50]);

  // INITIAL position of the element "animatedItem": scaled to zero and rotated half a revolution
  modifier.setTransform(
    Transform.multiply(Transform.rotate(0,0,-Math.PI), Transform.scale(0.001,0.001))
  );

  // lets wait 2 seconds
  Meteor.setTimeout(function() {
    // now set the size back to normal
    modifier.setTransform(Transform.translate(50, 150, 1), { // here it throws the error, that Transform is not defined
        duration: 3000,
        curve: Easing.outBack
    });
  }, 2000);
}

function animateOurMainContainerView() {
  // get the view we want to use, accessed by the id attribute
  var fview = FView.byId('ourBasicStateModifierContainer');
  var modifier = fview.modifier;

  Meteor.setTimeout(function() {
    console.log('start animation dmonstration in slideOne');
    modifier.setOpacity(0.75); // reduce transparency
    modifier.setTransform(Transform.translate(100, 0, 1), { // x, y, z // move the whole thing to the right by 100px
        duration: 2000,
        curve: Easing.outBack
    });
  }, 2000);
}

function addSomeSurfacesWithJavascriptOnly() {
  // EXAMPLE: add stuff to famous in javascript itself without any html
  //////////////////////////

  // get the view we want to use, accessed by the id attribute
  var fview = FView.byId('ourBasicStateModifierContainer');

  // create render controller
  var renderController = new famous.views.RenderController(); // https://famous-views.meteor.com/views/RenderController

  // attach the render controller to the view, use a new state modifier here and align it to the page center
  fview.node.add(new Modifier({
      origin: [.5, .5],
      align: [.5, .5],
  })).add(renderController);

  // automatically generate four surfaces
  var surfaces = [];
  for (var i = 0; i < 4; i++) {
      surfaces.push(new Surface({
           content: "Surface: " + (i + 1),
           size: [200, 200],
           properties: {
               backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 50%)",
               lineHeight: "200px",
               "margin-top": "50px",
               textAlign: 'center'
           }
      }));
  }

  // lets control what adn when to show
  // simply tell the renderController object to show the first item from our surfaces array
  var counter = 0;
  renderController.show(surfaces[counter]);
  console.log('changed RenderController.show() to surface '+counter);

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