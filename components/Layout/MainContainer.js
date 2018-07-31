import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DesktopContainer from '@/components/MainContainer/DesktopContainer';
import MobileContainer from '@/components/MainContainer/MobileContainer';

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer