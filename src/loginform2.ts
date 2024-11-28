import { PASSWORD, USERNAME } from "./ignore/placeholder_auth_lmao";
import { LoginEvent } from "./loginform";

export function createLoginForm(): HTMLElement {
  const form = document.createElement("form");

  const serviceField = document.createElement("input");
  const identifierField = document.createElement("input");
  const passField = document.createElement("input");
  passField.type = "password";
  const submit = document.createElement("button");
  submit.textContent = "log in"
  
  const throbber = document.createElement("output");

  form.append(
    pWrap(...label("service", "blanksky-login-service", serviceField)),
    pWrap(...label("identifier", "blanksky-login-identifier", identifierField)),
    pWrap(...label("password", "blanksky-login-pass", passField)),
    pWrap(submit, throbber)
  );
  
  submit.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    
    //this is where i'd do some basic form validation, i think
    
    throbber.textContent = "working...";
    form.dispatchEvent(new LoginEvent({
      service: serviceField.value,
      identifier: identifierField.value,
      password: passField.value
    }));
    console.log("dispatchEvent finished");
  });
  
  //FOR TESTING
  serviceField.value = "https://bsky.social/"
  identifierField.value = USERNAME;
  passField.value = PASSWORD;

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
