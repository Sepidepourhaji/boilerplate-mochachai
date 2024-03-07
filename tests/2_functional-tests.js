const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=Sara')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Sara');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        //mytest
        .send({ surname: 'Colombo' })
        //mytest

        .end(function (err, res) {
          //assert.fail();
          //mytest
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(
            res.body.name,
            'Cristoforo',
            'res.body.name should be "Cristoforo"'
          );
          assert.equal(
            res.body.surname,
            'Colombo',
            'res.body.surname should be "Colombo"'
          );
          
          //mytest

          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      //assert.fail();
      //*****/
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(
            res.body.name,
            'Giovanni',
            'res.body.name should be "Giovanni"'
          );
          assert.equal(
            res.body.surname,
            'da Verrazzano',
            'res.body.surname should be "da Verrazzano"'
          );
     
      done();
        });
         //*****/
      });
    
  });
  


});

const Browser = require('zombie');

//Browser.site = 'http://localhost:3000';
Browser.site = '0.0.0.0:3000';

suite('Functional Tests with Zombie.js', function () {
  const browser = new Browser();
  suiteSetup(function(done){
    return browser.visit('/', done);
    //done()
  });
  this.timeout(5000);


  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

 suite('"Famous Italian Explorers" form', function () {
    //***/
    // #5
      //assert.fail();
  test('Submit the surname "Colombo" in the HTML form', function (done) {
  //mytest
       browser.fill('surname', 'Colombo')
       browser.pressButton('submit', function(){
       browser.assert.success();
       browser.assert.text("span#name", "Cristoforo");
       browser.assert.text("span#surname", "Colombo");
       browser.assert.elements('span#dates', 1);
      done();
       });
    });


    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      //assert.fail();
      //mytest
      browser.fill('surname', 'Vespucci')
       browser.pressButton('submit', function(){
       browser.assert.success();
       browser.assert.text("span#name", "Amerigo");
       browser.assert.text("span#surname", "Vespucci");
       browser.assert.elements('span#dates', 1);
      done();
       });
    });

  });
});
