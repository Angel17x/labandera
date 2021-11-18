var tiempo=null;
var n=0;
var timeout;
(function(app) {
	app.TripStatusComponent =
		ng.core.Component({
		selector: 'trip-status-component',
		templateUrl: 'views/trip-status_v4.html',
		styleUrls : [ 'styles/trip-status.css' ]
	})
		.Class({
		  constructor: [app.AppCallService,ng.router.Router,ng.router.ActivatedRoute,app.LoadingServiceComponent,app.MsgComponent,
		  function(appService,router,active,loading,msg) {
	          app.TripStatusComponent.prototype.router=router;
	          app.TripStatusComponent.prototype.active=active;
	          app.TripStatusComponent.prototype.loading=loading;
	          app.TripStatusComponent.prototype.service=appService;
	          app.TripStatusComponent.prototype.mensaje=null;
			  app.TripStatusComponent.prototype.msg=msg;
		  }]
		});
	app.TripStatusComponent.prototype.ngOnInit=function(){
		app.TripStatusComponent.prototype.pagingActualViaje={};
		app.TripStatusComponent.prototype.totalPageViaje=1;
		app.TripStatusComponent.prototype.detallePorPaginaViaje=5;
		app.TripStatusComponent.prototype.pageSelectedViaje=1;
		app.TripStatusComponent.prototype.querys=null;
		app.TripStatusComponent.prototype.hastaFinal=false;
		app.TripStatusComponent.prototype.hastaInicio=false;
		app.TripStatusComponent.prototype.listRegister=[];
		app.TripStatusComponent.prototype.timeout=null;
		app.TripStatusComponent.prototype.tasaCambio=null;
		app.TripStatusComponent.prototype.tasaCambio=app.TripStatusComponent.prototype.service.getCurrencies();
		app.TripStatusComponent.prototype.buscar();
		app.TripStatusComponent.prototype.tiempo = setInterval(() => {
			app.TripStatusComponent.prototype.buscar();
			app.TripStatusComponent.prototype.conecctionStatus=window.navigator.onLine;
		 }, 7000);
	}
	
	app.TripStatusComponent.prototype.getCantidadSelected=function(data){
		if (!(data == null || data == undefined || data == "")) {
			app.TripStatusComponent.prototype.detallePorPaginaViaje = data.detalles;
			app.TripStatusComponent.prototype.totalPageViaje = data.pagina;
			if (app.TripStatusComponent.prototype.listRegister == null || app.TripStatusComponent.prototype.listRegister == undefined || app.TripStatusComponent.prototype.listRegister.length == 0) {
				app.TripStatusComponent.prototype.mensaje = capitalizeOnly(_("message_dflt_4"));
			} else {
				app.TripStatusComponent.prototype.callServices(1, '&limit=' + app.TripStatusComponent.prototype.detallePorPaginaViaje);
			}
		}
	}
	app.TripStatusComponent.prototype.getValueFirst=function(data){
		app.TripStatusComponent.prototype.listRegister = [];
		if (app.TripStatusComponent.prototype.pagingActualViaje.hasOwnProperty('first_page')) {
			if (!(app.TripStatusComponent.prototype.pagingActualViaje.first_page == null || app.TripStatusComponent.prototype.pagingActualViaje.first_page == undefined || app.TripStatusComponent.prototype.pagingActualViaje.first_page == "")) {
				app.TripStatusComponent.prototype.callServices(data, app.TripStatusComponent.prototype.pagingActualViaje.first_page);
			}
		}
	}
	app.TripStatusComponent.prototype.getValuePrevious=function(data){
		app.TripStatusComponent.prototype.listRegister = [];
		if (app.TripStatusComponent.prototype.pagingActualViaje.hasOwnProperty('previous_page')) {
			if (!(app.TripStatusComponent.prototype.pagingActualViaje.previous_page == null || app.TripStatusComponent.prototype.pagingActualViaje.previous_page == undefined || app.TripStatusComponent.prototype.pagingActualViaje.previous_page == "")) {
				app.TripStatusComponent.prototype.callServices(data, app.TripStatusComponent.prototype.pagingActualViaje.previous_page);
			}
		}
	}
	app.TripStatusComponent.prototype.getValueLast=function(data){
		app.TripStatusComponent.prototype.listRegister = [];
		
		if (app.TripStatusComponent.prototype.pagingActualViaje.hasOwnProperty('last_page')) {
			if (!(app.TripStatusComponent.prototype.pagingActualViaje.last_page == null || app.TripStatusComponent.prototype.pagingActualViaje.last_page == undefined || app.TripStatusComponent.prototype.pagingActualViaje.last_page == "")) {
				app.TripStatusComponent.prototype.callServices(data, app.TripStatusComponent.prototype.pagingActualViaje.last_page);
			}
		}
	}
	//obtener valor siguiente al darle click a next
	app.TripStatusComponent.prototype.getValueNext=function(data){
		app.TripStatusComponent.prototype.listRegister = [];
		if (app.TripStatusComponent.prototype.pagingActualViaje.hasOwnProperty('next_page')){
			
			if (!(app.TripStatusComponent.prototype.pagingActualViaje.next_page == null || app.TripStatusComponent.prototype.pagingActualViaje.next_page == undefined || app.TripStatusComponent.prototype.pagingActualViaje.next_page == "")) {
				app.TripStatusComponent.prototype.callServices(data, app.TripStatusComponent.prototype.pagingActualViaje.next_page);
			}
		}
	}
	app.TripStatusComponent.prototype.getValueChangeRecords=function(data){
		app.TripStatusComponent.prototype.pageSelectedViaje = data;
	}
	app.TripStatusComponent.prototype.ngOnDestroy=function(){

		if (app.TripStatusComponent.prototype.tiempo) {
			clearInterval(app.TripStatusComponent.prototype.tiempo);
		}
	}
	app.TripStatusComponent.prototype.buscar=function(){
		app.TripStatusComponent.prototype.jsonFilterBuscar={};
		app.TripStatusComponent.prototype.jsonFilterBuscar.status=["PUBLISHED"];
		var newDate=new Date();
		var dia = newDate.getDate();
		if (dia < 10) {
			dia = "0" + newDate.getDate();
		}
		var mes=newDate.getMonth() + 1;
		if (mes < 10) {
			mes = "0" + mes;
		}
		var fecha=newDate.getFullYear()+"-"+mes+"-"+dia;
		app.TripStatusComponent.prototype.jsonFilterBuscar.departure_date={};
		app.TripStatusComponent.prototype.jsonFilterBuscar.departure_date.lte=fecha+"T23:59:59.000Z";
		app.TripStatusComponent.prototype.jsonFilterBuscar.departure_date.gte=fecha+"T00:00:00.000Z";
		app.TripStatusComponent.prototype.jsonFilterBuscar.departure_date.time_zone=getTimeZone();
		app.TripStatusComponent.prototype.jsonFilterBuscar.sort={"DEPARTURE_DATE":"asc"};
		if(app.TripStatusComponent.prototype.querys==null){
			app.TripStatusComponent.prototype.callServices(1,"&limit="+app.TripStatusComponent.prototype.detallePorPaginaViaje);
		}else{
			if(app.TripStatusComponent.prototype.pagingActualViaje!=null){
				if((app.TripStatusComponent.prototype.pagingActualViaje.next_page==null || app.TripStatusComponent.prototype.pagingActualViaje.next_page==undefined)&& (app.TripStatusComponent.prototype.pagingActualViaje.previous_page==null || app.TripStatusComponent.prototype.pagingActualViaje.previous_page==undefined)) {
					app.TripStatusComponent.prototype.callServices(null,"&limit="+app.TripStatusComponent.prototype.detallePorPaginaViaje);
				}

				let paginaActual = app.TripStatusComponent.prototype.pageSelectedViaje
				//let cantidadTotalItems = app.TripStatusComponent.prototype.pagingActualViaje.count
				//let maxCantidadDeItems = app.TripStatusComponent.prototype.detallePorPaginaViaje
				let cantidadTotalPaginas = app.TripStatusComponent.prototype.totalPageViaje
				
				let modifyValuePage = (page, total) => {
					if(page < total){
						return page+=1
					}
					page=1
					return page
				}
				
				if(app.TripStatusComponent.prototype.hastaFinal==true){
					if(app.TripStatusComponent.prototype.pagingActualViaje.hasOwnProperty("next_page")){
						app.TripStatusComponent.prototype.listRegister = []
						app.TripStatusComponent.prototype.callServices(modifyValuePage(paginaActual, cantidadTotalPaginas),app.TripStatusComponent.prototype.pagingActualViaje.next_page);
					}
				}else{
					if(app.TripStatusComponent.prototype.hastaInicio==true){
						if(app.TripStatusComponent.prototype.pagingActualViaje.hasOwnProperty("first_page")){
							app.TripStatusComponent.prototype.listRegister = []
							app.TripStatusComponent.prototype.callServices(modifyValuePage(paginaActual, cantidadTotalPaginas), app.TripStatusComponent.prototype.pagingActualViaje.first_page);
						}	
					}else{
						if(app.TripStatusComponent.prototype.pagingActualViaje.hasOwnProperty("previous_page")){
							app.TripStatusComponent.prototype.listRegister = []
							app.TripStatusComponent.prototype.callServices(modifyValuePage(paginaActual, cantidadTotalPaginas),app.TripStatusComponent.prototype.pagingActualViaje.previous_page);
							
						}
					}
				}
				
			}
		}
	}
	app.TripStatusComponent.prototype.callServices = function (data,parametros) {
		
		
		if(data!=null){
			app.TripStatusComponent.prototype.pageSelectedViaje = data;
		}
		let mensajeAll=_("message_dflt_4");
		if(parametros!=null && parametros.length!=0){
			if(parametros.charAt(0)!="&"){
				parametros="&"+parametros;
			}
		}
		let querys="&type=PAGINATE"+parametros;
		let request = app.TripStatusComponent.prototype.service.callServicesHttp("travel-report-available", querys, app.TripStatusComponent.prototype.jsonFilterBuscar);
		request.subscribe(data => {
			
			app.TripStatusComponent.prototype.procesarRespuestaTravel(data);
		}, err => {
			app.TripStatusComponent.prototype.mensaje = app.TripStatusComponent.prototype.service.processError(err, mensajeAll);
			//app.TripStatusComponent.prototype.msg.error();
		});
	}
	app.TripStatusComponent.prototype.procesarRespuestaTravel=function(data){
		var key="results";
		let mensajeAll=capitalizeOnly(_("message_dflt_4"));
		if(data==null || data==undefined || data==""){
			
			app.TripStatusComponent.prototype.listRegister=[];
			app.TripStatusComponent.prototype.mensaje=mensajeAll;
			app.TripStatusComponent.prototype.msg.error();
		}else{
			if(data.status_http==200){
				if(data.hasOwnProperty("count")){
					if(data.count==null || data.count==undefined || data.count==0){
						app.TripStatusComponent.prototype.listRegister=[];
						app.TripStatusComponent.prototype.mensaje="No hay viajes para la fecha seleccionada";
						// app.TripStatusComponent.prototype.msg.warning();
					}else{
						
						app.TripStatusComponent.prototype.pagingActualViaje = {};
						app.TripStatusComponent.prototype.pagingActualViaje.count = data.count;

						let auxP = Math.floor(app.TripStatusComponent.prototype.pagingActualViaje.count / app.TripStatusComponent.prototype.detallePorPaginaViaje);
						let restoAux = ((app.TripStatusComponent.prototype.pagingActualViaje.count) % app.TripStatusComponent.prototype.detallePorPaginaViaje);
						if (restoAux == 0) {
							app.TripStatusComponent.prototype.totalPageViaje = auxP;
						} else {
							app.TripStatusComponent.prototype.totalPageViaje = auxP + 1;
						}
	

							if(app.TripStatusComponent.prototype.hastaInicio==true){
								if (data.hasOwnProperty('next_page')) {

									if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
										app.TripStatusComponent.prototype.hastaFinal=false;
										app.TripStatusComponent.prototype.hastaInicio=true;
										app.TripStatusComponent.prototype.pagingActualViaje.next_page = null;
									} else {
										app.TripStatusComponent.prototype.hastaFinal=true;
										app.TripStatusComponent.prototype.pagingActualViaje.next_page = data.next_page;
										app.TripStatusComponent.prototype.querys=data.next_page;
									}
								} else {
									app.TripStatusComponent.prototype.hastaFinal=false;
									app.TripStatusComponent.prototype.hastaInicio=true;
									app.TripStatusComponent.prototype.pagingActualViaje.next_page = null;
								}

							if (data.hasOwnProperty('previous_page')) {

								app.TripStatusComponent.prototype.pagingActualViaje.previous_page=data.previous_page

								if (data.previous_page == null || data.previous_page == undefined || data.previous_page === "") {
									app.TripStatusComponent.prototype.hastaInicio=true;
									app.TripStatusComponent.prototype.hastaFinal=true;
									app.TripStatusComponent.prototype.pagingActualViaje.previous_page = null;

								} else {
									app.TripStatusComponent.prototype.hastaInicio=false;
									app.TripStatusComponent.prototype.pagingActualViaje.previous_page = data.previous_page;
									app.TripStatusComponent.prototype.querys=data.previous_page;
								}
							} else {
								app.TripStatusComponent.prototype.hastaInicio=true;
								app.TripStatusComponent.prototype.hastaFinal=true;
								app.TripStatusComponent.prototype.pagingActualViaje.previous_page = null;
							}
							
							if(data.hasOwnProperty('first_page')){
									if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
										app.TripStatusComponent.prototype.hastaFinal=false;
										app.TripStatusComponent.prototype.hastaInicio=true;
										app.TripStatusComponent.prototype.pagingActualViaje.first_page = null;
									} else {
										app.TripStatusComponent.prototype.hastaFinal=true;
										app.TripStatusComponent.prototype.pagingActualViaje.first_page = data.first_page;
										app.TripStatusComponent.prototype.querys=data.first_page;
									}
							}else{
								app.TripStatusComponent.prototype.hastaFinal=false;
								app.TripStatusComponent.prototype.hastaInicio=true;
								app.TripStatusComponent.prototype.pagingActualViaje.first_page = null;
							}

							}else{


								if(data.hasOwnProperty('first_page')){
									if (data.first_page == null || data.first_page == undefined || data.first_page == "") {
										app.TripStatusComponent.prototype.hastaFinal=false;
										app.TripStatusComponent.prototype.hastaInicio=true;
										app.TripStatusComponent.prototype.pagingActualViaje.first_page = null;
									} else {
										app.TripStatusComponent.prototype.hastaFinal=true;
										app.TripStatusComponent.prototype.pagingActualViaje.first_page = data.first_page;
										app.TripStatusComponent.prototype.querys=data.first_page;
									}
								}else{
									app.TripStatusComponent.prototype.hastaFinal=false;
									app.TripStatusComponent.prototype.hastaInicio=true;
									app.TripStatusComponent.prototype.pagingActualViaje.first_page = null;
								}								
								if (data.hasOwnProperty('next_page')) {

									if (data.next_page == null || data.next_page == undefined || data.next_page == "") {
										app.TripStatusComponent.prototype.hastaFinal=false;
										app.TripStatusComponent.prototype.hastaInicio=true;
										app.TripStatusComponent.prototype.pagingActualViaje.next_page = null;
									} else {
										app.TripStatusComponent.prototype.hastaFinal=true;
										app.TripStatusComponent.prototype.pagingActualViaje.next_page = data.next_page;
										app.TripStatusComponent.prototype.querys=data.next_page;
									}
									} else {
										app.TripStatusComponent.prototype.hastaFinal=false;
										app.TripStatusComponent.prototype.hastaInicio=true;
										app.TripStatusComponent.prototype.pagingActualViaje.next_page = null;
									}
								if (data.hasOwnProperty('previous_page')) {

									if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
									app.TripStatusComponent.prototype.hastaInicio=false;
									app.TripStatusComponent.prototype.hastaFinal=true;
									app.TripStatusComponent.prototype.pagingActualViaje.previous_page = null;

									} else {
									app.TripStatusComponent.prototype.hastaInicio=true;
									app.TripStatusComponent.prototype.pagingActualViaje.previous_page = data.previous_page;
									app.TripStatusComponent.prototype.querys=data.previous_page;
									}
								} else {
									app.TripStatusComponent.prototype.hastaInicio=true;
									app.TripStatusComponent.prototype.hastaFinal=true;
									app.TripStatusComponent.prototype.pagingActualViaje.previous_page = null;
									}
							}
							
							
								
						
											
							if(app.TripStatusComponent.prototype.hastaFinal==true)
							{
								if(data.hasOwnProperty('last_page')){
								
									app.TripStatusComponent.prototype.pagingActualViaje.last_page = data.last_page;
									if (data.lastpage == null || data.last_page == undefined || data.last_page == "") {
										app.TripStatusComponent.prototype.hastaInicio=false;
										app.TripStatusComponent.prototype.hastaFinal=true;
									}else{
										app.TripStatusComponent.prototype.hastaInicio=true;
										app.TripStatusComponent.prototype.pagingActualViaje.last_page = data.last_page;
										app.TripStatusComponent.prototype.querys=data.last_page;
									}
									}else{
									app.TripStatusComponent.prototype.hastaInicio=true;
									app.TripStatusComponent.prototype.hastaFinal=false;
									app.TripStatusComponent.prototype.pagingActualViaje.last_page = null;
								}
							}else{
								if (data.hasOwnProperty('previous_page')) {

								if (data.previous_page == null || data.previous_page == undefined || data.previous_page == "") {
									app.TripStatusComponent.prototype.hastaInicio=false;
									app.TripStatusComponent.prototype.hastaFinal=true;
									app.TripStatusComponent.prototype.pagingActualViaje.previous_page = null;
								} else {
									app.TripStatusComponent.prototype.hastaInicio=true;
									app.TripStatusComponent.prototype.pagingActualViaje.previous_page = data.previous_page;
									app.TripStatusComponent.prototype.querys=data.previous_page;
								}
								} else {
									app.TripStatusComponent.prototype.hastaInicio=true;
									app.TripStatusComponent.prototype.hastaFinal=true;
									app.TripStatusComponent.prototype.pagingActualViaje.previous_page = null;
								}
							}


							if(app.TripStatusComponent.prototype.hastaFinal==true && app.TripStatusComponent.prototype.hastaInicio==true){
							}
						
						if (data.hasOwnProperty(key)) {
							var objeto = {};
							app.TripStatusComponent.prototype.listRegister = [];
							for (var i = 0; i < data[key].length; i++) {
								var objeto = app.TripStatusComponent.prototype.formattedDataViajes(data[key][i]);
								if (objeto != null) {
									app.TripStatusComponent.prototype.listRegister.push(objeto);
								}
							}
							
							app.TripStatusComponent.prototype.pagingActualViaje.count = data.count;
						}else{
							app.TripStatusComponent.prototype.listRegister=[];
						}
					}
				}else{
					app.TripStatusComponent.prototype.listRegister=[];
				}
			}else{
				app.TripStatusComponent.prototype.mensaje=app.TripStatusComponent.prototype.service.processMessageError(data,mensajeAll);
			}
		}
	}
	app.TripStatusComponent.prototype.formattedDataViajes=function(data){
		if(data==null || data==undefined || data==""){
			
			return null;
		}else{
			
			if(data.hasOwnProperty("departure_date")){
				if(!(data.departure_date==null || data.departure_date==undefined || data.departure_date=="")){
					data.formatted_departure_date=formattingDate(data.departure_date);
				}
			}
			if(data.hasOwnProperty("fares")){
				if(data.fares!=null && data.fares.length!=0){
					for(var i=0;i<data.fares.length;i++){
						if(data.fares[i]!=null){
							if(data.fares[i].hasOwnProperty("amount")){
								try{
									data.fares[i].rate_public=0.12;
									var aux1=data.fares[i].amount*data.fares[i].rate_public
									var monto_aux=0;
									monto_aux=data.fares[i].amount;
									monto_aux=(data.fares[i].amount+aux1).toFixed(2);
									data.fares[i].tarifa=amountFormattingObject(monto_aux*100);
									data.fares[i].tarifa=data.fares[i].tarifa.integerPart+","+data.fares[i].tarifa.decimalPart;
									if(data.fares[i].hasOwnProperty("currency")){
										if(!(data.fares[i].currency==null || data.fares[i].currency==undefined || data.fares[i].currency=="")){
											data.fares[i].tarifa=data.fares[i].tarifa+" "+_(data.fares[i].currency);
										}
									}
									if(app.TripStatusComponent.prototype.tasaCambio!=null){
										data.fares[i].bs_cambio=(monto_aux*app.TripStatusComponent.prototype.tasaCambio).toFixed(2);
										data.fares[i].bs_cambio=amountFormattingObject(data.fares[i].bs_cambio*100);
										data.fares[i].bs_cambio=data.fares[i].bs_cambio.integerPart+","+data.fares[i].bs_cambio.decimalPart;
										data.fares[i].bs_cambio=data.fares[i].bs_cambio+" Bs";
									}
								}catch(er){
								}
							}
						}
					}
				}
			}
			return data;
			
		}
	}
})(window.app || (window.app = {}));
