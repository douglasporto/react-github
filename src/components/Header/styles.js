import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  padding: 0 30px;
`;

export const Navbar = styled.nav`
  height: 64px;
  background: #fff;
  padding: 0 30px;
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 18px;
    font-weight: bold;
    color: #7159c1;
    text-decoration: none;
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    li {
      padding-right: 15px;
    }
  }
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    a {
      font-weight: bold;
      color: #7159c1;
    }
  }
`;
