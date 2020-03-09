import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

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
`
type TalkQueryReturnType = {
  allTalksJson: {
    edges: [
      {
        node: {
          title: string
          givenAt: [
            {
              link: string
              name: string
              date: string
            }
          ]
          abstract: string
        }
      }
    ]
  }
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <StaticQuery query={talksQuery} render={blah} />
  </Layout>
)

const blah = (graph: TalkQueryReturnType): JSX.Element => {
  const data = objectify(graph)
  return TalksGrid(data)
}

type SpeakingEvent = {
  link: string
  name: string
  date: Date
}

type Talk = {
  title: string
  abstract: string
  givenAt: Array<SpeakingEvent>
}

const objectify = (graph: TalkQueryReturnType): Array<Talk> => {
  const x = graph.allTalksJson.edges.map(y => y.node)
  return x.map(y => ({
    ...y,
    givenAt: y.givenAt.map(z => ({ ...z, date: new Date(z.date) })),
  }))
}

const TalksGrid = (data: Array<Talk>) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {data.map(talk => {
        return (
          <tr>
            <td>{talk.title}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

export default IndexPage
