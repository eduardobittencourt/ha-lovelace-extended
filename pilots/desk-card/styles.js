export const css = `
:host { display:block; color:var(--primary-text-color,#202124); font-size:var(--fcc-font-size,1rem); }
* { box-sizing:border-box; }
article { background:var(--ha-card-background,var(--card-background-color,#fff)); border:1px solid var(--divider-color,#bbb); border-radius:12px; padding:12px; min-width:0; }
button,input { font:inherit; color:inherit; }
button { min-height:44px; border:1px solid var(--divider-color,#aaa); border-radius:8px; padding:8px; background:var(--secondary-background-color,#f3f3f3); white-space:normal; overflow-wrap:anywhere; cursor:pointer; }
button:disabled { cursor:default; opacity:.65; }
button:focus-visible,input:focus-visible { outline:3px solid var(--primary-color,#0070c9); outline-offset:2px; }
.identity { display:flex; width:100%; text-align:start; align-items:start; gap:8px; background:transparent; border:0; }
.identity:disabled { opacity:1; }
.information { display:grid; gap:6px; min-width:0; overflow-wrap:anywhere; }
.primary,.additional { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; margin-top:12px; }
.position { display:grid; gap:8px; margin-top:12px; min-width:0; }
input[type=range] { width:100%; min-width:0; min-height:44px; margin:0; touch-action:pan-y; }
.slot { display:grid; align-content:start; gap:4px; min-width:0; }
.slot button { width:100%; }
.status,.validation,.helper { font-size:.85em; overflow-wrap:anywhere; }
.status:empty,.validation:empty { display:none; }
.validation { color:var(--error-color,#b00020); }
ha-icon { flex:none; width:24px; height:24px; }
@media(max-width:300px) { .primary,.additional { gap:6px; } }
`;
