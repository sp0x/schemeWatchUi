import React from 'react';
import { compose } from 'recompose';
import Layout from '../utils/layout';
import { graphql } from 'gatsby';
import {  
  withEmailVerification,
} from '../utils/Session';
import Home from '../components/scenes/Home/Home';

const HomePage = compose(
  withEmailVerification  
)(Home);

export default () => {
  return (
    <Layout hideNav>
      <HomePage />
    </Layout>
  );
};

export const query = graphql`
  query HomeSeo {
    site {
      siteMetadata {
        home {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl: url
          defaultImage: image
          twitterUsername
        }
      }
    }
  }
`;
