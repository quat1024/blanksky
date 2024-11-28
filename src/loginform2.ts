import { LOGIN_HANDLER, LoginHandler } from "./accountcontext";
import { setPreparationHook } from "./elemutil";
import { ask } from "./eventutil";
import { PASSWORD, USERNAME } from "./ignore/placeholder_auth_lmao";

export function createLoginForm(): HTMLElement {
  const form = document.createElement("form");

  const serviceField = document.createElement("input");
  const identifierField = document.createElement("input");
  const passField = document.createElement("input");
  passField.type = "password";

  const throbber = document.createElement("output");

  form.append(
    pWrap(...label("service", "blanksky-login-service", serviceField)),
    pWrap(...label("identifier", "blanksky-login-identifier", identifierField)),
    pWrap(...label("password", "blanksky-login-pass", passField)),
  );

  //FOR TESTING LOL
  serviceField.value = "https://bsky.social/";
  identifierField.value = USERNAME;
  passField.value = PASSWORD;

  setPreparationHook(form, (_) => {
    const loginHandler: LoginHandler = ask(form, LOGIN_HANDLER)!;
    
    const submit = document.createElement("button");
    submit.textContent = "log in";

    form.append(pWrap(submit, throbber));

    submit.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      //this is where i'd do some basic form validation, i think

      throbber.textContent = "working...";
      loginHandler(serviceField.value, identifierField.value, passField.value);
    });
  });

  return form;
}

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
