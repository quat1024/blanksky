import { ProfileViewBasic } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import f from "./facon2";

export class BlankskyAvatar extends HTMLElement {
  private author: ProfileViewBasic;

  constructor(author: ProfileViewBasic) {
    super();
    this.author = author;
  }

  connectedCallback() {
    //avatar
    const avatar = this.author.avatar
      ? f`<img src=${this.author.avatar} width=40 height=40 />`
      : f`<div class="no-img"></div>`;

    //link
    const a = f`<a href=${`#/profile/${this.author.did}`}>${avatar}</a>`;

    this.appendChild(a);
  }
}
customElements.define("blanksky-avatar", BlankskyAvatar);
