import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  .navbar {
    width: 25vw;
  }
  .content {
    width: 75vw;
  }
`;

export const StyledNavBar = styled.nav`
  width: 25vw;
  height: 100vh;
  border-right: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
`;