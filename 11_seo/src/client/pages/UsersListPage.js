import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
import { Helmet } from "react-helmet";

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

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

  render() {
    return (
      <div>
        {this.head()}
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
  return store.dispatch(fetchUsers());
}

export { loadData };

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
};
