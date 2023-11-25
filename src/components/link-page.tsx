import React from "react";
import { PageHeading } from "./headings";
import { ExternalLinkButton } from "./button";
import { windowBreakpoint } from "../spacing";
import styled from "styled-components";

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  margin: auto;
  gap: 1rem;
  @media (max-width: ${windowBreakpoint}) {
    width: 100%;
  }
`;

export const LinkPage = ({
  links,
  heading,
  subtext,
}: {
  links: { target: string; title: string }[];
  heading: string;
  subtext: string;
}) => (
  <LinkBox>
    <PageHeading>{heading}</PageHeading>
    <p>{subtext}</p>
    {links.map((d) => (
      <ExternalLinkButton key={d.target} href={d.target}>
        {d.title}
      </ExternalLinkButton>
    ))}
  </LinkBox>
);
