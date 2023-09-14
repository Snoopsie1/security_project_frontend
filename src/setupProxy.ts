// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: any) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://localhost:443', // The URL of the external API
			changeOrigin: true,
			logLevel: 'debug',
			secure: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers':
					'Origin, X-Requested-With, Content-Type, Accept',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			},
		})
	);
};