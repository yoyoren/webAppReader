var koa = require('koa');
var app = koa();
var path = require('path');
var controller = require('koa-route');
var koa_static = require('koa-static-server');

var views = require('co-views');

/*var render = views('views', {
  map: { html: 'ejs' }
})*/

app.use(koa_static({
	rootDir: './static',
	rootPath: '/static',
	maxage: 0
}));

var render = require('koa-ejs');
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
});


app.use(controller.get('/', function *(){
	    this.set('Cache-Control', 'no-cache');
		yield this.render('index');
}));

app.use(controller.get('/test', function *(){
	    this.set('Cache-Control', 'no-cache');
	    console.log('test page');
		yield this.render('test',{title:'测试标题'});
}));

app.listen(3000);
