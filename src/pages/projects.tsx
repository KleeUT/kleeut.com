import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout, { Content } from "../components/layout";
import SEO from "../components/seo";
import { LinkPage } from "../components/link-page";

const linksQuery = graphql`
  query ProjectLinksQuery {
    allProjectsJson {
      edges {
        node {
          title
          target
        }
      }
    }
  }
`;

interface ProjectsLink {
  id: string;
  title: string;
  target: string;
}

interface LinksQueryResult {
  allProjectsJson: {
    edges: { node: ProjectsLink }[];
  };
}

function objectify(queryData: LinksQueryResult): ProjectsLink[] {
  return queryData.allProjectsJson.edges.map((r) => r.node);
}

const FindMe = (): JSX.Element => {
  const data = objectify(useStaticQuery(linksQuery));

  return (
    <Layout>
      <SEO title="Find Me"></SEO>
      <Content withHeader={true}>
        <LinkPage
          links={data}
          heading="Stupid Projects"
          subtext="      I love a stupid weekend project. These are just for fun. You can assume
      they are pretty much abandonware."
        />
      </Content>
    </Layout>
  );
};

export default FindMe;
