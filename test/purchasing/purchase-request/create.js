require("should");
var dataUtil = require('../../data').transaction.purchaseRequest;
var helper = require("../../helper");
var validatePR = require("dl-models").validator.purchasing.purchaseRequest;

var PurchaseRequestManager = require("../../../src/managers/purchasing/purchase-request-manager");
var purchaseRequestManager = null;

before('#00. connect db', function(done) {
    helper.getDb()
        .then(db => {
            purchaseRequestManager = new PurchaseRequestManager(db, {
                username: 'dev'
            });
            done();
        })
        .catch(e => {
            done(e);
        });
});

it('#01. should error when create with empty data ', function(done) {
    purchaseRequestManager.create({})
        .then(id => {
            done("should error when create with empty data");
        })
        .catch(e => {
            try {
                // e.errors.should.have.property('code');
                // e.errors.should.have.property('name');
                done();
            }
            catch (ex) {
                done(ex);
            }
        });
});

var purchaseRequest;
it('#02. should success when create new data', function(done) {
    dataUtil.getNew()
        .then(pr => {
            purchaseRequest = pr;
            validatePR(purchaseRequest);
            done();
        })
        .catch(e => {
            done(e);
        });
}); 