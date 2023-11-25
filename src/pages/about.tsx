import React from "react";

import Layout, { Content } from "../components/layout";
import SEO from "../components/seo";
import { MinorHeading, PageHeading, SubHeading } from "../components/headings";
import { graphql, useStaticQuery } from "gatsby";

const talksQuery = graphql`
  query Bio {
    bioJson {
      speakerBio
      longBio
    }
  }
`;

type FullQueryReturnType = {
  bioJson: SpeakerBioReturnType;
};

type SpeakerBioReturnType = {
  id: string;
  speakerBio: string;
  longBio: string;
};

const Bio = ({ bioData }: { bioData: SpeakerBioReturnType }): JSX.Element => {
  return (
    <section>
      <SubHeading>Bio</SubHeading>
      <p>{bioData.longBio}</p>
    </section>
  );
};

const SpeakerBio = ({
  bioData,
}: {
  bioData: SpeakerBioReturnType;
}): JSX.Element => {
  return (
    <section>
      <SubHeading>Speaker Bio</SubHeading>
      <p>{bioData.speakerBio}</p>
    </section>
  );
};

const FindMe = (): JSX.Element => {
  const queryResponse: FullQueryReturnType = useStaticQuery(talksQuery);
  return (
    <Layout>
      <SEO title="Find Me"></SEO>
      <Content withHeader={true}>
        <PageHeading>About Me</PageHeading>
        <SubHeading>That&apos;s a weird name</SubHeading>
        <MinorHeading>How do you pronounce it?</MinorHeading>
        <p>
          <span>Klee:</span>
          &nbsp;<span>It{"'"}s pronounced Clay, like dirt or mud.</span>
          <br />
          <span>Thomas:</span>&nbsp;
          <span>like the tank engine.</span>
        </p>
        <Bio bioData={queryResponse.bioJson} />
        <SpeakerBio bioData={queryResponse.bioJson} />
      </Content>
    </Layout>
  );
};

export default FindMe;
