/**
 * This is the main entry point for webpack.
 * This file as an "autoloader" for any files placed under the "components/" directory
 * so just create the directory, place any component file in it, and it should be auto bundled.
 * The component file "can" have a default export as an object with a method init() that will be called on page load
 */
 import components from './components';

 const app = {
     init() {
         for (let i in components) {
             let component = components[i];
             if (typeof component === 'object' && component.hasOwnProperty('default')) {
                 component.default.hasOwnProperty('init') ? component.default.init() : null;
             }
         }
     }
 };
 

 
 
 app.init();