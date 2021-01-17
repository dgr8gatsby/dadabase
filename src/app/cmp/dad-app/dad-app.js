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
    let joke = {
      _id: '5ff2a2559a9139b56320de0b',
      __v: 0,
      headline: 'What is a pirates favorite letter?',
      punchline: "You might think that it is 'R' but they really like the 'C'",
      type: 'question',
      why: "This joke is usually told after another pirate joke where the punchline is 'Arrr.' So people will think that the answer is 'R' to equate to the Arrr saying of a pirate, however this joke has a twist and says C meaning 'Sea' since pirates are always on ships in the sea.",
    };
    let _testDadJoke = new DadJoke (joke);
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
