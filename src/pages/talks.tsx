import React from "react";
import styled from "styled-components";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { ExternalLink } from "../components/link";
import { PrimaryColor, SecondaryColor } from "../colors";
import { PageHeading } from "../components/headings";

const talksQuery = graphql`
  query TalksAndBio {
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
    bioJson {
      speakerBio
    }
  }
`;

type FullQueryReturnType = {
  allTalksJson: TalkQueryReturnType;
  bioJson: SpeakerBioReturnType;
};

type TalkQueryReturnType = {
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

const Box = styled.div`
  border: 2px solid ${SecondaryColor};
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 1);
`;

type SpeakerBioReturnType = {
  id: string;
  speakerBio: string;
};
const Bio = ({ bioData }: { bioData: SpeakerBioReturnType }): JSX.Element => {
  return (
    <section>
      <PageHeading>Speaker Bio</PageHeading>
      <Box>
        <p>{bioData.speakerBio}</p>
      </Box>
    </section>
  );
};

const objectifyTalks = (graph: TalkQueryReturnType): Array<Talk> => {
  const x = graph.edges.map(y => y.node);
  return x.map(y => ({
    ...y,
    givenAt: y.givenAt.map(z => ({ ...z, date: new Date(z.date) })),
  }));
};
const TalksTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  tr {
  }
  td:first-of-type,
  th:first-of-type {
    border-left: 0;
  }
  tr:last-of-type {
    td {
      border-bottom: 0;
    }
  }
  td,
  th {
    padding: 1rem;
    border-bottom: 1px solid ${PrimaryColor};
    border-left: 1px solid ${PrimaryColor};
  }
  th {
    /* visibility: hidden; */
    padding: 0 1rem 1rem 1rem;

    text-align: left;
  }
`;

const TextOrLink = ({
  text,
  link,
}: {
  text: string;
  link?: string;
}): JSX.Element => {
  if (link) {
    return <ExternalLink href={link}>{text}</ExternalLink>;
  }
  return <>{text}</>;
};

const TalksGrid = ({ talks }: { talks: Array<DateBasedTalk> }) => (
  <TalksTable>
    <thead>
      <tr>
        <th>Date</th>
        <th>Talk</th>
        <th>Event</th>
      </tr>
    </thead>
    <tbody>
      {talks.map(talk => {
        return (
          <tr key={`${talk.title}${talk.eventName}`}>
            <td>{talk.date.toLocaleDateString()}</td>
            <td>
              <TextOrLink text={talk.title} link={talk.link}></TextOrLink>
            </td>
            <td>{talk.eventName}</td>
          </tr>
        );
      })}
    </tbody>
  </TalksTable>
);

interface DateBasedTalk {
  title: string;
  date: Date;
  eventName: string;
  link: string;
}

const IndexPage = () => {
  const queryResponse: FullQueryReturnType = useStaticQuery(talksQuery);
  const talks = objectifyTalks(queryResponse.allTalksJson);
  const talkIntances: DateBasedTalk[] = talks.flatMap(talk =>
    talk.givenAt.map(event => ({
      eventName: event.name,
      date: event.date,
      link: event.link,
      title: talk.title,
    }))
  );
  talkIntances.sort((x, y) => y.date.valueOf() - x.date.valueOf());

  return (
    <Layout>
      <SEO title="Talks" />
      <Bio bioData={queryResponse.bioJson} />
      <PageHeading>Past Talks</PageHeading>
      <TalksGrid talks={talkIntances} />
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
