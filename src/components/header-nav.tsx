import React from "react";
import { MenuItem } from "./button";
import styled from "styled-components";
import { windowBreakpoint } from "../spacing";

const BackHeader = styled.nav`
  height: 2rem;
  display: flex;
  gap: 0.5rem;
  position: sticky;
  top: 0;
  background: white;
`;

const DontDisplayForMobileMenuItem = styled(MenuItem)`
  @media (max-width: ${windowBreakpoint}) {
    display: none;
  }
`;

export const HeaderNav = () => (
  <BackHeader>
    <MenuItem to="/">Back</MenuItem>

    <DontDisplayForMobileMenuItem to="/about/">
      About Me
    </DontDisplayForMobileMenuItem>

    <DontDisplayForMobileMenuItem to="/talks/">
      Speaking
    </DontDisplayForMobileMenuItem>

    <DontDisplayForMobileMenuItem to="/findMe/">
      Find Me
    </DontDisplayForMobileMenuItem>

    <DontDisplayForMobileMenuItem to="/projects/">
      Projects
    </DontDisplayForMobileMenuItem>
  </BackHeader>
);
