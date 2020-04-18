// Holds the calculator div that wraps the whole calculator
var calculator = document.querySelector('.calculator');
// gets the displayed div
var display = document.querySelector('.calc_display');
// gets all the keys in the calculator
var keys = calculator.querySelector('.calc_keys');

// sign if operator was already pressed
var afterOperator = false;

var Calc = C$();

// When clicking a button
keys.addEventListener('click', e => {

    // checks if the user clicked on a button
    if (e.target.matches('button')) {
     
        var key = e.target;
        var action = key.dataset.action;
        var keyContent = key.textContent;
        var displayedNum = display.textContent;
        
        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
        
        // checks if the user pressed on a number
        if(!action) {
            
            // if pressed first or after an operator
            if (displayedNum === '0' || afterOperator) {
                
                // displays the number entered by the user
                display.textContent = keyContent;
            }
            else {
                // cocatenates the number entered by the user
                display.textContent += keyContent;
            }    
            
            afterOperator = false;
        }
        else {            
                // the user pressed on the dot button
                if (action === 'decimal') {
            
                    // if not already decimal, adds the point
                    if (!display.textContent.includes('.')) {
                        display.textContent += '.'; 
                    }
                    // previous key typed was an operator
                    else if (afterOperator) {
                        display.textContent += '0.'; 
                    }
                    
                    afterOperator = false;
                } 
                // Clears back to zero - 0
                else if (action === 'clear') {
                    
                    display.textContent = '0';
                    
                    Calc.clear();
                    afterOperator = false;
                }
                else if (action === 'calculate') {
                   
                    // checks if needs to calculate
                    if (Calc.midCalculation()) {
                        Calc.num2 = displayedNum;
                        
                        // uses the calculation library to calculate and display result 
                        Calc.HTMLCalc(display).log(); // Chainable methods
                        displayedNum = display.textContent;
                    
                        // resets for new calculation
                        Calc.num1 = displayedNum;
                        Calc.num2 = 0;
                        Calc.resetAction();
                        
                        // equal is also an operator
                        afterOperator = true;
                    }
                }
                // Operator key
                else {
                   
                    // so the button will look pressed
                    key.classList.add('is-depressed')
                    
                    // checks if the user already pressed an operator
                    if (!afterOperator) {
                        
                        Calc.num2 = displayedNum;
                        
                        // checks if needs to calculate
                        if (Calc.midCalculation()) {
                            
                            Calc.HTMLCalc(display).log(); // Chainable methods
                            displayedNum = display.textContent;
                        }
                        
                        Calc.num1 = displayedNum;

                        // in the middle of a calculation
                        afterOperator = true;
                    }
                    // updates the new operator 
                    Calc.action = action;
                }
             }
    } // if btn
}) // End of event