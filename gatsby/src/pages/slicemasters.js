import { graphql } from 'gatsby';
import React from 'react';

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  console.log(slicemasters);
  return (
    <div>
      <p>Hey! I'm the slicemasters page</p>
    </div>
  );
}

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
