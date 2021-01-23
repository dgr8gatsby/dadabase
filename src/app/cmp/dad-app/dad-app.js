const ELEMENT_NAME = 'dad-app';
import template from './dad-app.html.js';
import style from './dad-app.css.js';
import _DadLink from '../dad-link/dad-link.js';
import DadJoke from '../dad-joke/dad-joke.js';
import Navigo from 'navigo';

const router = new Navigo ('/', {hash: true});
const DEFAULT_SCREEN = 'dad-joke';

export default class DadApp extends HTMLElement {
  constructor () {
    super ();
    this.shadow = this.attachShadow ({
      mode: 'open',
    });

    router.on ('/', async () => {});

    router.on ('/coffee', () => {
      alert ('coffee!');
    });

    router.on ('/random', async () => {
      let joke = await this.fetchRandomJoke ();
      this.currentJoke = joke;
      router.navigate (`/joke/${joke._id}`);
    });

    router.on ('/joke/:id', async url => {
      if (this.currentJoke !== null && this.currentJoke._id === url.data.id) {
        this.displayJoke (this.currentJoke);
      } else {
        this.fetchJokeById (url.data.id);
      }
    });
  }

  props = {};
  screen = null;
  currentJoke = null;

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
    return joke;
  }

  async fetchJokeById (id) {
    const response = await fetch (`/api/joke/${id}`);
    let joke = await response.json ();
    this.displayJoke (joke);
  }

  // Render a component in the placeholder for a screen
  displayScreen (name) {
    const screenElement = this.shadowRoot.querySelector ("p[name='screens']");
    screenElement.innerHTML = '';
    screenElement.innerHTML = `<${name}></${name}>`;
  }

  displayJoke (joke) {
    let RandomdDadJoke = new DadJoke (joke);
    const screenElement = this.shadowRoot.querySelector ("p[name='screens']");
    screenElement.innerHTML = '';
    screenElement.appendChild (RandomdDadJoke);
  }

  connectedCallback () {
    this.render ();
    //this.loadScreen ();
  }

  render () {
    this.shadowRoot.innerHTML = template (style, this.props);
  }
}

customElements.define (ELEMENT_NAME, DadApp);
