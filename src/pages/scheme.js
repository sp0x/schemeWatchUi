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
      pageContext: { title, description },
    } = this.props;

    return (
      <Layout hideNav>
        <SchemePage
          title={title}
          description={description}
          slug={this.props['*']}
          isLoaded={false}
        />
      </Layout>
    );
  }
}

export default Scheme;
