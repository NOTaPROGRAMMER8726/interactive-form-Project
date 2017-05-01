window.scrollTo(0,0);
$("#name").focus()
$("#color option").hide()
$("#color").prepend('<option id="choose_a_theme" selected>Select A Design Theme..').prop('disabled', 'disabled');
$("#title").prepend('<option id="chooseJob" selected>Choose A Job Role..')
$(".activities").append('<span id="totalCost">')
$("#credit-card, p:contains('PayPal'), p:contains('Bitcoin')").hide();
$(".activities legend").append("<br><span id='oneActivity'style='color:FireBrick'>")
$(".shirt legend").append('<br><span id="pickShirt"style="color:FireBrick">');
$("body legend:contains('Payment Info')").append('<br><span id="pickPayment"style="color:FireBrick">')
$("option[value='select_method']").hide()
$("option:contains('Select Theme')").hide()


var userCardNum;
var userZip;
var userCVV;
var userEmail;
const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

$("#title").change(function(e) {
    if($(this).val() === "other"){
        $(this).after('<input id="other-title" type="text" name="other" placeholder="Your Job Role" >')
        $("#other-title").focus();
    } else{
        $("#other-title").remove()
    }
});

$("#mail").on("keyup change blur paste cut click" , function() {
    userEmail = $(this).val();
    if(!regex.test(userEmail)) {
        $("label[for='mail']").html("Email: (email@address.com)")
    } else {
        $("label[for='mail']").html("Email:")
    }
})

$("#design").change(function(e) {
    $("#color").prepend('<option id="choose_a_theme" selected >Select A Design Theme..').prop('disabled', 'disabled')
    $("#color option:contains(Select A Design Theme..)").hide()
        if ($(this).val() == "js puns") {
            $("#color").prop('disabled', false);
            $("#choose_a_theme").text("Choose A Color..").hide()
            $("#color option:contains(JS shirt only)").hide()
            $("#color option:contains(JS Puns shirt only)").show()
        } else if ($(this).val() == "heart js") {
            $("#color").prop('disabled', false);
            $("#choose_a_theme").text("Choose A Color..").hide()
            $("#color option:contains(JS Puns shirt only)").hide()
            $("#color option:contains(JS shirt only)").show()
        }
});


$(".activities").change(function(e){
    let allCost = $("input:checked[type='checkbox'][name='all']").length * 200
    let otherCost = $("input:checked[type='checkbox']:not([name='all'])").length * 100
    let totalCost = (allCost + otherCost);
        if(e.target.name === "js-frameworks"){
            $("input[type='checkbox'][name='express']").attr("disabled","disabled");
            $("label:contains('Express Workshop')").css('color', 'grey');
        } else if(e.target.name === "express"){
            $("input[type='checkbox'][name='js-frameworks']").attr("disabled","disabled");
            $("label:contains('JavaScript Frameworks')").css('color', 'grey');
        }
                if(!$("input[type='checkbox'][name='js-frameworks']").is(":checked")){
                    $("input[type='checkbox'][name='express']").removeAttr('disabled');
                    $("label:contains('Express Workshop')").removeAttr('style');
                }
                if (!$("input[type='checkbox'][name='express']").is(":checked")){
                    $("input[type='checkbox'][name='js-frameworks']").removeAttr('disabled');
                    $("label:contains('JavaScript Frameworks')").removeAttr('style');
                }

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

$("#totalCost").html("<strong>Total: $" + totalCost).show()
        if ($(".activities :checked").length > 0){
            $("#totalCost").show();
        } else if ($(".activities :checked").length == 0) {
            $("#totalCost").hide();
        };
});


$("#payment").change(function(e) {
    $("#credit-card, p:contains('PayPal'), p:contains('Bitcoin')").hide();
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


$("button[type='submit']").click(function(e) {
    $("#oneActivity").hide();
    $("#pickShirt").hide();
    $("#pickPayment").hide();
    userEmail = $("#mail").val();
    userCardNum = $("#cc-num").val();
    userZip = $("#zip").val();
    userCVV = $("#cvv").val();

    const $fieldsMissing = () => {
        event.preventDefault()
        window.scrollTo(0,0);
    };

    if($("#name").val() === "") {
        $fieldsMissing()
        $("#name, label[for='name']").html("Name: (Please enter your name)").css({'border-color':'red','color':'FireBrick'});
    }else{
        $("#name, label[for='name']").removeAttr('style').html("Name:")
    }
    if ($("#mail").val() === "" || !regex.test(userEmail) ) {
        $fieldsMissing()
        $("#mail, label[for='mail']").html("Email: (Please provide a valid email)").css({'border-color':'red','color':'FireBrick'});
    } else {
        $("#mail, label[for='mail']").removeAttr('style').html("Email:")
    }


    if($("#other-title").val() === "") {
        $fieldsMissing()
        $("#other-title, label[for='title']").css({'border-color':'red','color':'FireBrick'}).html("Job Role: (Please enter your job role)");
    } else if ($("#chooseJob").is(":selected")) {
        e.preventDefault();
        $("label[for='title']").css({'border-color':'red','color':'FireBrick'}).html("Job Role: (Please choose a job role)");
    } else {
        $("#other-title, label[for='title']").removeAttr('style').html("Job Role:")
    }



    if($("#design").val() === "Select Theme") {
        $fieldsMissing()
        $("#design").css('border-color', 'red');
        $("#pickShirt").html("Please select a design theme").show();
    } else{
        $("#design").removeAttr('style')
    }
    if($("#color").val() === "Choose A Color..") {
        $fieldsMissing()
        $("#color").css('border-color', 'red');
        $("#pickShirt").html("Please select a shirt color").show();
    } else {
        $("#color").removeAttr('style')
    }


    if ($(".activities :checked").length === 0){
        $fieldsMissing()
        $("#oneActivity").html("Please select at least one activity").show();
    }


    if($("option[value='select_method']").is(":selected")) {
        $fieldsMissing()
        $("#payment").css('border-color', 'red');
        $("#pickPayment").html("Please select a payment method").show();
    } else {
        $("#payment").removeAttr('style')
    }
    if($("option[value='credit card']").is(":selected") && ($("#cc-num").val() === "" || isNaN(userCardNum) || userCardNum.length > 16 || userCardNum.length < 13 )) {
        $fieldsMissing()
        $("#cc-num, label[for='cc-num']").css({'border-color':'red','color':'FireBrick'});
        $("#pickPayment").html("Your credit card information is Invalid").show()
    } else{
        $("#cc-num, label[for='cc-num']").removeAttr('style')
    }
    if($("option[value='credit card']").is(":selected") && ($("#zip").val() === "" || isNaN(userZip) || userZip.length !== 5 )) {
        $fieldsMissing()
        $("#zip,label[for='zip']").css({'border-color':'red','color':'FireBrick'});
        $("#pickPayment").html("Your credit card information is Invalid").show()
    } else {
        $("#zip, label[for='zip']").removeAttr('style')
    }
    if($("option[value='credit card']").is(":selected") && ($("#cvv").val() === "" || isNaN(userCVV) || userCVV.length !== 3 )) {
        $fieldsMissing()
        $("#cvv, label[for='cvv']").css({'border-color':'red','color':'FireBrick'});
        $("#pickPayment").html("Your credit card information is Invalid").show()
    } else {
        $("#cvv, label[for='cvv']").removeAttr('style')
    }
    if($("option[value='credit card']").is(":selected") && $("#month").is(":selected")) {
        $fieldsMissing()
        $("#exp-month").css('border-color', 'red').focus();
        $("label[for='exp-month']").html("Expiraton Date: (Please select a month)").css('color', 'FireBrick');
    } else {
        $("#exp-month, label[for='exp-month']").removeAttr('style')
        $("label[for='exp-month']").html("Expiraton Date:")
    }
    if($("option[value='credit card']").is(":selected") && $("#year").is(":selected")) {
        $fieldsMissing()
        $("#exp-year").css('border-color', 'red').focus();
        $("label[for='exp-year']").html("Expiraton year: (Please select a year)").css('color', 'FireBrick');
    } else {
        $("#exp-year, label[for='exp-year']").removeAttr('style')
        $("label[for='exp-year']").html("Expiraton year:")
    }

});
