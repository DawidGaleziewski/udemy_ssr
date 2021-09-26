# admin page - authentication error in Promise.all

1. Add amin creator and reducer (without login consideration)

2. Add admin page

3. Add logic to require auth

This will work when we are authenticated. But will throw errors while we are not.

We will get a node error:

"(node:6632) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code."

This is due to the fact that we will only respond with a html if ALL promises will resolve. If any of them fails it wont:

```js
Promise.all(promises).then(() => {
  const context = {};

  // Context object we are passing down
  const content = renderer(req, store, context);

  // If a error was set from our notFound page, we want to attach a 404
  console.log("con", content.notFound);
  if (context.notFound) {
    res.status(404);
  }
  res.send(content);
});
```

If ANY of promisses passed to Promise.all array fails, whole statment will fail!

There are two solutions to this issue:

## solution 1 (bad)

use a catch statment
on Promise.all

```js
Promise.all(promises)
  .then(() => {
    const context = {};

    // Context object we are passing down
    const content = renderer(req, store, context);

    // If a error was set from our notFound page, we want to attach a 404
    console.log("con", content.notFound);
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  })
  .catch((error) => {
    // We assume something went wrong and we will just drop the whole ssr process
    res.send("Something went wrong");
  });
```

This is bad due to the fact that this is something user could easilly fix. In real application we would not want the ssr to crash cause of that small of a reason

## solution 2 (bad)

No matter if there is a error or not we will render the app the same:

```js
// It is parramount to have error handling here. If it will fail user will never recive back his page! It will be just changing
Promise.all(promises)
  .then(render)
  .catch((error) => {
    // Even if the error occures. Still try to send content to the user
    render();
  });
```

the problem is that all other requests will fail in the array as well. Therefore we are rendering app to early.
If very first request fails out of 5, the rest wont render.

## solution 3 (good)

wait for everything to resolve.
In order to not allow Promise.all to go to catch at first error, we want to take all load data functions and wrap them in another promise.

Outer promises will watch inner promise. Whenever the inner promise is resolved or rejected, we will manually resolve the outter promise.
Ouuter promise will ALWAYS be resolved. No matter if the inner one is resolved or rejected.

This will trick Promise.all into thinking that all promises always succed
