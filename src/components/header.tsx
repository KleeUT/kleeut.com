import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { gearHeader } from "./gearBackground";
import { White } from "../colors";
const HeaderHeading = styled.h1`
  margin: 0;
  color: ${White};
  text-align: center;
`;
const HeaderSubheading = styled.h2`
  margin: 0;
  color: ${White};
  text-align: center;
`;
const HeaderBackground = styled(gearHeader)`
  margin-bottom: 1.45rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => (
  <HeaderBackground>
    <Link to="/">
      <HeaderHeading>Klee Thomas</HeaderHeading>
      <HeaderSubheading>Software Crafter</HeaderSubheading>
    </Link>
  </HeaderBackground>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
