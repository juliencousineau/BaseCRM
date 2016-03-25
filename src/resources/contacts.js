//  https://developers.getbase.com/docs/rest/reference/contacts

function Contacts(crm) {
    this.crm = crm;
}

Contacts.prototype.find = function(data, call) {
    if(typeof data === 'number') {
        return this.crm.find('contacts/' + data, undefined, call);
    }
    return this.crm.find('contacts', data, call);
};

Contacts.prototype.create = function(data, call) {
    return this.crm.create('contacts', data, call);
};

Contacts.prototype.update = function(id, data, call) {
    return this.crm.update('contacts/' + id, data);
};

Contacts.prototype.delete = function(id, call) {
    return this.crm.delete('contacts/' + id, call);
};

module.exports = Contacts;