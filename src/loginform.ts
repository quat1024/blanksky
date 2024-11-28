import f from "facon";
import { PASSWORD, USERNAME } from "./ignore/placeholder_auth_lmao";

export class BlankskyLoginForm extends HTMLElement {
  ready: boolean = false;
  
  service!: HTMLInputElement;
  identifier!: HTMLInputElement;
  password!: HTMLInputElement;
  submit!: HTMLButtonElement;
  
  connectedCallback() {
    if(this.ready) return;
    
    const form = f`
      <form>
        <h1>log in</h1>
        <input ref="service" type="text" placeholder="service" value="https://bsky.social" />
        <input ref="identifier" type="text" placeholder="identifier" value="${USERNAME}"/>
        <input ref="password" type="password" placeholder="password" value="${PASSWORD}"/>
        <button ref="submit">log in</button>
      </form>
    `;
    
    form.collect({to: this});
    
    this.submit.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      
      //this is where i'd do some basic form validation, i think
      
      // this.dispatchEvent(new LoginEvent({
      //   service: this.service.value,
      //   identifier: this.identifier.value,
      //   password: this.password.value
      // }));
      
      console.log("dispatchEvent finished");
    });
    
    this.appendChild(form);
    this.ready = true;
  }
}

customElements.define("blanksky-loginform", BlankskyLoginForm);