// #javascript, #functions, #pure

let favouriteEmployee = "John";

function payWage(employee, hours) {
  const hourlyWage = 50;
  let wage = hours * hourlyWage;

  if (employee === favouriteEmployee) {
    wage += 25;
  }

  return wage;
}

/**
 * Although unethical, at first `payWage` seems to be a pure function. I.e,
 * For every invocation, matching input produce matching output
 */
payWage("John", 4); // 225
payWage("Jane", 5); // 250
payWage("Jane", 5); // 250
payWage("John", 4); // 225

/**
 * If line 11 read `if(employee === "John") it would've been a pure function
 * But notice the result from line 23 not match 30 in the following block
 */
favouriteEmployee = "Jane";
payWage("John", 4); // 200

/**
 * To write a pure function ensure no state external to the function
 * is used in calculting the result or output of the function!
 */
