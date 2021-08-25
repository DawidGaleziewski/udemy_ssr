By default react protects from XSS attacks.
However only on content that react by default renders.

When we dump raw redux state, it is volnurable

When securing our store, we need to assume that there is always a possibility that we are going to get a bad data from API.

We will use serialize-javascript library for this.\
We replace JSON.stringify with serialize.

Serialize will escape all scpecial characters. Taking special chars like < and replacing them with unicode equiwalent

```javascript
  return `<html>
          <head>
          </head>
          <body>
            <div id="root">${content}</div>
            <script>
              window.INITIAL_STATE = ${serialize(store.getState())}
            </script>
            <script src="bundle.js"></script>
          </body>
        </html>`;
};
```
