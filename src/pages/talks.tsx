import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const talksQuery = graphql`
  query MyQuery {
    allTalksJson {
      edges {
        node {
          title
          givenAt {
            link
            name
            date
          }
          abstract
        }
      }
    }
  }
`;
type TalkQueryReturnType = {
  allTalksJson: {
    edges: [
      {
        node: {
          title: string;
          givenAt: [
            {
              link: string;
              name: string;
              date: string;
            }
          ];
          abstract: string;
        };
      }
    ];
  };
};

const objectify = (graph: TalkQueryReturnType): Array<Talk> => {
  const x = graph.allTalksJson.edges.map(y => y.node);
  return x.map(y => ({
    ...y,
    givenAt: y.givenAt.map(z => ({ ...z, date: new Date(z.date) })),
  }));
};

const TalksGrid = ({ talks }: { talks: Array<Talk> }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {talks.map(talk => {
        return (
          <tr key={talk.title}>
            <td>{talk.title}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const IndexPage = () => {
  const talks = objectify(useStaticQuery(talksQuery));
  return (
    <Layout>
      <SEO title="Talks" />
      <TalksGrid talks={talks} />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

type SpeakingEvent = {
  link: string;
  name: string;
  date: Date;
};

type Talk = {
  title: string;
  abstract: string;
  givenAt: Array<SpeakingEvent>;
};

export default IndexPage;
