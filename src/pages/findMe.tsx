import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout, { Content } from "../components/layout";
import { ExternalLinkButton } from "../components/button";
import SEO from "../components/seo";

const linksQuery = graphql`
  query FIndMeLinksQuery {
    allFindMeJson {
      edges {
        node {
          title
          target
        }
      }
    }
  }
`;

interface FindMeLink {
  id: string;
  title: string;
  target: string;
}

interface LinksQueryResult {
  allFindMeJson: {
    edges: { node: FindMeLink }[];
  };
}

function objectify(queryData: LinksQueryResult): FindMeLink[] {
  return queryData.allFindMeJson.edges.map(r => r.node);
}
const FindMe = (): JSX.Element => {
  const data = objectify(useStaticQuery(linksQuery));

  return (
    <Layout>
      <SEO title="Find Me"></SEO>
      <Content>
        {data.map(d => (
          <ExternalLinkButton key={d.target} href={d.target}>
            {d.title}
          </ExternalLinkButton>
        ))}
      </Content>
    </Layout>
  );
};

export default FindMe;
