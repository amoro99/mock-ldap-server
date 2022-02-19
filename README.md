# mock-ldap-server
NodeJS Mock Ldap Server for testing, supports bind and search only. Based on http://ldapjs.org

## Include in your project

```
    "devDependencies": {
        "mock-ldap-server": "github:amoro99/mock-ldap-server"
    }
```


## Usage

Pass in specific ldap object hash to the constructor, or a synchronous function that returns such. 
The object or function is accessed every time there is a search, there is no caching.

```
    const MockLdapServer = require('mock-ldap-server');
    
    let ldapUrl, ldapServer;
    
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
        ldapUrl = await ldapServer.listen();
    });
```

See code for more.
