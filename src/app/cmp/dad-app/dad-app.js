const ELEMENT_NAME = 'dad-app';
import template from './dad-app.html.js';
import style from './dad-app.css.js';
import _DadLink from '../dad-link/dad-link.js';
import _DadError from '../dad-error/dad-error.js';
const DEFAULT_SCREEN = 'dad-joke';
const ERROR_COMPONENT = 'dad-error';

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
    if (customElements.get (name) != undefined) {
      this.displayScreen (name);
    } else {
      let screenPath = `./cmp/${name}/${name}.js`;
      const screenConstructor = await import (screenPath)
        .catch (console.error)
        .then (() => {
          let message = `${name} element might not exist just yet, this is the ${screenPath}`;
          console.error (message, 'ModuleLoad');
          this.displayScreen (ERROR_COMPONENT);
          return;
        });
      this.screen = screenConstructor;
      this.displayScreen (name);
    }
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
