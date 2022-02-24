# Examples for Unit testing
***
### Active Directory
Bind user should be dn of the user (username in ad config)

All _dn_ references (memberOf, dn) should be lowercase

_objectCategory_ is required:
* objectCategory: 'cn=group,cn=Schema,cn=Configuration,dc=test,dc=test'
* objectCategory: 'cn=person,cn=Schema,cn=Configuration,dc=test,dc=test'

To run as standalone
```
node ad-server.js
```