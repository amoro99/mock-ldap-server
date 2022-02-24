'use strict';

const _ = require("lodash");
const formatDn = dn => dn.replace(/,\s+/g, ',');
const dn = (baseDn,name) => formatDn(`cn=${name.toLowerCase()},${baseDn}`);
const username = name => name.toLowerCase().match(/(\S+)/g)[0];
const toEmail = (baseDn, name) => username(name) + '@' + baseDn.match(/dc=(\w+)/g).map(e => /dc=(\w+)/g.exec(e)[1]).join('.');
let gid = 200;
const nextGroupNumber = () => gid++;

module.exports = baseDn => ({
    newADGroup: (name, base = baseDn) => ({
        dn: dn(base,name),
        cn: name,
        objectClass: 'group',
        distinguishedName: dn(base,name),
        objectCategory: [`cn=group,cn=Schema,cn=Configuration,${formatDn(baseDn)}`,
            'group']
    }),
    newADUser : (name, base = baseDn) => ({
        dn: dn(base,name),
        objectClass: 'user',
        cn: name,
        sAMAccountName: username(name),
        sn: _.get(/(\S+)/.exec(name), 1),
        givenName: _.get(/(\S+)/.exec(name), 0),
        mail: toEmail(base,name),
        memberOf: [],
        objectCategory: [`cn=person,cn=Schema,cn=Configuration,${formatDn(base)}`,
            'person'],
        userPrincipalName: toEmail(base, name)
    }),
    newLDAPUser: (name, base = baseDn) => ({
        dn: dn(base,name),
        cn: name,
        objectClass: 'user',
        uid: username(name)
    }),
    newLDAPGroup: (name, base = baseDn) => ({
        dn: dn(base,name),
        cn: name,
        objectClass: 'group',
        gidNumber: nextGroupNumber(),
        memberUid: []
    })
});