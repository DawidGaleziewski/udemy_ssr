Main purpose of ssr is so that user gets the content on the screen as quickly as possible.
This is due to fact that with normal react first request fallows patter of:
request for html file -> request for js file -> json request -> content viable

vs ssrs:

content request -> content viable

## SSR downsides

ssr is computation heavy and this is one of the reasons we want to split the front and backend
