import React from "react";
import { MenuItem } from "./button";
import styled from "styled-components";
const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Holder = styled.div`
  min-width: 10rem;
`;
export const HomeNav = () => {
  return (
    <Nav>
      <Holder>
        <MenuItem to="/about/">About Me</MenuItem>
      </Holder>
      <Holder>
        <MenuItem to="/talks/">Speaking</MenuItem>
      </Holder>
      <Holder>
        <MenuItem to="/findMe/">Find Me</MenuItem>
      </Holder>
      <Holder>
        <MenuItem to="/projects/">Projects</MenuItem>
      </Holder>
    </Nav>
  );
};
