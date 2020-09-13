import React, { Component } from 'react';
import Layout from '../utils/layout';
import SchemeBase from '../components/scenes/Scheme/Scheme';
import { compose } from 'recompose';
import {
  withAuthorization,
  withEmailVerification,
} from '../utils/Session';

const SchemePage = compose(
  withEmailVerification  
)(SchemeBase);

export class Scheme extends Component {
  render() {
    const {
      pageContext: { title, description, site },
      uri,
    } = this.props;

    const uriItems = uri.split('/');

    const uriSlug = uriItems[uriItems.length - 1];

    const isLoaded = uriSlug === site;

    return (
      <Layout hideNav>
        <SchemePage
          title={title}
          description={description}
          site={site || uriSlug}
          isLoaded={isLoaded}
        />
      </Layout>
    );
  }
}

export default Scheme;
