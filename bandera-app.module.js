(function(app) {
  app.AppModule =
    ng.core.NgModule({
		imports: [
			ng.platformBrowser.BrowserModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.http.HttpModule,
			app.routing	
		],
		declarations: [
			app.LoadingServiceComponent,
			app.MsgComponent,
			app.CustomTableComponent,
			app.SidebarComponent,
			app.TripStatusComponent,
			app.AppComponent
		],
		providers: [
			app.AppCallService,
			app.MsgComponent,
			app.LoadingServiceComponent
		],
		bootstrap: [app.AppComponent]
   }).Class({
      constructor: function() {}
   });
})(window.app || (window.app = {}));