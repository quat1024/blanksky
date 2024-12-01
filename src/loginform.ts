import { LOGIN_HANDLER, LoginHandler } from "./accountcontext";
import { ask } from "./eventutil";
import { PASSWORD, USERNAME } from "./ignore/placeholder_auth_lmao";

function pWrap(...e: HTMLElement[]): HTMLElement {
  const p = document.createElement("p");
  p.append(...e);
  return p;
}

type HTMLFormishElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLButtonElement;

function label(
  lbl: string,
  id: string,
  control: HTMLFormishElement,
): HTMLElement[] {
  control.id = id;

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = lbl;

  return [label, control];
}

export class BlankskyLoginForm extends HTMLElement {
  connectedCallback() {
    const loginHandler: LoginHandler = ask(this, LOGIN_HANDLER)!;

    const serviceField = document.createElement("input");
    const identifierField = document.createElement("input");
    const passField = document.createElement("input");
    passField.type = "password";

    const submit = document.createElement("button");
    submit.textContent = "log in";
    const throbber = document.createElement("output");

    this.append(
      pWrap(...label("service", "blanksky-login-service", serviceField)),
      pWrap(
        ...label("identifier", "blanksky-login-identifier", identifierField),
      ),
      pWrap(...label("password", "blanksky-login-pass", passField)),
      pWrap(submit, throbber),
    );

    submit.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      //this is where i'd do some basic form validation, i think

      throbber.textContent = "working...";
      await loginHandler(
        serviceField.value,
        identifierField.value,
        passField.value,
      );
      window.location.hash = "/following";
    });

    //FOR TESTING LOL
    serviceField.value = "https://bsky.social/";
    identifierField.value = USERNAME;
    passField.value = PASSWORD;
  }
}
customElements.define("blanksky-loginform", BlankskyLoginForm);
