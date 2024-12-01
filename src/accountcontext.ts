import AtpAgent from "@atproto/api";
import { makeContext, ContextType, provide } from "./eventutil";

export type LoginHandler = (service: string, identifier: string, password: string) => Promise<void>;

export const CURRENT_AGENT: ContextType<AtpAgent | undefined> = makeContext("blanksky-accountContext");
export const LOGIN_HANDLER: ContextType<LoginHandler> = makeContext("blanksky-doLogin");

export class BlankskyAccountContext extends HTMLElement {
  agent: AtpAgent | undefined = undefined;
  
  connectedCallback() {
    provide(this, CURRENT_AGENT, () => this.agent);
    provide(this, LOGIN_HANDLER, () => this.doLogin.bind(this));
  }
  
  async doLogin(service: string, identifier: string, password: string) {
    const newAgent = new AtpAgent({service});
    await newAgent.login({identifier, password});
    
    this.agent = newAgent;
  }
}
customElements.define("blanksky-account-context", BlankskyAccountContext);