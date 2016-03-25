//  https://developers.getbase.com/docs/rest/reference/leads

function Leads(crm) {
    this.crm = crm;
}

Leads.prototype.find = function(data, call) {
    if(typeof data === 'number') {
        this.crm.find('leads/' + data, undefined, call);
    }
    this.crm.find('leads', data, call);
};

Leads.prototype.create = function(data, call) {
    this.crm.create('leads', data, call);
};

Leads.prototype.update = function(id, data, call) {
    this.crm.update('leads/' + id, data, call);
};

Leads.prototype.delete = function(id, call) {
    this.crm.delete('leads/' + id, call);
};

module.exports = Leads;