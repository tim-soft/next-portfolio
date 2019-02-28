import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

/**
 * Creates a SSR + next.js friendly React Portal inside <body />
 */
export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.portalContainer = document.createElement('div');
  }

  componentDidMount() {
    // Get the document body
    this.body = document.body;

    // Create a container <div /> for portal
    this.portalContainer = document.createElement('div');

    // Append the container to the document body
    this.body.appendChild(this.portalContainer);

    this.forceUpdate();
  }

  componentWillUnmount() {
    this.body.removeChild(this.portalContainer);
  }

  render() {
    if (this.portalContainer === undefined) {
      return null;
    }

    const { props } = this;

    return ReactDOM.createPortal(<Modal {...props} />, this.portalContainer);
  }
}
