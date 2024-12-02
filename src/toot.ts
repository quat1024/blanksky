import { FeedViewPost, isReasonRepost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import f from "./facon2";

//im calling them toots idc what anyone says
export class BlankskyToot extends HTMLElement {
  private post: FeedViewPost;
  
  constructor(post: FeedViewPost) {
    super();
    this.post = post;
  }
  
  connectedCallback() {
    const p = this.post;
    
    //"reposted by"
    const snackbar = f`<div class="snackbar">${isReasonRepost(p.reason) ? "reposted by " + p.reason.by.handle : ""}</div>`;
    
    //avatar
    const avatar = p.post.author.avatar ?
      f`<img src=${p.post.author.avatar} width=40 height=40 />` :
      f`<div class="no-avatar"></div>`;
      
    //name
    const authorName = f`<div class="post-author">${p.post.author.handle}</div>`;
    
    //text
    const t = (p.post.record as any).text;
    const text = f`<div class="post-body">${t || "<no text>"}</div>`;
    
    //interaction buttons
    const reply = f`<div class="interaction-button-placeholder"></div>`;
    const reblog = f`<div class="interaction-button-placeholder"></div>`;
    const fav = f`<div class="interaction-button-placeholder"></div>`;
    const menu = f`<div class="interaction-button-placeholder"></div>`;
    
    //assemble it
    const interactionRow = f`<div class="interaction-buttons">${reply}${reblog}${fav}${menu}</div>`;
    const postCol = f`<div class="author-text">${authorName}${text}</div>`;
    const postRow = f`<div class="avi-author-text">${avatar}${postCol}</div>`;
    
    this.append(snackbar, postRow, interactionRow);
  }
}
customElements.define("blanksky-toot", BlankskyToot);