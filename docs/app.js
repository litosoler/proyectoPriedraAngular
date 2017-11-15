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
				'</div>' 

var panel2 =	'<div class="col-md-8 panel-2">' +
							'<div class="col-md-12">' +
							'<center>' +
							'<img id="img-log" src="img/loggin.png">' +
							'</center>' +
							'</div>' +
						'</div>' ;

var paneles = panel1 +panel2;

var contador = 0;
//funciones para escribir en el Dom




//funciones que manejan las acciones
$(function() {
	$("body").hide();
    // start up after 2sec no matter what
    setTimeout(function(){
    	$('body').removeClass("loading");
    	$("body").show(600);
    },100);
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
