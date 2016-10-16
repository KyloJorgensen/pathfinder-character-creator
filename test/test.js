var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

describe('Pathfinder character creator', function() {
    it('should sendFile on GET', function(done) {
        chai.request(app)
        .get('/')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.sendFile;
            done();
        });
    });
    it('should create User', function(done) {
    	chai.request(app)
    	.post('/user')
    	.send({ 
            username: 'kylo',
            password: 'kylo',
            name: 'kylo'           
        })
    	.end(function(error, res) {
    		res.should.have.status(200);
    		done();
    	});
    });
    it('should login in user', function(done) {
    	chai.request(app)
    	.post('/login')
    	.send({
            username: 'kylo',
            password: 'kylo'
    	})
    	.end(function(error, res) {
    		res.should.have.status(200);
    		done();
    	})
    });
});



