const ELEMENT_NAME = 'dad-app';
import template from './dad-app.html.js';
import style from './dad-app.css.js';
const DEFAULT_SCREEN = 'dad-joke';

export default class DadApp extends HTMLElement {
  constructor () {
    super ();
    this.shadow = this.attachShadow ({
      mode: 'open',
    });
  }

  props = {};

  async loadScreen (name = DEFAULT_SCREEN) {
    if (customElements.get(name) != undefined) {
      this.displayScreen(name);
    } else {
      try {
        let screenPath = ./
      }
    }
  }
  connectedCallback () {
    this.render ();
  }

  render () {
    this.shadowRoot.innerHTML = template (style, this.props);
  }
}

customElements.define (ELEMENT_NAME, DadApp);
