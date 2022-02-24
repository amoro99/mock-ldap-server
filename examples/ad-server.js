(
    async function () {
        const ldapServer = new MockLdapServer('dc=test,dc=local', [
            {
                dn: 'cn=a group,dc=test,dc=local',
                cn: 'A Group',
                objectClass: 'group',
                distinguishedName: 'CN=A Group,DC=test,DC=local',
                objectCategory: 'cn=group,cn=Schema,cn=Configuration,dc=test,dc=test'
            },
            {
                dn: 'cn=b group,dc=test,dc=local',
                cn: 'B Group',
                objectClass: 'group',
                distinguishedName: 'CN=B Group,DC=test,DC=local',
                objectCategory: 'cn=group,cn=Schema,cn=Configuration,dc=test,dc=test'
            },
            {
                dn: 'cn=paul rodgers,dc=test,dc=local',
                objectClass: 'user',
                cn: 'Paul Rodgers',
                sAMAccountName:'paul',
                sn: 'Rodgers',
                givenName: 'Paul',
                mail: 'paul@test.local',
                memberOf: [
                    'cn=a group,dc=test,dc=local',
                    'cn=b group,dc=test,dc=local'
                ],
                objectCategory: 'cn=person,cn=Schema,cn=Configuration,dc=test,dc=test',
                userPrincipalName: 'paul@test.local'
            },
            {
                dn: 'cn=ad-admin,dc=test,dc=local',
                objectClass: 'user',
                cn: 'AD Admin',
                sAMAccountName:'ad-admin',
                sn: 'Admin',
                givenName: 'AD',
                mail: 'Adadmin@test.local',
                memberOf: [
                    'cn=a group,dc=test,dc=local',
                    'cn=b group,dc=test,dc=local'
                ],
                objectCategory: 'cn=person,cn=Schema,cn=Configuration,dc=test,dc=test',
                userPrincipalName: 'adadmin@test.local'
            }
        ]);
        const address = await ldapServer.listen(50040);

        console.log(address);
    }
)();