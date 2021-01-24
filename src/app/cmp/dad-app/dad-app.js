const ELEMENT_NAME = 'dad-app';
import template from './dad-app.html.js';
import style from './dad-app.css.js';
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
    this.next = this.next.bind (this);
    this.prev = this.prev.bind (this);
    this.getInitialJokes ();

    // handle application routes
    router.on ('/', async () => {});

    router.on ('/joke/:id', async url => {
      if (this.currentJoke !== null && this.currentJoke._id === url.data.id) {
        this.displayJoke (this.currentJoke);
      } else {
        this.fetchJokeById (url.data.id);
      }
    });

    router.on ('/jokes', async url => {
      const response = await fetch ('/api/jokes');
      console.log (response);
    });
  }

  props = {};
  screen = null;
  currentJoke = 0;
  jokes = [];

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
    }
  }

  async fetchJokeById (id) {
    const response = await fetch (`/api/joke/${id}`);
    let joke = await response.json ();
    this.displayJoke (joke);
  }

  async getInitialJokes () {
    const response = await fetch ('/api/jokes');
    this.jokes = await response.json ();
    this.next ();
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

  next () {
    if (this.currentJoke < this.jokes.length - 1) {
      this.currentJoke++;
    } else {
      this.currentJoke = 0;
    }

    router.navigate (`joke/${this.jokes[this.currentJoke]}`);
    //this.fetchJokeById (this.jokes[this.currentJoke]);
  }

  prev () {
    if (this.currentJoke > 1) {
      this.currentJoke--;
    } else {
      this.currentJoke = this.jokes.length - 1;
    }

    router.navigate (`joke/${this.jokes[this.currentJoke]}`);
    //this.fetchJokeById (this.jokes[this.currentJoke]);
  }

  connectedCallback () {
    this.render ();
    const nextButton = this.shadowRoot.querySelector ("button[name='next']");
    const prevButton = this.shadowRoot.querySelector ("button[name='prev']");
    nextButton.addEventListener ('click', this.next);
    prevButton.addEventListener ('click', this.prev);
  }

  render () {
    this.shadowRoot.innerHTML = template (style, this.props);
  }
}

customElements.define (ELEMENT_NAME, DadApp);
