import React from 'react';
import { Link } from 'gatsby';
import { HOME } from '../../../../constants/routes';

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={HOME}>Home</Link>
    </li>
  </ul>
);

export default NavigationNonAuth;
