//objetos de estado

//funciones que cambian los atributos de los objetos de estado

//funciones que manipulan el DOM

//funciones que manejan los eventos
//cuando la pagina este lista 
$(function(){
	loginStatus();
});

statusChangeCallback(response){
	alert();
}//statusChangeCallback
//funciones de facebook
function loginStatus(){
	FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
	});
}//loginStatus