## Challanges of ssr authentication

Due to fact that we have a server in our frontend. And that server does contact the API for the data, it will need information on who wants to access the data.

Server will need to pretend it is a browser when contacting the API.

Problem with our authentication is that when we will get a cookie from api server to a browser the renderer server wont have it.

## Solution

Whenever user authenticates with api we will go thru the renderer server acting as our proxy for requests.
Proxy will forward that authentication to API.

## Initial request

When browser sends a request for the page initially, we will have to check for a cookie. As there is nothing to proxy. This is just a initial request.

## Why not JWT?

We would need to do a flollow request to the browser from the server to get the jwt token. As the jwt cant be send in cookie only in request header.
