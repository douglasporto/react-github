import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { Form, SubmitButton, UsersList } from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    const users = localStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleInputChange = e => {
    this.setState({ newUser: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { newUser, users } = this.state;

      // eslint-disable-next-line
      if (newUser === '') throw 'You need fill a user';

      const hasRepo = users.find(r => r.name === newUser);

      // eslint-disable-next-line
      if (hasRepo) throw 'User already add.';

      const response = await api.get(`/users/${newUser}`);

      // eslint-disable-next-line
      if (response.status !== 200) throw 'Unexpected error.';

      const data = {
        login: response.data.login,
        name: response.data.name,
        avatar_url: response.data.avatar_url,
        html_url: response.data.html_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
        error: false,
      });
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err);
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newUser, loading, users, error } = this.state;
    return (
      <>
        <Header />
        <Container>
          <h1>
            <FaGithubAlt />
            Users
          </h1>

          <Form onSubmit={this.handleSubmit} error={error}>
            <input
              type="text"
              placeholder="Add Users"
              value={newUser}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading ? 1 : 0}>
              {loading ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                <FaPlus color="#fff" size={14} />
              )}
            </SubmitButton>
          </Form>
          <UsersList>
            {users.map(user => (
              <li key={user.login}>
                <img src={user.avatar_url} alt={user.login} />
                <div>
                  <strong>
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a target="_blank" href={user.html_url}>
                      {user.name}
                    </a>
                  </strong>
                  <p>{user.login}</p>
                </div>
                <Link to={`/user/${user.login}`}>Details</Link>
              </li>
            ))}
          </UsersList>
        </Container>
      </>
    );
  }
}
