/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { gears } from "./gears-svg";
import { windowBreakpoint } from "../spacing";
import { HeaderNav } from "./header-nav";

const GlobalStyle = createGlobalStyle`

  *{
    box-sizing:border-box;
    padding:0;
    margin:0;
    font-size:18pt;
    font-family: roboto, sans-serif;
  }

  @media (max-width:${windowBreakpoint}) {
    font-size:8pt;
  }
  
  html{
    --text-color: black;
    --gradient-background: linear-gradient(
    90deg,
    rgb(213, 136, 255) 0%,
    rgb(226, 164, 255) 100%
  );
    height:100%;
    width:100vw;
  }  
   body {
    height:100%;
  }  
  div#___gatsby {
    height:100%;
  }
  div#gatsby-focus-wrapper {
    height:100%;
  }

  body {
    background-image: ${gears};
    padding:0;
    margin:0;
    color: var(--text-color);
    height: 100%;
    line-height:1.5rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  width: 100%;
`;

const FullHeight = styled.div`
  height: 100%;
`;
const Main = styled.main`
  padding: 1rem;
  width: 100%;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FullHeight>
      <GlobalStyle />
      <Container>
        <Main>{children}</Main>
      </Container>
    </FullHeight>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const ContentStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items:start; */
  max-width: 1024px;
  margin: auto;
`;

export const Content = ({
  children,
  withHeader,
}: React.PropsWithChildren<{ withHeader: boolean }>) => {
  return (
    <ContentStyle {...{ withHeader }}>
      {withHeader ? <HeaderNav /> : null}
      {children}
    </ContentStyle>
  );
};

export default Layout;
