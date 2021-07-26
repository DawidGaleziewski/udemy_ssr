SSR app will have 2 seperate backend servers.

1. Api Server

Handle app logic. Serve list of users, handle authentication

- db access
- validation
- authentication
- authorization
- logging

2. Rendering server

- take data - produce HTML

Rendering app and serve it to user

## why two servers?

Benefit is that is we need we could replace the view layer server with another one. I.E if we want we could replace it with angular.

By spliting the app it will be easier to scale the app in future
