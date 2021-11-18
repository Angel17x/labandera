(function(app) {
  app.routing = ng.router.RouterModule.forRoot([
		{path: '', redirectTo: 'init', pathMatch: 'full'},
		{path:'init',component:app.TripStatusComponent}
  ],{useHash: true});
})(window.app || (window.app = {}));