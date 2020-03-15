import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

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
      <p>{bioData.bioJson.speakerBio}</p>
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
