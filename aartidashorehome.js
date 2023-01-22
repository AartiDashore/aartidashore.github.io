/*window.onscroll = function () {scrollFunction();};*/

function sendemail(){
var fname = document.getElementById('name').value;
console.log(fname);

var emailid = document.getElementById('email').value;
console.log(emailid);

var subjectentered = document.getElementById('subject').value;
console.log(subjectentered);

var messageentered = document.getElementById('message').value;
console.log(messageentered);

}


function scrollFunction() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

document.getElementById("navbar").style.background = "#501e27";
} else {

document.getElementById("navbar").style.background = "none";
}
}


/* Contact us form*/
(function($) {

	"use strict";


  // Form
	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					subject: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					subject: "Please enter your subject",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				
				submitHandler: function(form) {		
					var $submit = $('.submitting'),
						waitText = 'Submitting...';

					$.ajax({   	
				      type: "POST",
				      /*url: "php/sendEmail.php",*/
					  url: "php/aartidashorehomecontact.php",
				      data: $(form).serialize(),

				      beforeSend: function() { 
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
		               if (msg == 'OK') {
		               	$('#form-message-warning').hide();
				            setTimeout(function(){
		               		$('#contactForm').fadeOut();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();   
		               	}, 1400);

		               	// setTimeout(function(){
				              //  $('#form-message-success').fadeOut();   
		               	// }, 8000);

		               	setTimeout(function(){
				               $submit.css('display', 'none').text(waitText);  
		               	}, 1400);

		         //       	setTimeout(function(){
		         //       		$( '#contactForm' ).each(function(){
											//     this.reset();
											// });
		         //       	}, 1400);
			               
			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
				      	$('#form-message-warning').html("Something went wrong. Please try again.");
				         $('#form-message-warning').fadeIn();
				         $submit.css('display', 'none');
				      }
			      });    		
		  		} // end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);





/*(()=>{function n(t){for(var e=t+"=",s=document.cookie.split(";"),r=0;r<s.length;r++){for(var i=s[r];i.charAt(0)===" ";)i=i.substring(1);if(i.indexOf(e)===0)return i.substring(e.length,i.length)}return""}function o(t,e,s){var r=new Date;r.setTime(r.getTime()+s*24*60*60*1e3);var i="expires="+r.toUTCString();document.cookie=t+"="+e+";"+i+";path=/"}if(!n("sitevisitor")){let t=new Object,e=new Date(Date().toLocaleString("de-DE",{timeZone:"Europe/Sofia"}));t.referer=document.referrer,t.request=location.pathname.substring(1),t.time=e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes()+":"+("0"+e.getSeconds()).slice(-2),o("sitevisitor",btoa(JSON.stringify(t)),365)}document.addEventListener("DOMContentLoaded",()=>{"use strict";document.querySelectorAll(".preview-test").forEach(e=>{e.addEventListener("click",function(s){s.preventDefault(),document.querySelector(".preview-devices-active").classList.remove("preview-devices-active"),this.classList.add("preview-devices-active"),document.querySelector("#preview-frame").className=this.id.replace("-test","")})})});})();
*/