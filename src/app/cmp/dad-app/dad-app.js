const ELEMENT_NAME = 'dad-app';
import template from './dad-app.html.js';
import style from './dad-app.css.js';
import _DadLink from '../dad-link/dad-link.js';
const DEFAULT_SCREEN = 'dad-joke';

export default class DadApp extends HTMLElement {
  constructor () {
    super ();
    this.handleNavigate = this.handleNavigate.bind (this);
    this.shadow = this.attachShadow ({
      mode: 'open',
    });
  }

  props = {};
  screen = null;

  // Response to SPA navigation events
  handleNavigate (e) {
    this.loadScreen (e.detail);
  }

  // Dynamically load components
  async loadScreen (name = DEFAULT_SCREEN) {
    // if (customElements.get (name) != undefined) {
    //   this.displayScreen (name);
    // } else {
    try {
      let screenPath = `./cmp/${name}/${name}.js`;
      const screenConstructor = await import (screenPath);
      this.screen = screenConstructor;
      this.displayScreen (name);
    } catch (e) {
      err = new Error (`${name}.js might not exist, this is the ${screenPath}`);
      err.name = `ModuleLoad`;
      throw err;
    }
    // }
  }

  // Render a component in the placeholder for a screen
  displayScreen (name) {
    const screenElement = this.shadowRoot.querySelector ("p[name='screens']");
    screenElement.innerHTML = '';
    screenElement.innerHTML = `<${name}></${name}>`;
  }

  connectedCallback () {
    this.shadowRoot.addEventListener ('navigate', this.handleNavigate);
    this.render ();
    this.loadScreen ();
  }

  render () {
    this.shadowRoot.innerHTML = template (style, this.props);
  }
}

customElements.define (ELEMENT_NAME, DadApp);
