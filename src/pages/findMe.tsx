import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout, { Content } from "../components/layout";
import SEO from "../components/seo";
import { LinkPage } from "../components/link-page";

const linksQuery = graphql`
  query FindMeLinksQuery {
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
  return queryData.allFindMeJson.edges.map((r) => r.node);
}
const FindMe = (): JSX.Element => {
  const data = objectify(useStaticQuery(linksQuery));

  return (
    <Layout>
      <SEO title="Find Me"></SEO>
      <Content withHeader={true}>
        <LinkPage
          links={data}
          heading={"You can find me here"}
          subtext={
            "In most places you can find me as @thekleetest, older places might still be @kleeut."
          }
        />
      </Content>
    </Layout>
  );
};

export default FindMe;
