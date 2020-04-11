import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { HighlightColor } from "../colors";
const Box = styled.div`
  border: 2px solid ${HighlightColor};
  padding: 1rem;
`;
const bioQuery = graphql`
  query SpeakerBio {
    bioJson {
      speakerBio
    }
  }
`;
type SpeakerBioReturnType = {
  bioJson: {
    id: string;
    speakerBio: string;
  };
};
const Bio = ({ bioData }: { bioData: SpeakerBioReturnType }): JSX.Element => {
  return (
    <section>
      <h1>Speaker Bio</h1>
      <Box>
        <p>{bioData.bioJson.speakerBio}</p>
      </Box>
    </section>
  );
};

const IndexPage = () => {
  const bioData = useStaticQuery(bioQuery);
  return (
    <Layout>
      <SEO title="Home" />
      {/* <StaticQuery query={bioQuery} render={renderBio} /> */}
      <Bio bioData={bioData} />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;
