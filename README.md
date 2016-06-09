# generator-web-starter-angularjs


[generator-web-starter-angularjs](https://github.com/forumone/generator-web-starter-angularjs/) is a yeoman sub-generator to be used by [generator-web-starter](https://github.com/forumone/generator-web-starter).
It shouldn't be use directly.

It is going to generate:

```
src
 └── js
     ├── index.js // where the angular-ui-router states are declared
     └── states
         └── home
             ├── home.html // 'home' template
             ├── homeCtrl.js   // 'home' controller
             └── homeRoute.js   // 'home' angular-ui-router state declaration
templates
 └── index.html //starting point of the angular application
 ```
 
 After the first generation, run: 
 
 ```npm install; bower install```
 
 
Run your application:
 
```grunt```


Then open your browser on http://localhost:9001/
 
 