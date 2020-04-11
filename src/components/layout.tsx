/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import {
  BackgroundColorDark,
  TextColor,
  BackgroundColorLight,
} from "../colors";
import Header from "./header";
// import "./layout.css";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
    padding:0;
    margin:0;
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
    font-family: sans-serif;
    padding:0;
    margin:0;
    color: ${TextColor};
    height: 100%;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr auto;
  height: 100%;
`;

const FullHeight = styled.div`
  height: 100%;
`;
const Main = styled.main`
  max-width: 1020px;
  margin-left: auto;
  margin-right: auto;
`;
const Footer = styled.footer`
  max-height: 1rem;
  border: 1px solid red;
`;
const Layout = ({ children }: { children: React.ReactNode }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <FullHeight>
      <GlobalStyle />
      <Container>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Main>{children}</Main>
        <Footer></Footer>
      </Container>
    </FullHeight>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
