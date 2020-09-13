import React, { Component } from 'react';
import { Link } from 'gatsby';
import { withFirebase } from '../../../utils/Firebase';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import Loading from '../../atoms/Loading';
import Image from '../../atoms/Image';

class Home extends Component {
  _initFirebase = false;

  state = {
    schemes: [],
    loading: true,
    title: '',
    description: '',
  };

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.getSchemes();
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  getSchemes = () => {
    const { firebase } = this.props;

    firebase
      .schemes()
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(item => item.data());
        console.log(data);
        this.setState({
          schemes: data,
          loading: false,
        });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { schemes, description, title, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div className="home container">
        <div className="home__details">
          <h1 className="home__title">Scheme Watcher</h1>
          <p className="home__description">
            Your scraping schemes
          </p>
        </div>

        <div className="home__schemes">
          <div className="home__schemes__items">
            {schemes &&
              schemes.length > 0 &&
              schemes.map((item, id) => (
                <div key={id} className="home__scheme">
                  <Link
                    className="home__scheme__title"
                    to={'/scheme/' + item.site}
                  >
                    <Image
                      className="home__scheme__image"
                      filename="gatsby-post-bg.jpg"
                    />
                    <div className="home__scheme__text">
                      {item.site && item.site < 30
                        ? item.site
                        : item.site.slice(0, 30) + '...'}
                      <div
                        className="home__scheme__description"
                        key={id}
                      >
                        {item.code &&
                        item.code.length > 150
                          ? item.code.slice(0, 150)
                          : item.code + '...'}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
