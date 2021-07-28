Due to fact that no js is beeing send to the client and all js is converted to HTML eventHandlers wont work!

```javascript
import React from "react";

const Home = () => {
  return (
    <div>
      <span>Test</span>
      <button
        //   This wont work
        onClick={(event) => {
          console.log("hi there");
        }}
      >
        Test
      </button>
    </div>
  );
};

export default Home;
```

## Solution

We need to split our app into two bundles

### Bundle 1

Server code and react app (runs the code on the backend)

### Bundle 2

React app - ships bundle down to the server
