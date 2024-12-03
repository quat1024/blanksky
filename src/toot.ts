import { FeedViewPost, isReasonRepost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import f from "./facon2";
import { BlankskyAvatar } from "./avatar";

//im calling them toots idc what anyone says
export class BlankskyToot extends HTMLElement {
  private post: FeedViewPost;
  
  constructor(post: FeedViewPost) {
    super();
    this.post = post;
  }
  
  connectedCallback() {
    const p = this.post;
    
    //TODO TODO: maybe skip the post if it's a reply to someone u dont follow??
    //logic probably doesn't belong here
    
    //"reposted by"
    if(isReasonRepost(p.reason)) {
      this.appendChild(f`<div class="snackbar">${`reposted by ${p.reason.by.handle}`}</div>`)
    }
    
    //avatar
    this.appendChild(new BlankskyAvatar(p.post.author));
    
    //if there's a display name, use the display name as the top author line
    //and the handle as the lower one. if there's no display name, use the handle
    //as the top author line and omit the lower one
    const author = p.post.author;
    if(author.displayName) {
      this.appendChild(f`<div class="author1">${p.post.author.displayName}</div>`);
      this.appendChild(f`<div class="author2">@${p.post.author.handle}</div>`); //prefix "@"
    } else {
      this.appendChild(f`<div class="author1">${p.post.author.handle}</div>`);
    }
    
    //text
    const t = (p.post.record as any).text;
    if(t) {
      this.appendChild(f`<div class="body">${t || "<no text>"}</div>`);
    }
    
    //interaction buttons
    const reply = f`<div class="interaction-button-placeholder"></div>`;
    const reblog = f`<div class="interaction-button-placeholder"></div>`;
    const fav = f`<div class="interaction-button-placeholder"></div>`;
    const menu = f`<div class="interaction-button-placeholder"></div>`;
    this.appendChild(f`<div class="interaction">${reply}${reblog}${fav}${menu}</div>`);
  }
}
customElements.define("blanksky-toot", BlankskyToot);