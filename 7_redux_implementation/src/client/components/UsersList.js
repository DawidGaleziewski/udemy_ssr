import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  render() {
    return (
      <div>
        List of users here
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

function loadData(store) {
  console.log(`store is: ${store}`);

  // We can call dispatch on the store object
  // We return the promise created during dispatch so that we know when it gets resolved in index.js
  return store.dispatch(fetchUsers());
}

export { loadData };

export default connect(mapStateToProps, { fetchUsers })(UsersList);
