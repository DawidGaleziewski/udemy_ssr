import React from "react";
import Home from "./components/Home";
import UsersList, { loadData } from "./components/UsersList";

// We say bye bye to our clean code
// export default () => {
//   return (
//     <div>
//       <Route exact path="/" component={Home} />
//       <Route path="/test" component={() => <div>Hii</div>} />
//       <Route path="/users" component={UsersList} />
//     </div>
//   );
// };

// Hello to ssr code
export default [
  { path: "/", component: Home, exact: true },
  { path: "/users", component: UsersList, loadData },
];
