import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { newRepo, repositories } = this.state;

      // eslint-disable-next-line
      if (newRepo === '') throw 'You need fill a repository';

      const hasRepo = repositories.find(r => r.name === newRepo);

      // eslint-disable-next-line
      if (hasRepo) throw 'Repository already add';

      const response = await api.get(`/repos/${newRepo}`);

      // eslint-disable-next-line
      if (response.status !== 200) throw 'Unexpected error.';

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
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
    const { newRepo, loading, repositories, error } = this.state;
    return (
      <>
        <Header />
        <Container>
          <h1>
            <FaGithubAlt />
            Repositories
          </h1>

          <Form onSubmit={this.handleSubmit} error={error}>
            <input
              type="text"
              placeholder="Add repository"
              value={newRepo}
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

          <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Details
                </Link>
              </li>
            ))}
          </List>
        </Container>
      </>
    );
  }
}
