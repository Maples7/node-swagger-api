'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:3000'); // supertest init;

chai.should();

describe('/api/puppies/{id}', function() {
  describe('get', function() {
    it('should respond with 200 A single puppy', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Puppy"
      };

      /*eslint-enable*/
      api.get('/api/puppies/{id PARAM GOES HERE}')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

  });

  describe('put', function() {
    it('should respond with 200 Successfully updated', function(done) {
      api.put('/api/puppies/{id PARAM GOES HERE}')
      .set('Accept', 'application/json')
      .send({
        puppy: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('delete', function() {
    it('should respond with 200 Successfully deleted', function(done) {
      api.del('/api/puppies/{id PARAM GOES HERE}')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
