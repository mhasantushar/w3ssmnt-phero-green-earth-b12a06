<h2>What is the difference between var, let, and const?</h2>
<p>First of all, const takes a mandatory value during declaration, and you can't change it later, unlike var and let.</p>
<p>However, var is no longer recommended to be used in modern JS due to its scope and hoisting ambiguity. Both let and const, on the other hand, are block-scoped and hoisted.</p>

<h2>What is the difference between map(), forEach(), and filter()?</h2>
<p>All these methods are short-hand looping mechanisms that work on JS arrays, but for different purposes.</p>
<ul>
  <li>map() iterates through all elements, does something with them, and returns the result in another array. We can call it a transformation mechanism.</li>
  <li>filter() is another special-purpose tool that validates every element in an array and returns only the qualified elements via another array, something like a scrutiny operation.</li>
  <li>forEach(), on the other hand, is a generic-purpose tool if you want to traverse through an array performing one or more custom actions. It doesn't return anything, very similar to old good for or while loops. </li>
</ul>

<h2>What are arrow functions in ES6?</h2>
<p>Arrow function is simply a short-hand way to write functions that helps keep coding sleek and concise. We see one-liner functions these days, thanks to its intelligent syntax and effective features like implicit returns -very suitable for writing event handlers, callbacks, etc.</p>
Having said that, arrow functions can't use the arguments object.

<h2>How does destructuring assignment work in ES6?</h2>
<p>The destructuring assignment comes in very handy at times to unpack values and properties from arrays and objects respectively. Here are a few examples of how it works.</p>

<h4>Array Restructuring</h4>
<h5>const [a, b, c] = array</h5>
<p>a, b, c will get first 3 elements of the array</p>
<h5>const [a, , , d] = array</h5>
<p>We can skip even, here a and d get the first and forth elements of the array</p>
<h5>const [a=0, b=1] = array</h5>
<p>Supports default values to get rid of getting undefined values if the source array falls short</p>
<h5>const [first, second, ...last] = array</h5>
<p>We have rest operator to retrieve values from the tail</p>

<h4>Object Restructuring</h4>
<p>Above are few examples of array destructuring, and object destructuring works in the same way. We just need to use {} instead of [] in the left-hand side of the equation as shown below.</p>
<h5>const { prop1, prop2 } = object</h5>
Note that, you have to keep the names in the left-hand side same as properties in the right-hand side. However, we can rename the variables if required:

<h2>Explain template literals in ES6. How are they different from string concatenation?</h2>
<p>Template literals are a more powerful and flexible way to work with strings, using backticks (`) instead of quotes.</p>
<ol>
  <li>TL allows creating strings that span multiple lines without using \n.</li>
  <li>TL can include variables/expressions/functions within then using ${} - no need to use multiple quotes, + signs, and commas.</li>
  <li>Traditional concatenation expressions become messy with multiple variables/functions, whereas template literals help write cleaner and more readable code.</li>
</ol>
