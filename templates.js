'use strict';

module.exports = [
  {
    path: '/scheme', // the url of the page, example /scheme/scheme-site
    collection: 'schemes', // the name of the collection from firestore
    param: 'site', // the parameter from url, the equivalent of /scheme/:param
    context: ['site', 'title', 'description'], // the fields from the collection that will be requested at build time, then you can access the data from this.props.pageContext
    fileName: 'scheme', // the file from pages folder
  },
];
