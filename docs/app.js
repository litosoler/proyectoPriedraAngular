//codigo html a usar
var estado = {fb:false};
var panel1 =    '<div class="offset-md-4 col-md-4 panel-1"> '+
					'<div class="col-md-12">' +
						'<center>' +
							'<img id="user-foto" src="img/usuario.png">' +
							 '<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" ' +
							'data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" onlogin="checkLoginState()"></div>'  +
						'</center>' +
					'</div>' +
				'</div>' ;

var panel2 ='<div class="col-md-8 panel-2">' + 
				'<div class="opp">' + 
					'<div class="col-md-12 "><center><span>Bienvenido <span class="js-userName">Nombre Usuario!!!</span></span></center></div>' + 
					'<div class="row ">' + 
						'<div class="col-md-6 ">' + 
							'<ul>' + 
								'<li>Nombre: <span class="js-userFullName">Nombre Usuario</span></li>' + 
								'<li>Genero: <span id="js-userGender">Nombre Usuario</span></li>' + 
								'<li>Edad:  <span id="js-userAge">Nombre Usuario</span></li>' + 
							'</ul>' + 
						'</div>' + 
						'<div class="col-md-6  ">' + 
							'<ul>' + 
								'<li>Email:  <span id="js-userEmail">Nombre Usuario</span></li>' + 
								'<li>Time Zone:  <span id="js-timeZone">Nombre Usuario</span></li>' + 
								'<li>Verified:  <span id="js-verified">Nombre Usuario</span></li>' + 
							'</ul>' + 
						'</div>' + 
					'</div>' + 
				'</div>' + 
			'</div>' ;



var paneles = panel1 +panel2;

var contador = 0;
//funciones para escribir en el Dom
function mostrarInfoBasica(response, picture){
 	$("#user-foto").attr("src", picture);
 	$(".js-userName").html(response.first_name + "!!!");
 	$(".js-userFullName").html(response.name);
 	$("#js-userGender").html(response.gender);
 	$("#js-userAge").html("+"+response.age_range.min);
 	$("#js-userEmail").html(response.email);
 	$("#js-timeZone").html(response.timezone);
 	$("#js-verified").html(response.verified);
}


//funciones que manejan las acciones
$(function() {
	$("body").hide();
    // start up after 2sec no matter what
    setTimeout(function(){
    	$('body').removeClass("loading");
    	$("body").show(600);
    },1000);
    manejarClick();
    $("#parte-dos").html($(paneles));
    $("#parte-dos").hide();

});

function manejarClick(){

	$(".btn-group").on("click", ".js-scroll", function(){
		FB.getLoginStatus(function(response) {
    	statusChangeCallback(response);
  		});
  	});
}

function sesionInactiva(){
	$("#parte-dos").hide();
	$(".panel-2").hide();
	$(".panel-1").addClass("offset-md-4");
    $("#parte-dos").show(600);
    	$('html,body').animate({
    		scrollTop: $("#parte-dos").offset().top
   		},1000);
}

function sesionInactiva2(){
	console.log(estado.fb);
	console.log(contador);
	if (estado.fb === true){
		++contador;
		console.log(contador);
	}
	if (++contador % 2 == 0 && estado.fb === true){ 
	$("#parte-dos").hide();
	$(".panel-2").hide();
	$(".panel-1").addClass("offset-md-4");
    $("#parte-dos").show(600);
    	$('html,body').animate({
    		scrollTop: $("#parte-dos").offset().top
   		},1000);
   	estado.fb = false;
}
}

function sesionActiva(){
	estado.fb = true;
   	obtenerInfo();
	$("#parte-dos").hide();
	$(".panel-2").show();
	$(".panel-1").removeClass("offset-md-4");

	 $("#parte-dos").show(600);
    	$('html,body').animate({
    		scrollTop: $("#parte-dos").offset().top
   		},1000);

}

function sesionActiva2(){
	console.log(contador);
	console.log(estado.fb);

	if (++contador % 2 == 0){ 
   	obtenerInfo();
	$("#parte-dos").hide();
	$(".panel-2").show();
	$(".panel-1").removeClass("offset-md-4");

	 $("#parte-dos").show(600);
    	$('html,body').animate({
    		scrollTop: $("#parte-dos").offset().top
   		},1000);
   	estado.fb = true;

    }
}

function obtenerInfo(){
  FB.api(
  '/me',
  'GET',
  {"fields":"cover, first_name ,name,age_range,link,gender,locale,timezone,updated_time,verified,email"},
  function(response) {
	var userFoto = "http://graph.facebook.com/"+response.id+"/picture?type=large";
	mostrarInfoBasica(response, userFoto);
});
}
