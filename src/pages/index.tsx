import { graphql } from "gatsby";
import { groupBy, toPairs } from "lodash";
import React from "react";
import { Helmet } from "react-helmet";
import "./styles.css";
import "./tailwind.min.css";

interface AllSitesCSV {
  edges: Edge[];
}

interface Edge {
  node: Node;
}

interface Node {
  group: string;
  name: string;
  desc: string;
  url: string;
}

interface HomeProps extends React.Props<HomeProps> {
  data: {
    allSitesCsv: AllSitesCSV
  }
}

const home = (props: HomeProps) => {
  const { data } = props
  const sitesGroup = toPairs(groupBy(data.allSitesCsv.edges, 'node.group'))

  return (
    <div>
      <div className="header-bg p-16 text-center text-white text-5xl font-bold">消费者维权导航</div>
      <div className="relative mx-6 md:mx-auto" style={{ top: '-64px', maxWidth: '1000px' }}>
        {
          sitesGroup.map(([groupName, siteInfos]) => {
            return (
              <div key={groupName} className="bg-white mt-10 p-6 rounded-lg shadow-xl">
                <div className="text-center text-xl mb-6">{groupName}</div>
                <div className="h-px bg-gray-200"></div>
                <div className="md:flex flex-wrap -mx-2">
                  {
                    siteInfos.map(({ node: site }) => {
                      return (
                        <a className="block mt-6 md:w-1/4 px-2" key={site.url} href={site.url} target="_blank" rel="noreferrer noopener">
                          <div className="border bg-white border-gray-200 p-4 hover-up rounded">
                            <div className="truncate">{site.name}</div>
                            <div className="truncate">{site.desc}</div>
                          </div>
                        </a>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default home;
export const pageQuery = graphql`query {
  allSitesCsv {
    edges {
      node {
        group
        name
        desc
        url
      }
    }
  }
}`