// #oop, #class, #object, #javascript, #typescript

// In Javascript there are a few ways to create objects

// Option 1: Instantiating object from a constructor function
function Person(name, surname, dob, sport) {
  this.name = name;
  this.surname = surname;
  this.dob = dob;
  this.sport = sport;
}

// Instantiation (right-side) and initialization (left-side)
const contestant = new Person("John", "Smith", "1982-01-01", "soccer");

// Option 2: Using object initializer to create object
const referee = {
  name: "Jane",
  surname: "Smith",
  dob: "1981-01-01",
  sport: "soccer",
};

// Option 3: Static `create` method in standard built-in Object type
const umpire = Object.create(referee);
umpire.name = "Jessica";
umpire.dob = "2000-01-01";
