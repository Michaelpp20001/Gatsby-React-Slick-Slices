import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const SinglePizzaStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 2rem;
`;

// destructuring the data from the query
export default function SinglePizzaPage({ data }) {
  // destructuring pizza from the data object into a variable called pizza
  const { pizza } = data;
  return (
    <>
      {/* Nested chaining...Javascript turns these into drawn out if statement for each question mark */}
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <SinglePizzaStyles>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        <div>
          <h2>
            <span className="mark">{pizza.name}</span>
          </h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </SinglePizzaStyles>
    </>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
