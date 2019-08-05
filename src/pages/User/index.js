import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { Loading, Owner, ReposList } from './styles';

export default class User extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    user: {},
    repos: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const userLink = decodeURIComponent(match.params.user);
    const [user, repos] = await Promise.all([
      await api.get(
        `/users/${userLink}`,
        {},
        {
          headers: {
            'User-Agent': 'request',
          },
        }
      ),
      api.get(
        `/users/${userLink}/repos`,
        {
          params: {
            state: 'open',
            per_page: 5,
          },
        },
        {
          headers: {
            'User-Agent': 'request',
          },
        }
      ),
    ]);
    this.setState({
      loading: false,
      user: user.data,
      repos: repos.data,
    });
  }

  render() {
    const { loading, user, repos } = this.state;
    if (loading) return <Loading>Downloading...</Loading>;
    return (
      <>
        <Header />
        <Container>
          <Owner>
            <Link to="/">Back to Users</Link>
            <img src={user.avatar_url} alt={user.login} />
            <h1>{user.name}</h1>
            <p>
              <a href={user.url} target="_blank" rel="noopener noreferrer">
                @{user.login}
              </a>
            </p>
            <p>{user.bio}</p>
          </Owner>
          <ReposList>
            {repos.map(repo => (
              <li key={String(repo.id)}>
                <div>
                  <strong>
                    <a href={repo.html_url}>{repo.name}</a>
                    <span>{repo.language}</span>
                  </strong>
                  <p>{repo.description && repo.description}</p>
                </div>

                <ul className="count">
                  <li>
                    {repo.watchers_count}
                    <br />
                    <small>Watchers</small>
                  </li>
                  <li>
                    {repo.forks_count}
                    <br />
                    <small>Forks</small>
                  </li>
                </ul>
              </li>
            ))}
          </ReposList>
        </Container>
      </>
    );
  }
}
