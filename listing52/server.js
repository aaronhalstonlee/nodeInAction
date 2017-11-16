const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

/* 
    server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, reply) => {
            return reply('hello world');
        }
    });
*/

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('server running at:', server.info.uri);
});