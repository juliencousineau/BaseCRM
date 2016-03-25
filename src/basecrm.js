var rp = require('request');

//  resources
var account = require('./resources/account');
var AssociatedContacts = require('./resources/associatedContacts');
var Contacts = require('./resources/contacts');
var DealSources = require('./resources/dealSources');
var Deals = require('./resources/deals');
var LeadSources = require('./resources/leadSources');
var Leads = require('./resources/leads');
var LineItems = require('./resources/lineItems');
var LossReasons = require('./resources/lossReasons');
var Notes = require('./resources/notes');
var Orders = require('./resources/orders');
var pipelines = require('./resources/pipelines');
var Products = require('./resources/products');
var stages = require('./resources/stages');
var Tags = require('./resources/tags');
var Tasks = require('./resources/tasks');
var Users = require('./resources/users');

function BaseCRM(options) {
    if(!(this instanceof arguments.callee)) {
        return;
    }

    this.options = {
        accessToken: '',
        baseUrl: 'https://api.getbase.com',
        userAgent: 'BaseCRM/v2 NodeJS/' + process.version,
        timeout: 30
    };

    Object.keys(options).forEach(function(key) {
        this.options[key] = options[key];
    }.bind(this));

    this.account = account;
    this.associatedContacts = new AssociatedContacts(this);
    this.contacts = new Contacts(this);
    this.dealSources = new DealSources(this);
    this.deals = new Deals(this);
    this.leadSources = new LeadSources(this);
    this.leads = new Leads(this);
    this.lineItems = new LineItems(this);
    this.lossReasons = new LossReasons(this);
    this.notes = new Notes(this);
    this.orders = new Orders(this);
    this.pipelines = pipelines;
    this.products = new Products(this);
    this.stages = stages;
    this.tags = new Tags(this);
    this.tasks = new Tasks(this);
    this.users = new Users(this);
}

BaseCRM.prototype.request = function(options, call) {
    return rp({
        method: options.method,
        uri: this.options.baseUrl + '/v2/' + options.resource,
        body: options.data,
        qs: options.params,
        headers: {
            'user-agent': this.options.userAgent,
            'authorization': 'bearer ' + this.options.accessToken
        },
        timeout: (options.timeout || this.options.timeout) * 1000,
        json: true
    }, call);
};

BaseCRM.prototype.find = function(resource, params, call) {
    return this.request({
        method: 'GET',
        resource: resource,
        params: params
    }, function(error, response, body) {
        if (body == undefined)
            call();
        else {
            var data = body.meta.type === 'collection' ?
                body.items.map(function(item) {
                    return item.data;
                }) :
                body.data;
            call(data); 
        }
    });
};
BaseCRM.prototype.create = function(resource, data, call) {
    return this.request({
        method: 'POST',
        resource: resource,
        data: {
            data: data
        }
    }, function(error, response, body) {
        if (body == undefined)
            call();
        else
            call(body.data);
    });
};
BaseCRM.prototype.update = function(resource, data, call) {
    return this.request({
        method: 'PUT',
        resource: resource,
        data: {
            data: data
        }
    }, function(error, response, body) {
        if (body == undefined)
            call();
        else
            call(body.data);
    });
};
BaseCRM.prototype.delete = function(resource, call) {
    return this.request({
        method: 'DELETE',
        resource: resource
    }, function(error, response, body) {
        call(true);
    });
};

BaseCRM.version = 'v' + require('../package').version;

module.exports = BaseCRM;