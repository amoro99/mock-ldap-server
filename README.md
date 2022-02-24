# mock-ldap-server
Mock Ldap Server for testing, supports bind and search only

## Include in your project

```
    "devDependencies": {
        "mock-ldap-server": "github:amoro99/mock-ldap-server"
    }
```


## Usage

```javascript
const MockLdapServer = require('mock-ldap-server');

before(async () => {
    ldapServer = new MockLdapServer('dc=test', {
        alpha : {
            dn: 'cn=alpha,dc=test',
            objectClass: 'user',
            uid: 'alpha',
            description: 'Alpha Male'
        },
        beta : {
            dn: 'cn=beta,dc=test',
            objectClass: 'user',
            uid: 'beta',
            description: 'Beta Male'
        }
    });
    address = await ldapServer.listen();
});
```
There are helper functions to create users:

LDAP:
```javascript
const ldapUser = ldapServer.newLDAPUser('Albert Einstein');
const ldapGroup = ldapServer.newLDAPGroup('Geniuses');
//add to group
ldapGroup.memberUid = ldapGroup.memberUid.push(ldapUser.uid);
```

Active Directory:
```javascript
const adUser = ldapServer.newADUser('Albert Brooks');
const adgroup = ldapServer.newADGroup('Geniuses');
ldapUser.memberOf = ldapUser.memberOf.push(adGroup.dn);
```

_Note these don't add the principals to the server, they just create them in the proper format_

See code for more.



