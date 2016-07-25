var DPServiceController = require('./controller/DPServiceController.js');
var koa = require('koa');
var app = koa();
var controller = require('koa-route');

var views = require('koa-views');

var koa_static = require('koa-static-server');
var static_cache_time = 24 * 60 * 60 * 1000 * 30;
var mta = require('@mtfe/mta-nodejs')({
    token: '56e7c158c86784c8012a16fc',        // 请填写从性能监控平台获取的项目token，必填，为空会报错
    plugins: ['koa']                        // API插件，详见下方文档plugins部分
});
app.use(mta.koaMiddleware);
app.use(controller.get('/dpauto' + path, fn));
app.use(koa_static({
	rootDir: './app-vc-car/neurons/app-vc-car/0.1.38/',
	rootPath: '/channel/car',
	maxage: static_cache_time
}));

function DPRoute(path, fn) {
	app.use(controller.get(path, fn));
	app.use(controller.get('/dpauto' + path, fn));
	app.use(controller.get('/channel/car' + path, fn));
};
exports.init = function(port){
	DPRoute('/', function*() {
		this.set('Cache-Control', 'no-cache');
		yield this.render('index');
	});
	app.listen(port);
}