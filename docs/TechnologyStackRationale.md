CS 411 Software Engineering

Lab A6 Group 2

Juan Zapata-Gomez, Mohao Yi, 

Hung-yi Chang, Xuanting Chen, Xiaoyi Zhou

03/29/2019

Project Assignment 3: Prototype
====

Summary
----
· React is chosen as the technology stack of Google Facial Recognition. 
  Angular has been considered. Due to the complexity of the structures (Injectables,
  Components, Pipes, Modules, etc.), we decide to use React.

· Rationales of using React
----
  Several features of React makes it the efficient technology stack for Google Facial 
  Recognition prototype assignment (TechMagic, "React vs. Angular vs Vue.js -- What to 
  Choose in 2019," 2018):
  
    a. Simple Design (HTML-like syntax)
    
    b. Fast (React's Virtual DOM implementation, rendering optimizations)
    
    c. Powerful framework (supporting server-side rendering)
    
    d. Type-safe (native support for JSX)
    
    e. Reusable code (Functional Programming concepts)
    
  Considering the Google Facial Application's functions and developers' availability,
  we use React for the corresponding reasons:
  
    a. Easier for new developers' to learn 
    
    b. A large quantity of images/addresses is queued for API calls
    
    c. The need to build and serve an application from the server when user requests a page
    
    d. Friendly to new software developers. The code only accesses the memory location 
       it is authorized.
       
    e. Efficient for future development and maintenance

· Rationales of not using Angular 
----
  Angular as a JavaScript MVVM framework has many benefits of for building highly interactive
  web applications. However, we decided not to use it because of the feature of the variety of 
  different structures. It is harder for new developers to learn in comparison with React in
  a short span of assignment time (one week). It also has relatively slower performance. 
  Comparing to React, Angular is less accommodated with the application function of queuing 
  and processing a large quantity of API calls.

Reference:
----
TechMagic. (2018, March 16). "React vs. Angular vs Vue.js -- What to Choose in 2019." Medium.com. 
Retrieve from https://medium.com/@TechMagic/reactjs-vs-angular5-vs-vue-js-what-to-choose-in-2018-b91e028fa91d
