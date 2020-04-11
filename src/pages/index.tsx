import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { PrimaryColor, BackgroundColorDark, HighlightColor } from "../colors";

const MenuItem = styled(Link)`
  display: block;
  border: 0.1rem solid ${PrimaryColor};
  padding: 1rem;
  text-align: center;
  margin: 0.9rem;
  border-radius: 0rem;
  background: ${BackgroundColorDark};
  color: ${PrimaryColor};
  font-size: 1.5rem;
  text-decoration: none;
  box-shadow: 0.3rem 0.3rem ${HighlightColor};
  width: 100%;
  :hover {
    border: 0.5rem solid ${PrimaryColor};
    margin: 0.5rem;
  }
`;
const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Content>
      <MenuItem to="/talks/">Speaking</MenuItem>
      <MenuItem to="/aboutMe/">Speaker Bio</MenuItem>
      <MenuItem to="/page-2/">Go to page 2</MenuItem>
    </Content>
  </Layout>
);

export default IndexPage;
