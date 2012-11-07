function Widget(name, data) {
  this.name = name;
  this.data = data;
  this.getName = function() { 
    console.log(this.name);
  };
}

var w1 = new Widget("Button", {id: "1"});
var w2 = new Widget("Tabs", {id: "2", tabs: []});

console.log(w1.getName === w2.getName);

//

function Widget() {}

Widget.prototype.name = "WidgetName";
Widget.prototype.data = {};
Widget.prototype.getName = function() {
  console.log(this.name);
};

var w1 = new Widget();
var w2 = new Widget();

w1.name = "Dialog"; // Set on instance
w1.getName();
delete w1.name; // Back to prototype
w1.getName();

//..continued from last slide

Widget.prototype.numbers = [1,2];

var w3 = new Widget();
var w4 = new Widget();

w3.numbers.push(100);
console.log(w4.numbers); // [1, 2, 100]

// Constructor + prototype
function Widget(name, data) {
  this.name = name;
  this.data = data;
}

Widget.prototype = {
  constructor: Widget,
  getName: function() {
    console.log(this.name);
  },
};

var w1 = new Widget("Button", {id: "1"});
var w2 = new Widget("Tabs", {id: "2", tabs: []});

w1.data['awesome'] = true;
console.log(w2.data['awesome']); // undefined

function Widget(name, data) {
  var o = {
    name: name,
    data: data,
    getName: function() {
      console.log(this.name)
    }
  };

  return o; // Overrides default behavior of constructor
}

// "Professional JavaScript For Web Developers 3rd Ed."
// by Nicholas Zakas

function SpecialArray() {
  var values = new Array();

  values.push.apply(values, arguments);
  
  values.toPipedString = function() {
    return this.join("|");
  };
  
  return values;
}

var colors = new SpecialArray("red", "blue", "green"); 
alert(colors.toPipedString()); //”red|blue|green”

function Widget(name, data) {
  var o = new Object();

  // Private stuff, if needed

  o.getName = function() {
    console.log(name);
  };

  return o;
}

var w1 = Widget("Button", {id: "1"});

console.log(w1.data); // undefined
w1.getName();

//

function Parent() {
  this.parentVal = "parent";
  // ...
}

Parent.prototype.getParentVal = function() {
  return this.parentVal;
}

function Child() {
  this.childVal = "child";
  // ...
}

Child.prototype = new Parent();

Child.prototype.getChildVal = function() {
  return this.childVal;
}

var c = new Child();
console.log(c.getParentVal());

//

function Parent() {
  this.parentArray = [1,2];
  // ...
}

function Child() {
  Parent.call(this);
  // ...
}


var c1 = new Child();
var c2 = new Child();

c1.parentArray.push(100);

console.log(c2.parentArray);

// Combination
function Parent(pVal) {
  this.parentVal = pVal;
  this.parentArray = [1,2];
}

Parent.prototype.getParentVal = function() {
  return this.parentVal;
}

function Child(pVal, cVal) {
  Parent.call(this, pVal); // Inherit Properties
  this.childVal = cVal;
}

Child.prototype = new Parent(); // Inherit Methods

Child.prototype.getChildVal = function() {
  return this.childVal;
}

var c1 = new Child("parent", "child");
c1.parentArray.push(100);
console.log(c1.getParentVal()); // parent

var c2 = new Child("PARENT", "CHILD");
console.log(c2.parentArray); // [1,2]
console.log(c2.getParentVal()); // PARENT

// Prototypal
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var widget = {
  name: "Widget",
  keys: [1,2,3]
};

var menuBar = object(widget);
menuBar.keys.push(100);

var slideShow = object(widget);
slideShow.keys.push(1000);

// Parasitic
function createAnother(o) {
  clone = Object.create(o);
  clone.greet = function() {
    console.log("heyo!");
  }
  return clone;
}

var widget = {
  name: "Widget",
  keys: [1,2,3]
};

var searchBar = createAnother(widget);

// Parasitic Combination
function inheritPrototype(subType, superType) { 
  var prototype = Object.create(superType.prototype); 
  prototype.constructor = subType; 
  subType.prototype = prototype;
}

function Parent(pVal) {
  this.parentVal = pVal;
  this.parentArray = [1,2];
}

Parent.prototype.getParentVal = function() {
  return this.parentVal;
}

function Child(pVal, cVal) {
  Parent.call(this, pVal); // Inherit Properties
  this.childVal = cVal;
}

inheritPrototype(Child, Parent);

Child.prototype.getChildVal = function() {
  return this.childVal;
}

var c1 = new Child("parent", "child");
c1.parentArray.push(100);
console.log(c1.getParentVal()); // parent

var c2 = new Child("PARENT", "CHILD");
console.log(c2.parentArray); // [1,2]
console.log(c2.getParentVal()); // PARENT