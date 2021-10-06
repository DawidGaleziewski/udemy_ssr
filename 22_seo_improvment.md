# meta tags

When we link a page on twitter, we will see image, title, description.
This data is pulled from meta data

OG properties are part of a Open Graph protocol
https://ogp.me/

```html
<meta property="og:title" content="title is here" />
<meta property="og:description" content="short description of the page here" />
<meta property="og:image" content="http://img.com/test.jpg" />
```

Setting those meta tags will bost the fuck out of our app. Both seo and abillity to link those pages to other services will improve

## helmet

We want to change the meta tags on the route. Huge advantage os SSR is that twitter/fb/linkedin bots will grab the tags on initial load, and SPA could be ignored here.

helmet works a bit diffrent on server side.

With helmet we first want to render meta tags and then dump them into the template we return

In our view component:

```js
  // Only requirment of the helmet tag is so it will be rendered with the component
  // Helmet will store those but on server side we will have to import helmet library and put those into our tags
  // We cannot just interpolate our props into the title however, helmet does not like this (when we pass more then one child to the tittle tag). we have to use template literal
  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }
```

inside our renderer function on the server side

```js
  // we pull the instance of the helmet
  // all meta tags will be pulled by one function call
  const helmet = Helmet.renderStatic();

  return `<html>
          <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
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

# reactDOMServer methods

https://reactjs.org/docs/react-dom-server.html

at this project we used renderToString. It returned a string.

renderToNodeStream returns readable string.

What we care about when optimizing seo is TTFB (time to first byte)
