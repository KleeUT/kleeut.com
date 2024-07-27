import React from "react";
import styled from "styled-components";

import { useStaticQuery, graphql } from "gatsby";

import Layout, { Content } from "../components/layout";
import SEO from "../components/seo";
import { ExternalLink } from "../components/link";
import { PageHeading, SubHeading, MinorHeading } from "../components/headings";
import { format } from "date-fns/format";
import { isBefore } from "date-fns/isBefore";
import { isAfter } from "date-fns/isAfter";
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
          },
        ];
        abstract: string;
      };
    },
  ];
};

type SpeakerBioReturnType = {
  id: string;
  speakerBio: string;
};
const Bio = ({ bioData }: { bioData: SpeakerBioReturnType }): JSX.Element => {
  return (
    <section>
      <SubHeading>Speaker Bio</SubHeading>
      <p>{bioData.speakerBio}</p>
    </section>
  );
};

const objectifyTalks = (graph: TalkQueryReturnType): Array<Talk> => {
  const x = graph.edges.map((y) => y.node);
  return x.map((y) => ({
    ...y,
    givenAt: y.givenAt.map((z) => ({ ...z, date: new Date(z.date) })),
  }));
};

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

const TalkBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TalksDisplay = ({ talks }: { talks: Array<DateBasedTalk> }) => (
  <section>
    <SubHeading>Upcoming Talks</SubHeading>
    {talks.filter((talk) => isAfter(talk.date, Date.now())).map(talkDisplay)}
    <SubHeading>Past Talks</SubHeading>
    <TalkBox>
      {talks.filter((talk) => isBefore(talk.date, Date.now())).map(talkDisplay)}
    </TalkBox>
  </section>
);

const talkDisplay = (talk: DateBasedTalk) => (
  <div key={`${talk.title}${talk.eventName}`}>
    <MinorHeading>
      <TextOrLink text={talk.title} link={talk.link}></TextOrLink>
    </MinorHeading>
    <p>
      at: {talk.eventName} <br />
      on: <span>{format(talk.date, "dd LLLL yyyy")}</span>
    </p>
  </div>
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
  const talkInstances: DateBasedTalk[] = talks.flatMap((talk) =>
    talk.givenAt.map((event) => ({
      eventName: event.name,
      date: event.date,
      link: event.link,
      title: talk.title,
    })),
  );
  talkInstances.sort((x, y) => y.date.valueOf() - x.date.valueOf());

  return (
    <Layout>
      <SEO title="Speaking" />
      <Content withHeader={true}>
        <PageHeading>Speaking</PageHeading>
        <Bio bioData={queryResponse.bioJson} />
        <TalksDisplay talks={talkInstances} />
      </Content>
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
