// gets a new object
var c = C$(1, 2, 'add');

console.log(c.add());

// when clicking the button
$('#btn').click(function() {
    var Calculation = C$(3, 4);
   
    // hides the menu from the screen
    $('#menudiv').hide();

// chainable methods
Calculation.setAction($('#action').val()).HTMLCalc('#Start').log();
    
    // to see the calculation object in the console
    console.log(Calculation);
});