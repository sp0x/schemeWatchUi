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

    const statusMap = { "ok-data": "ok with-data", "ok": "ok" };
    return (
      <div className="home container">
        <div className="home__details">
          <h1 className="home__title">Scheme Watcher</h1>
          <p className="home__description">
            Keep track of your scraping schemes, ensuring they're always running well.
          </p>
        </div>

        <div className="home__schemes">
          <div className="home__schemes__items">
            <ul className="list-group status-list">
              {schemes &&
                schemes.length > 0 &&
                schemes.map((item, id) => (
                  <li key={id} className={`home__scheme list-group-item status-light ${statusMap[item.code]}`}>
                    <p>
                      <Link
                        className="home__scheme__title"
                        to={'/scheme/' + item.site}>
                        {item.site}
                      </Link>
                    </p>
                    <div className="scheme_description">
                      {`With ${item.results} results gathered.`}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
