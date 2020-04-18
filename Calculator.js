;(function( global, $ ) {
    "use strict";
    
    // Create 'new' Calc object 
    var Calc = function(num1, num2, action) {    
        return new Calc.init( num1, num2, action );
    }
    
    // Hidden within the scope of the IIFE and never directly accessible
    var supportedActions = ['clear', 'add', 'sub', 'mul', 'div'];
    
    // logger messages
    var logMessages = {
        add: '$1 plus $2',
        sub: '$1 minus $2',
        mul: '$1 times $2',
        div: '$1 divide $2'
    };
    
    // the calculation result
    var result;
    
    // prototype holds methods
    Calc.prototype = {
        
        // resets the calculator's parameters
        clear: function() {
            this.num1 = 0;
            this.num2 = 0;
            this.resetAction();
            console.log("Calculator has been reset");
            return 0;
        },
        // adding two numbers together
        add: function(firstNum, secondNum) {
            return (firstNum + secondNum);
        },
        // subtracting one number from another
        sub: function(firstNum, secondNum) {
            return (firstNum - secondNum);
        },
        // multiple two numbers
        mul: function(firstNum, secondNum) {
            return (firstNum * secondNum);
        },
        // dividing one number by the other
        div: function(firstNum, secondNum) {
            return (firstNum / secondNum);
        },
        // Checks if knows how to calculate
        validateAction: function() {
            
           // checks if a valid operator for an action. references the 'supportedActions' within the closure    
          if (supportedActions.indexOf(this.action) === -1 ) {
                throw ("Can't calculate " + this.action);
            }
            return true;
        },
        // Writes to the console the calculation commited
        log: function() {
            if (console) {
                console.log(logMessages[this.action].replace('$1', this.num1).replace('$2', this.num2));                         
            }
            
            // this refers to the calculation at execution time - make chainable
            return this;
        },
        // checks if an operator was already inserted
        midCalculation: function(){
            
            // checks if its the default action
            if (this.action === supportedActions[0]){
                
                return false; // no operator was pressed
            }
            
            return true;
        },
        resetAction: function() {
            
            // sets to the default action
            this.action = supportedActions[0];
            
            // make chainable
            return this;
        }, 
        getResult: function () {
            
            // validates the action
            if (!this.validateAction()) throw 'Invalid action';  
            
            const firstNum = parseFloat(this.num1);
            const secondNum = parseFloat(this.num2);
            result = this[this.action](firstNum, secondNum);
            
            // negarive number or NaN return zero 0
            return ((result < 0) || (isNaN(result))) ? 0 : result;
        },
        // Display the calculation result on HTML selector
        HTMLCalc: function(selector) {
            
            if (!$) throw 'jQuery not loaded';  
            if (!selector) throw 'Missing jQuery selector'; // validation of the selector

            // prints the result to the screen
            $(selector).html(this.getResult());
               
            return this; // so this function will be chainable
        }
    };
    
    // Constractor function
    Calc.init = function( num1, num2, action ) {
          
        var self = this;
        self.num1 = num1 || 0;
        self.num2 = num2 || 0;
        self.action = action || supportedActions[0];
        
        self.validateAction();     
    }
    
    // don't need to use the 'new' keyword
    Calc.init.prototype = Calc.prototype;
    
    // Attach to the global object and provide shorthand '$C'
    global.Calc = global.C$ = Calc;

}(window, $));