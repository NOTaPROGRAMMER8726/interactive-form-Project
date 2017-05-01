//focus on first input when page loads
$("#name").focus();
//created a new <option> and disabled it so it forces users to choose a design before they can select a color
$("#color").prepend('<option id="choose_a_theme" selected>Select A Design Theme..').prop('disabled', 'disabled');
//hide color options until user selects design theme
$("#color option").hide()
//created a new <option> so that theres no "default" job role selected
$("#title").prepend('<option id="chooseJob" selected>Choose A Job Role..')
//<span> to later append total cost of activities
$(".activities").append('<span id="totalCost">')
//hide paypal and Bitcoin paragraph text till user selects one or the other
$("#credit-card, p:contains('PayPal'), p:contains('Bitcoin')").hide();
//created a span for the "activities", "shirt" and "payment" to show error text for when user doesnt complete form.
$(".activities legend").append("<br><span id='oneActivity'style='color:FireBrick'>")
$(".shirt legend").append('<br><span id="pickShirt"style="color:FireBrick">');
$("body legend:contains('Payment Info')").append('<br><span id="pickPayment"style="color:FireBrick">')
//hide "Select Payment Method" and "Select Theme" <option> once a user chooses a another option
$("option[value='select_method']").hide()
$("option:contains('Select Theme')").hide()
//varibles to later store users card number, zip, CVV number and email


var userCardNum;
var userZip;
var userCVV;
var userEmail;
//const containing value to later check if users email is valid
const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//function that creates a new input with a placeholder for when user chooses "other" under Job Role
$("#title").change(function(e) {
    if($(this).val() === "other"){
        $(this).after('<input id="other-title" type="text" name="other" placeholder="Your Job Role" >')
        $("#other-title").focus();
    } else{
        $("#other-title").remove()
    }
});

//function to validate user email as he types it.
$("#mail").on("keyup change blur paste cut click" , function() {
    userEmail = $(this).val();
//test() will test the userEmail value with the regex. "!" will check if it DOESN'T match which will make it "true"
    if(!regex.test(userEmail)) {
        $("label[for='mail']").html("Email: (email@address.com)")
    } else {
        $("label[for='mail']").html("Email:")
    }
})

//function adding and removing options and shirt colors depending on whats selected.
$("#design").change(function(e) {
//first make sure option under color is disabled until user chooses a color.
    $("#color").prepend('<option id="choose_a_theme" selected >Select A Design Theme..').prop('disabled', 'disabled')
//and hide that <option>
    $("#color option:contains(Select A Design Theme..)").hide()
//if user selects "Theme-JS Puns", it means he has choosen a theme so he can now choose a color.
        if ($(this).val() == "js puns") {
            $("#color").prop('disabled', false); //remove the disabled selector
            $("#choose_a_theme").text("Choose A Color..").hide() //change text to "choose a color" and hide it from list after user chooses a color
            $("#color option:contains(JS shirt only)").hide() //hide the shirt colors that DON'T belong
            $("#color option:contains(JS Puns shirt only)").show()//show shirt colors that DO belong.
//same as previous code, expect for I <3 JS options and colors.
        } else if ($(this).val() == "heart js") {
            $("#color").prop('disabled', false);
            $("#choose_a_theme").text("Choose A Color..").hide()
            $("#color option:contains(JS Puns shirt only)").hide()
            $("#color option:contains(JS shirt only)").show()
        }
});

//function to give a total cost of items checked and to disable events that have same time
$(".activities").change(function(e){
//varibles containing the values of how many check boxes checked and then adding them to a total
    let allCost = $("input:checked[type='checkbox'][name='all']").length * 200 //for activity that cost 200 (which is only one)
    let otherCost = $("input:checked[type='checkbox']:not([name='all'])").length * 100 //for all other activities that isnt the 200 (all the others are 100)
    let totalCost = (allCost + otherCost);// total cost stored in varible
//if js-frameworks activity is chosen, then the express activity is disabled and vice versa(due to conflict of time)
        if(e.target.name === "js-frameworks"){
            $("input[type='checkbox'][name='express']").attr("disabled","disabled");//disable the conflicting checkbox
            $("label:contains('Express Workshop')").css('color', 'grey');//change its color to grey
        } else if(e.target.name === "express"){
            $("input[type='checkbox'][name='js-frameworks']").attr("disabled","disabled");
            $("label:contains('JavaScript Frameworks')").css('color', 'grey');
        }
//if statements to remove the styles and disabled selector
                if(!$("input[type='checkbox'][name='js-frameworks']").is(":checked")){ //if checkbox ISN'T checked anymore.
                    $("input[type='checkbox'][name='express']").removeAttr('disabled'); //remove the "disabled" attr
                    $("label:contains('Express Workshop')").removeAttr('style') //remove the previously added styles
                }
                if (!$("input[type='checkbox'][name='express']").is(":checked")){
                    $("input[type='checkbox'][name='js-frameworks']").removeAttr('disabled');
                    $("label:contains('JavaScript Frameworks')").removeAttr('style');
                }
//code below does the same as above, expect with different checkboxes checked and unchecked
        if(e.target.name === "js-libs"){
            $("input[type='checkbox'][name='node']").attr("disabled","disabled");
            $("label:contains('Node.js Workshop')").css('color', 'grey');
        } else if(e.target.name === "node"){
            $("input[type='checkbox'][name='js-libs']").attr("disabled","disabled");
            $("label:contains('JavaScript Libraries Workshop')").css('color', 'grey');
        }
                if(!$("input[type='checkbox'][name='js-libs']").is(":checked")){
                    $("input[type='checkbox'][name='node']").removeAttr('disabled');
                    $("label:contains('Node.js Workshop')").removeAttr('style');
                }
                if (!$("input[type='checkbox'][name='node']").is(":checked")){
                    $("input[type='checkbox'][name='js-libs']").removeAttr('disabled');
                    $("label:contains('JavaScript Libraries Workshop')").removeAttr('style');
                }
//finally, add a <strong> text with the "Total:" cost.
$("#totalCost").html("<strong>Total: $" + totalCost).show()
//need to make sure that "Total:" text doesn't show when no boxes are checked.
        if ($(".activities :checked").length > 0){
            $("#totalCost").show();
        } else if ($(".activities :checked").length == 0) {
            $("#totalCost").hide();
        };
});

//function to show payment field accordinly.
$("#payment").change(function(e) {
    //first hide all payment field until user chooses one.
    //this would be more appropiate I believe, instead of having Credit on default without user selecting a method.
    $("#credit-card, p:contains('PayPal'), p:contains('Bitcoin')").hide();
    //if statements to see which payment field to show.
    if($("option[value='credit card']").is(":selected")){
        $("#credit-card").show()
        $("#exp-month").prepend('<option id="month" selected>Month')
        $("#exp-year").prepend('<option id="year" selected>Year')
    } else if($("option[value='paypal']").is(":selected")){
        $("p:contains('PayPal')").show()
    } else if($("option[value='bitcoin']").is(":selected")){
        $("p:contains('Bitcoin')").show()
    }
});

//function to check if all input fields are valid.
$("button[type='submit']").click(function(e) {
    //hide <span>s that were previously created for showing error message for
    //activity field, t-shirt field, payment field. i hide first so that when the user, clicks the "submit" again, it hides these text first
    //and then displays them depending on conditions.
    $("#oneActivity").hide();
    $("#pickShirt").hide();
    $("#pickPayment").hide();
    userEmail = $("#mail").val();//users email value
    userCardNum = $("#cc-num").val();//card number value
    userZip = $("#zip").val();//zip value
    userCVV = $("#cvv").val();//cvv value
//function to prevent "submit" default so that page doesnt refresh if user hasn't completed the form. and takes user back to top of page.
//added this function to all if's when user doesn't complete a field. this way it'll ONLY submit when user completes fields completely.
    const $fieldsMissing = () => {
        event.preventDefault()
        window.scrollTo(0,0);
    };

//below are a bunch of if statements. changing the styles and text depending on their conditons.
//theres is statements checking the length of the users card, zip and cvv values.

//check name entry
    if($("#name").val() === ""){
        $fieldsMissing()
        $("#name, label[for='name']").html("Name: (Please enter your name)").css({'border-color':'red','color':'FireBrick'});
    }else{
        $("#name, label[for='name']").removeAttr('style').html("Name:")
    }
//check email entry
    if ($("#mail").val() === "" || !regex.test(userEmail) ){
        $fieldsMissing()
        $("#mail, label[for='mail']").html("Email: (Please provide a valid email)").css({'border-color':'red','color':'FireBrick'});
    } else {
        $("#mail, label[for='mail']").removeAttr('style').html("Email:")
    }
//check "other" Job Role entry
    if($("#other-title").val() === ""){
        $fieldsMissing()
        $("#other-title, label[for='title']").css({'border-color':'red','color':'FireBrick'}).html("Job Role: (Please enter your job role)");
    } else if ($("#chooseJob").is(":selected")) {
        $fieldsMissing()
        $("label[for='title']").css({'border-color':'red','color':'FireBrick'}).html("Job Role: (Please choose a job role)")
    } else {
        $("#other-title, label[for='title']").removeAttr('style').html("Job Role:")
    }
//check if tshirt theme was slected.
    if($("#design").val() === "Select Theme"){
        $fieldsMissing()
        $("#design").css('border-color', 'red');
        $("#pickShirt").html("Please select a design theme").show();
    } else{
        $("#design").removeAttr('style')
    }
//check if tshirt color was selected after the theme
    if($("#color").val() === "Choose A Color..") {
        $fieldsMissing()
        $("#color").css('border-color', 'red');
        $("#pickShirt").html("Please select a shirt color").show();
    } else {
        $("#color").removeAttr('style')
    }
//check if at least one activity was checked
    if ($(".activities :checked").length === 0){
        $fieldsMissing()
        $("#oneActivity").html("Please select at least one activity").show();
    }
//check if user chose a payment method
    if($("option[value='select_method']").is(":selected")) {
        $fieldsMissing()
        $("#payment").css('border-color', 'red');
        $("#pickPayment").html("Please select a payment method").show();
    } else {
        $("#payment").removeAttr('style')
    }
//check if user entered a card number AND card number entered ONLY numbers OR if numbers entered are between 13 and 16 digits long
    if($("option[value='credit card']").is(":selected") && ($("#cc-num").val() === "" || isNaN(userCardNum) || userCardNum.length > 16 || userCardNum.length < 13 )){
        $fieldsMissing()
        $("#cc-num, label[for='cc-num']").css({'border-color':'red','color':'FireBrick'});
        $("#pickPayment").html("Your credit card information is Invalid").show()
    } else{
        $("#cc-num, label[for='cc-num']").removeAttr('style')
    }
//check if user entered a zip AND if zip entered ONLY numbers OR if zip entered is 5 digits long
    if($("option[value='credit card']").is(":selected") && ($("#zip").val() === "" || isNaN(userZip) || userZip.length !== 5 )) {
        $fieldsMissing()
        $("#zip,label[for='zip']").css({'border-color':'red','color':'FireBrick'});
        $("#pickPayment").html("Your credit card information is Invalid").show()
    } else {
        $("#zip, label[for='zip']").removeAttr('style')
    }
//checks if user entered a cvv number AND if cvv entered ONLY number OR if cvv entered is 3 digits long
    if($("option[value='credit card']").is(":selected") && ($("#cvv").val() === "" || isNaN(userCVV) || userCVV.length !== 3 ))  {
        $fieldsMissing()
        $("#cvv, label[for='cvv']").css({'border-color':'red','color':'FireBrick'});
        $("#pickPayment").html("Your credit card information is Invalid").show()
    } else {
        $("#cvv, label[for='cvv']").removeAttr('style')
    }
//check if user selected a month
    if($("option[value='credit card']").is(":selected") && $("#month").is(":selected")) {
        $fieldsMissing()
        $("#exp-month").css('border-color', 'red');
        $("label[for='exp-month']").html("Expiraton Date: (Please select a month)").css('color', 'FireBrick');
    } else {
        $("#exp-month, label[for='exp-month']").removeAttr('style')
        $("label[for='exp-month']").html("Expiraton Date:")
    }
//checks if user selected a year
    if($("option[value='credit card']").is(":selected") && $("#year").is(":selected")) {
        $fieldsMissing()
        $("#exp-year").css('border-color', 'red');
        $("label[for='exp-year']").html("Expiraton year: (Please select a year)").css('color', 'FireBrick');
    } else {
        $("#exp-year, label[for='exp-year']").removeAttr('style')
        $("label[for='exp-year']").html("Expiraton year:")
    }

});
