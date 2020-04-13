;(function( global, $ ) {
   
    "use strict";
    
    // Create 'new' Calc object 
    var Calc = function(num1, num2, action) {    
        return new Calc.init( num1, num2, action );
    }
    
    // Hidden within the scope of the IIFE and never directly accessible
    var supportedActions = ['eq', 'add', 'sub'];
    
    // Basic calculations
    var calculations = {
        eq: function(){},
        add: function(){},
        sub: function(){}
    };
    
    // logger messages
    var logMessages = {
        eq: 'equal',
        add: 'plus',
        sub: 'minus'
    };
    
    // prototype holds methods
    Calc.prototype = {
        // ???
        add: function() {
            return this.num1 + this.num2;
        },
        // ???
        sub: function() {
            return this.num1 - this.num2;
        },
        validateAction: function() {
            
           // checks if a valid operator for an action. references the 'supportedActions' within the closure    
          if (supportedActions.indexOf(this.action) === -1 ) {
                throw ("Invalid action: " + this.action);
            }
        },
        log: function() {
            if (console) {
                console.log(logMessages[this.action] + ': ' );                         
            }
            
            // this refers to the calculation at execution time - make chainable
            return this;
        },
        setAction: function(newAction) {
            
            // sets the action
            this.action = newAction;
            this.validateAction();
            
            // make chainable
            return this;
        }, 
        HTMLCalc: function(selector) {
            if (!$) {
                throw 'jQuery not loaded';  
            }
            if (!selector) {
                throw 'Missing jQuery selector';  
            }
            
            var result;
            if (this.action === 'add'){
                result = this.add();
            }
            else {
                 result = this.sub();
            }
            
            // TO DO: validation of the selector
            $(selector).html(result);
            
            return this;
        }
    };
    
    // Constractor function
    Calc.init = function( num1, num2, action ) {
          
        var self = this;
        self.num1 = num1 || 0;
        self.num2 = num2 || 0;
        self.action = action || 'eq';
        
        self.validateAction();
           
    }
    
    // don't need to use the 'new' keyword
    Calc.init.prototype = Calc.prototype;
    
    // Attach to the global object and provide shorthand '$C'
    global.Calc = global.C$ = Calc;

}(window, $));