(function(app) {
	app.SidebarComponent =
		ng.core.Component({
		selector: 'sidebar',
		templateUrl: 'views/sidebar-v4.html'
		})
	.Class({
		constructor: [ng.router.ActivatedRoute,ng.router.Router,app.AppCallService,
			function(active,router,ser) {
				this.active=this.active;
				this.router=router;
				this.ser=ser;
			}
		]
	});
	app.SidebarComponent.prototype.ngOnInit=function(){
		this.class_navbar="mobile-offcanvas navbar navbar-expand-lg  bg-navbar card-2";
		this.class_body="offcanvas-header-none";
		if(this.ser.getAccessToken()!=null){
			this.email="usuario";
		}
		this.listMenu=[
			{value:"RESERVAR", name:"RESERVA TU VIAJE",image:"assets/images/home_white.svg"},
			{value:"RUTAS", name:"Destinos"},
			{value:"LINEAS", name:"Lineas"},
			{value:"SERVICIOS", name:"Servicios"},
			{value:"TERMINOS", name:"Terminos y condiciones"},
			{value:"QUIENES", name:"Quienes somos"},
			{value:"MANUALES", name:"Manuales"},
			{value:"CONTACTO", name:"Contacto"}

		];
		var x = window.matchMedia("(max-width: 991px)");
		try{
			if(x.matches==false){
				this.darken_screen(false);
				this.class_navbar="mobile-offcanvas navbar navbar-expand-lg card-2  bg-navbar";
				this.class_body="offcanvas-header-none";
			}
		}catch(er){
		}
	}
	app.SidebarComponent.prototype.ngOnChanges=function(){
		var x = window.matchMedia("(max-width: 991px)");
		try{
			if(x.matches==false){
				this.darken_screen(false);
				this.class_navbar="mobile-offcanvas navbar navbar-expand-lg card-2  bg-navbar";
				this.class_body="offcanvas-header-none";
			}
		}catch(er){
		}
		if(this.ser.getAccessToken()!=null){
			this.email="usuario";
		}
	}
	app.SidebarComponent.prototype.openModal=function(){
	}
	app.SidebarComponent.prototype.getRedirect=function(item){
		if(!(item==null || item==undefined || item=="")){
			this.darken_screen(false);
			this.class_navbar="mobile-offcanvas navbar navbar-expand-lg card-2  bg-navbar";
			this.class_body="offcanvas-header-none";
			switch(item.value){
				case "RESERVAR":{
					this.router.navigate(['/init']);
				}break;
				case "RUTAS":{
					this.router.navigate(['/rutas']);
				}break;
				case "LINEAS":{
					this.router.navigate(['/lineas']);
				}break;
				case "SERVICIOS":{
					this.router.navigate(['/servicios']);
				}break;
				case "QUIENES":{
					this.router.navigate(['/aboutus']);
				}break;
				case "TERMINOS":{
					this.router.navigate(['/terminos']);
				}break;
				case "CONTACTO":{
					this.router.navigate(['/contact']);
				}break;
				case "MANUALES":{
					this.router.navigate(['/manuales']);
				}
			}
		}
	}
	app.SidebarComponent.prototype.showCanvas=function(){
		if(this.class_body=="offcanvas-header-none"){
			this.darken_screen(true);
			this.class_navbar="mobile-offcanvas navbar navbar-expand-lg card-2 show";
			this.class_body='offcanvas-active'
		}else{
			this.darken_screen(false);
			this.class_navbar="mobile-offcanvas navbar navbar-expand-lg card-2  bg-navbar";
			this.class_body="offcanvas-header-none";
		}
	}	
	app.SidebarComponent.prototype.closeCanvas=function(){
		
	}	
	app.SidebarComponent.prototype.darken_screen=function(yesno){
		if( yesno == true ){
			document.querySelector('.screen-darken').classList.add('active');
		}
		else if(yesno == false){
			document.querySelector('.screen-darken').classList.remove('active');
		}
	}
	app.SidebarComponent.prototype.salir=function(){
		let mensajeAll="Error al cerrar sesion";
		let request=this.ser.callServicesHttp('logout',null,null);
		request.subscribe(data=>{
			if(!(data==null || data==undefined || data=="")){
				if(data.status_http!=200){
					this.mensaje=this.ser.processMessageError(data,mensajeAll)
				}
			}
			doLogout();
			this.router.navigate(['/login']);
		},err=>{
			this.mensaje=this.ser.processError(err,mensajeAll);
			doLogout();
			this.router.navigate(['/login']);
		});
	}
})(window.app || (window.app = {}));