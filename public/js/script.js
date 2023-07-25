


;(function ($) {

	'use strict';


	$('.portfolio-single-slider').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000

	});

	$('.clients-logo').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000
	});

	$('.testimonial-wrap').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		infinite: true,
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 6000,
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3,
		        infinite: true,
		        dots: true
		      }
		    },
		    {
		      breakpoint: 900,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },{
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  
  		]
	});


   $('.portfolio-gallery').each(function () {
        $(this).find('.popup-gallery').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });


	var map;

	function initialize() {
		var mapOptions = {
			zoom: 13,
			center: new google.maps.LatLng(50.97797382271958, -114.107718560791)
			// styles: style_array_here
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}

	var google_map_canvas = $('#map-canvas');

	if (google_map_canvas.length) {
		google.maps.event.addDomListener(window, 'load', initialize);
	}

	// Counter

	$('.counter-stat').counterUp({
	      delay: 10,
	      time: 1000
	  });

	

})(jQuery);


const body = document.querySelector("body"),
modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");


let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});



// ACTIVE LINKS

const navLinks = document.querySelectorAll('.nav-link');
const windowPathname = window.location.pathname;

navLinks.forEach(navLink => {
  const navLinkPathname = new URL(navLink.href).pathname;

  if (windowPathname === navLinkPathname) {
    navLink.classList.add('active')
  }
})


//  STUDENTS LIST

let i = 0
function slc_list() {
  let checks = document.querySelectorAll(".l-check");
  if(i == 0){
    checks.forEach(check =>{
      check.style.display = "table-cell"
    });
    i = 1;
  }else{
    checks.forEach(check =>{
      check.style.display = "none"
    });
    i = 0;
  }
  
 }

// FORM VALIDATION

var email = 0;
var name = 0;
var age = 0;
var phone = 0;
var photo = 0;
var password = 0;

var form = document.getElementById('example');

function validate_name() {
    let inputName = form.inputName.value;
    let nameValidationMsg = document.getElementById('nameValidationMsg');

    if(inputName){
        if (/^[A-Za-z\s]*$/.test(inputName)){
            nameValidationMsg.textContent = "Valid Name";
            nameValidationMsg.classList.remove('text-danger');
            nameValidationMsg.classList.add('text-success');
        }else{
            nameValidationMsg.textContent = "Invalid Name";
            nameValidationMsg.classList.add('text-danger');
            nameValidationMsg.classList.remove('text-success');
        }
    }else{
        nameValidationMsg.textContent = "Name cannot empty";
    }
}

function validate_email() {
    let inputEmail = form.inputEmail.value;
    let emailValidationMsg = document.getElementById('emailValidationMsg');

    if(inputEmail){
        if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail)){

            emailValidationMsg.textContent = "Valid Email";
            emailValidationMsg.classList.remove('text-danger');
            emailValidationMsg.classList.add('text-success');

        }else{
            
            emailValidationMsg.textContent = "Invalid Email";

            emailValidationMsg.classList.add('text-danger');
            emailValidationMsg.classList.remove('text-success');
        }
    }else{
        emailValidationMsg.textContent = "Email cannot empty";
    }
}


function validateAge() {
    let inputAge = form.inputAge.value;
    let ageValidationMsg = document.getElementById('ageValidationMsg');

    if(inputAge){
        if (inputAge >=18){

            ageValidationMsg.textContent = "Valid Age";
            ageValidationMsg.classList.remove('text-danger');
            ageValidationMsg.classList.add('text-success');

            age = 1;

        }else{
            ageValidationMsg.textContent = "You are not eligible";

            ageValidationMsg.classList.add('text-danger');
            ageValidationMsg.classList.remove('text-success');

            age = 0;
        }
    }else{
        ageValidationMsg.textContent = "Age cannot empty";
        ageValidationMsg.classList.add('text-danger');
        ageValidationMsg.classList.remove('text-success');

        age = 0;
    }
}

function validateImage() {
    let image = form.photo.files[0];
    let fileValidationMsg = document.getElementById('fileValidationMsg');

    if(image){
        if (image.type == 'image/jpeg'){

            fileValidationMsg.textContent = "Valid File";
            fileValidationMsg.classList.remove('text-danger');
            fileValidationMsg.classList.add('text-success');

            photo = 1;

        }else{
            fileValidationMsg.textContent = "Invalid Image Format";
            fileValidationMsg.classList.remove('text-success');
            fileValidationMsg.classList.add('text-danger');

            photo = 0;
        }
    }else{

    }
}

function validate_phone() {
    let inputPhone = form.inputPhone.value;
    let phoneValidationMsg = document.getElementById('phoneValidationMsg');

    if(inputPhone){
        if (/^[0-9]{10}$/.test(inputPhone) && inputPhone.length <= 10){

            phoneValidationMsg.textContent = "Valid Phone";
            phoneValidationMsg.classList.remove('text-danger');
            phoneValidationMsg.classList.add('text-success');

        }else{
            phoneValidationMsg.textContent = "Invalid Phone no.";

            phoneValidationMsg.classList.add('text-danger');
            phoneValidationMsg.classList.remove('text-success');
        }
    }else{
        phoneValidationMsg.textContent = "Phone cannot empty";
        phoneValidationMsg.classList.add('text-danger');
        phoneValidationMsg.classList.remove('text-success');
    }
}

function validate_pass() {
  let inputPassword = form.inputPassword.value;
    let passwordValidationMsg = document.getElementById('passwordValidationMsg');

    if(inputPassword){
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(inputPassword)){

            passwordValidationMsg.textContent = "Valid Password";
            passwordValidationMsg.classList.remove('text-danger');
            passwordValidationMsg.classList.add('text-success');

        }else{
            passwordValidationMsg.textContent = "Invalid Password";

            passwordValidationMsg.classList.add('text-danger');
            passwordValidationMsg.classList.remove('text-success');
        }
    }else{
        phoneValidationMsg.textContent = "Password cannot empty";
    }
}


function check_form(){
  small = document.getElementsByTagName('small')
  inputs = document.getElementsByTagName('input')
  for(let a = 0;a <= small.length;a++) {
    if(small[a].textContent.match('Invalid')|| small[a].textContent.match('cannot')){
      alert("Please enter valid values in the inputs")
      return false;
    }
  };
  for(let x = 0; x <= inputs.length; x++){
    if(inputs[x].value == ""){
      alert("Fill all input fields")
    }
  }
  
}




function checkUsername(data){
  $( document ).ready(function(){

    $.ajax({
      url: '/register/checkUsername',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({user_name:data}),
      success: function(new_data) {
        if(new_data == 'available'){
            alert("hey")
            //By Default the messages are hidden!
            document.getElementsByClassName('user-name-taken')[0].style.display = 'none'
            document.getElementsByClassName('user-name-available')[0].style.display = 'block'
          } else  {
            alert("hey")
            document.getElementsByClassName('user-name-available')[0].style.display = 'none'
              document.getElementsByClassName('user-name-taken')[0].style.display = 'block'
          }
      }
  })

  })
  
}