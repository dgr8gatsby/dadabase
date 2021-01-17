const ELEMENT_NAME = 'dad-app';
import template from './dad-app.html.js';
import style from './dad-app.css.js';
import _DadLink from '../dad-link/dad-link.js';
import DadJoke from '../dad-joke/dad-joke.js';

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
    if (customElements.get (name) != undefined) {
      this.fetchRandomJoke ();
    } else {
      let screenPath = `./cmp/${name}/${name}.js`;
      const screenConstructor = await import (screenPath)
        .catch (console.error)
        .then (() => {
          let message = `${name} element might not exist just yet, this is the ${screenPath}`;
          console.error (message, 'ModuleLoad');
          return;
        });
      this.screen = screenConstructor;
      this.fetchRandomJoke ();
    }
  }

  async fetchRandomJoke () {
    const response = await fetch ('/api/random');
    let joke = await response.json ();
    this.displayJoke (joke);
  }

  async fetchJokeById (id) {}

  // Render a component in the placeholder for a screen
  displayScreen (name) {
    const screenElement = this.shadowRoot.querySelector ("p[name='screens']");
    screenElement.innerHTML = '';
    screenElement.innerHTML = `<${name}></${name}>`;
  }

  displayJoke (joke) {
    let RandomtDadJoke = new DadJoke (joke);

    const screenElement = this.shadowRoot.querySelector ("p[name='screens']");
    screenElement.innerHTML = '';
    screenElement.appendChild (RandomtDadJoke);
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
