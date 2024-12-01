import { BlankskyLoginForm } from "./loginform";
import { BlankskyTimeline } from "./timeline";

function clear(elem: Element) {
  while (elem.firstChild) elem.firstChild.remove();
}

export class BlankskyHashRouter extends HTMLElement {
  #abort: AbortController = new AbortController();

  connectedCallback() {
    window.addEventListener(
      "hashchange",
      (_) => this.route(window.location.hash),
      { signal: this.#abort.signal },
    );
  }

  disconnectedCallback() {
    this.#abort.abort();
  }

  route(hash: string) {
    if (hash.startsWith("#/")) hash = hash.slice(2);
    else if (hash.startsWith("#")) hash = hash.slice(1);

    console.log("routing to", hash);

    const split = hash.split("/");
    switch (split[0]) {
      case "login":
        clear(this);
        this.appendChild(new BlankskyLoginForm());
        break;
      case "following":
        clear(this);
        this.appendChild(new BlankskyTimeline());
        break;
      default:
        clear(this);
        this.textContent = "hashrouter 404... hash " + hash;
    }
  }
}
customElements.define("blanksky-hash-router", BlankskyHashRouter);
