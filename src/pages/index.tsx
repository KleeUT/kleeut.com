import React from "react";
import Layout, { Content } from "../components/layout";
import { MenuItem } from "../components/button";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Content>
      <MenuItem to="/talks/">Speaking</MenuItem>
      <MenuItem to="/findMe/">Find Me</MenuItem>
      <MenuItem to="/projects/">Projects</MenuItem>
    </Content>
  </Layout>
);

export default IndexPage;
