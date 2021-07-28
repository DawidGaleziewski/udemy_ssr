In order to make sure that our html component downloads the bundle.js with our client logic we need to:

1. Create a public folder on the express

```javascript
app.use(express.static("public"));
```

2. Bundle the html of a Component with our ja logic

```javascript
app.get("/", (req, res) => {
  // We will be useing ReacDOM library to change react component into html. We will need however to use webpack to translate it
  const content = renderToString(<Home />);
  // We create a html template. Inside we interpolate the content (our react code) and add a js bundle on the bottom with all js.
  const html = `
    <html>
      <head>
      </head>
      <body>
        <div>
          ${content}
        </div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});
```
