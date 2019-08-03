import React from 'react';

import { Link } from 'react-router-dom';

import { Navbar } from './styles';

export default function Header() {
  return (
    <Navbar>
      <Link to="/">Github React</Link>
      <ul>
        <li>
          <Link to="/">Users</Link>
        </li>
        <li>
          <Link to="/search-repo">Repositories</Link>
        </li>
      </ul>
    </Navbar>
  );
}
