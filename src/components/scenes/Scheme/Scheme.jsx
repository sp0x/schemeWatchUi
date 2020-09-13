import React, { Component } from 'react';
import { withFirebase } from '../../../utils/Firebase';

class Scheme extends Component {
  _initFirebase = false;

  state = {
    scheme: null,
    loading: true,
  };

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.getScheme();
    }
  };

  componentDidMount() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      this.firebaseInit();
    }
  }

  componentDidUpdate() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      this.firebaseInit();
    }
  }

  getScheme = () => {
    const { firebase, site } = this.props;

    firebase
      .scheme({ site })
      .get()
      .then(result => {
        this.setState({
          scheme: result.docs && result.docs[0].data(),
          loading: false,
        });
      });
  };

  render() {
    const { loading, scheme } = this.state;
    const { isLoaded, title, description, site } = this.props;

    const finalDescription = isLoaded
      ? site
      : scheme && `Got ${scheme.results} results in total`;
    const finalTitle = isLoaded ? title : scheme && scheme.site;

    if (!isLoaded && loading) return null;

    return (
      <div className="scheme container">
        <h1>{finalTitle}</h1>
        <div>{finalDescription}</div>
      </div>
    );
  }
}

export default withFirebase(Scheme);
