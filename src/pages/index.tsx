import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { TitleHero } from "../components/home-hero-title";
import { HomeNav } from "../components/home-nav";
import styled from "styled-components";

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
`;
const IndexPage = () => (
  <Layout>
    <SEO title="Klee Thomas, software developer" />
    <HomeLayout>
      <TitleHero />
      <HomeNav />
    </HomeLayout>
  </Layout>
);

export default IndexPage;
