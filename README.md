# mock-ldap-server
Mock Ldap Server for testing, supports bind and search only

## Include in your project

<code>
    "devDependencies": {
        "mock-ldap-server": "github:amoro99/mock-ldap-server"
    }
</code>


## Usage
<code>
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

</code>

See code for more.



