/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import {
  BackgroundColorDark,
  TextColor,
  BackgroundColorLight,
} from "../colors";
import styled, { createGlobalStyle } from "styled-components";
import { gears } from "./gears-svg";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
    padding:0;
    margin:0;
    font-size:16px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
  }
  
  html{
    height:100%;
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
    font-size: 1rem;
    background: linear-gradient(135deg, ${BackgroundColorLight},${BackgroundColorDark});
    background-image: ${gears};
    padding:0;
    margin:0;
    color: ${TextColor};
    height: 100%;
    line-height:1.5rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const FullHeight = styled.div`
  height: 100%;
`;
const Main = styled.main`
  padding: 1rem;
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

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Layout;
