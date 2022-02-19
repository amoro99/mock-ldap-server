'use strict';
const ldap = require('ldapjs');
const util = require('util');
const _ = require('lodash');

class MockLdapServer {
    /**
     * db can be an array of users or a function that returns one. It is accessed every time getUsers() is called
     * @param baseDn
     * @param db
     */
    constructor(baseDn, db) {
        const server = ldap.createServer();
        this._listen = util.promisify(server.listen).bind(server);
        this.close = server.close.bind(server);
        this.baseDn = baseDn;
        this.server = server;
        this.db = db;
        server.bind(baseDn, (req, res) => res.end());
        server.search(baseDn, (req, res, next) => {
            const users = this.getUsers() || [];
            const searchEntry = u => _({}).set('attributes', _.omit(u, 'dn')).set('dn', u.dn).value();
            try {
                users.forEach(u => req.filter.matches(u) ? res.send(searchEntry(u)) : 0);
                res.end();
            } catch (e) {
                return next(new ldap.OperationsError(e.message));
            }
        })
    }

    getUsers() {
        if (_.isFunction(this.db)) {
            return this.db();
        } else return this.db;
    }

    /**
     *
     * @param port if falsy then will use a random available port
     * @returns {Promise<string>}
     */
    async listen(port) {
        await this._listen(port || 0);
        return this.server.url;
    }

    /**
     * Wraps handler
     * handler passes in bindDn and credential.
     * default behavior accepts all bind requests
     * @param handler
     */
    setBindHandler(handler) {
        this.server.bind(this.baseDn, (req,res,next) => {
            try {
                handler(req.dn.toString(), req.credentials);
                res.end();
            } catch (err) {
                return next(new ldap.OperationsError(err.message));
            }
        })
    }

}

module.exports = MockLdapServer;
