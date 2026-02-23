
## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

a. getElementById

Use this when you know the unique ID of an element.

Returns a single element (or null if not found).

Fastest method because IDs are unique in the DOM.

const header = document.getElementById("mainHeader");

b. getElementsByClassName

Use this when you want a live collection of all elements with a specific class.

Returns an HTMLCollection that updates automatically if the DOM changes.

const buttons = document.getElementsByClassName("btn");

Live collections can be tricky because adding/removing elements affects the collection immediately.

c. querySelector / querySelectorAll

Use these for CSS-style selectors or complex selectors (combinations of classes, IDs, pseudo-classes, etc.).

const firstButton = document.querySelector(".btn.primary");
const allButtons = document.querySelectorAll(".btn.primary");

d. querySelectorAll for a static list

Returns a NodeList that does not update automatically when the DOM changes.

Useful when you want a snapshot of elements at a moment in time.

const cards = document.querySelectorAll(".card"); // static list

Rule of thumb:
Unique ID → getElementById
One class, live updates → getElementsByClassName
Complex selectors or static lists → querySelector / querySelectorAll


### 2. How do you create and insert a new element into the DOM?
const newDiv = document.createElement("div");
newDiv.textContent = "Hello";
newDiv.id = "myDiv";
newDiv.className = "box";

a. Append as the last child
const container = document.getElementById("container");
container.appendChild(newDiv); 
b. Insert before a specific element
const referenceNode = document.getElementById("firstItem");
container.insertBefore(newDiv, referenceNode);
c. Using modern methods (append, prepend)
container.append(newDiv); 
container.prepend(newDiv); 

append and prepend can also accept text nodes or multiple elements.
Optional: Create text nodes separately
Instead of textContent, you can create a text node:

const text = document.createTextNode("Hello");
newDiv.appendChild(text);

createElement → makes the element (not yet in DOM)
appendChild, insertBefore, append, prepend → place it into the DOM
textContent or innerHTML → add content


### 3. What is Event Bubbling? And how does it work?
Event occurs on a target element (child element).
Browser checks if the target has an event listener → executes it.
Moves up the DOM tree (parent → grandparent → … → document → window).
Executes any matching event listeners on the ancestors.


### 4. What is Event Delegation in JavaScript? Why is it useful?


<ul id="todoList">
  <li>Learn JS</li>
  <li>Practice DOM</li>
  <li>Build Projects</li>
</ul>

Instead of adding a click listener to each <li>, we do:
const list = document.getElementById("todoList");

list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log("You clicked:", event.target.textContent);
  }
});


Clicking an <li> triggers a click event.
The event bubbles up to the <ul>, which has the listener.
Inside the handler, event.target tells you which child element was actually clicked.
Why Event Delegation is Useful
Fewer Event Listeners → Better performance
Instead of 100 <li> elements each having a listener, one listener on the parent handles all clicks.
Handles Dynamic Elements
If you add new <li> items later, you don’t need to attach new listeners.
const newItem = document.createElement("li");
newItem.textContent = "New Task";
list.appendChild(newItem); 


### 5. What is the difference between preventDefault() and stopPropagation() methods?

---

**Technology Stack:**

- HTML
- CSS (Vanilla/Tailwind/DaisyUI)
- JavaScript (Vanilla)

---

## What to submit:

1. GitHub Repository Link:
2. Live Site Link:
