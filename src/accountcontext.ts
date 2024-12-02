import AtpAgent, {
  Agent,
  AtpSessionData,
  CredentialSession,
} from "@atproto/api";
import { ContextType, makeContext, provide } from "./eventutil";

export type LoginHandler = (
  service: string,
  identifier: string,
  password: string,
) => Promise<void>;

export const CURRENT_AGENT: ContextType<Agent | undefined> = makeContext(
  "blanksky-accountContext",
);
export const LOGIN_HANDLER: ContextType<LoginHandler> = makeContext(
  "blanksky-doLogin",
);

type StoredLogin = {
  v: number;
  service: string;
  data: AtpSessionData;
};

function makeCredentialSession(service: string) {
  return new CredentialSession(
    new URL(service),
    fetch,
    (evt, data) => {
      console.log("SESSION EVENT", evt);

      if (!data || evt == "expired" || evt == "network-error") return;
      if (!data.accessJwt) {
        console.log("no jwt");
        return;
      }

      console.log("persisting login in localstorage");
      window.localStorage.setItem(
        "blanksky-login",
        JSON.stringify({ v: 0, data, service } as StoredLogin),
      );
    },
  );
}

export class BlankskyAccountContext extends HTMLElement {
  agent: Agent | undefined = undefined;

  connectedCallback() {
    provide(this, CURRENT_AGENT, () => this.agent);
    provide(this, LOGIN_HANDLER, () => this.loginWithUserPass.bind(this));
  }
  
  isLoggedIn() {
    return !!this.agent;
  }

  async loginWithUserPass(
    service: string,
    identifier: string,
    password: string,
  ) {
    const creds = makeCredentialSession(service);
    await creds.login({ identifier, password });

    this.agent = new Agent(creds);
  }

  async loginWithStoredSession(service: string, data: AtpSessionData) {
    const creds = makeCredentialSession(service);
    await creds.resumeSession(data);

    this.agent = new Agent(creds);
  }

  async tryResumeSession() {
    const storedloginStr = window.localStorage.getItem("blanksky-login");
    if (!storedloginStr) return;

    //log in again
    try {
      const storedlogin: StoredLogin = JSON.parse(storedloginStr);
      if (!storedlogin || storedlogin.v != 0) return;

      await this.loginWithStoredSession(storedlogin.service, storedlogin.data);
    } catch (e) {
      console.log("failed to resume session", e);
      //no harm no foul
    }
  }
}
customElements.define("blanksky-account-context", BlankskyAccountContext);
