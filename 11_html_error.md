Common error when doing ssr:

bundle.js:699 Warning: Expected server HTML to contain a matching <div> in <div>.

When hydrating react expect the html structure provided by the server and the html structure that is send with bundle to be exact the same.

If those differ react will compain

Good way of troubleshooting this is by going to "i" symbol in the browser and disabling the javascript.
This will prevent the js from mutating the HTML and show us where the diffrence is.
