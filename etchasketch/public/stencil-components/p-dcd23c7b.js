const t="stencil-components";let e,n,l,o=!1,s=!1,r=!1,c=!1;const i="undefined"!=typeof window?window:{},a=i.CSS,u=i.document||{head:{}},f={t:0,l:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,l)=>t.addEventListener(e,n,l),rel:(t,e,n,l)=>t.removeEventListener(e,n,l)},p=(()=>(u.head.attachShadow+"").indexOf("[native")>-1)(),m=t=>Promise.resolve(t),$=(()=>{try{return new CSSStyleSheet,!0}catch(t){}return!1})(),d=new WeakMap,h=t=>"sc-"+t,w={},y=t=>"object"==(t=typeof t)||"function"===t,b=(t,e,...n)=>{let l=null,o=null,s=!1,r=!1,c=[];const i=e=>{for(let n=0;n<e.length;n++)l=e[n],Array.isArray(l)?i(l):null!=l&&"boolean"!=typeof l&&((s="function"!=typeof t&&!y(l))&&(l+=""),s&&r?c[c.length-1].o+=l:c.push(s?_(null,l):l),r=s)};if(i(n),e){e.name&&(o=e.name);{const t=e.className||e.class;t&&(e.class="object"!=typeof t?t:Object.keys(t).filter(e=>t[e]).join(" "))}}if("function"==typeof t)return t(null===e?{}:e,c,j);const a=_(t,null);return a.s=e,c.length>0&&(a.u=c),a.p=o,a},_=(t,e)=>({t:0,$:t,o:e,h:null,u:null,s:null,p:null}),v={},j={forEach:(t,e)=>t.map(g).forEach(e),map:(t,e)=>t.map(g).map(e).map(R)},g=t=>({vattrs:t.s,vchildren:t.u,vkey:t._,vname:t.p,vtag:t.$,vtext:t.o}),R=t=>{const e=_(t.vtag,t.vtext);return e.s=t.vattrs,e.u=t.vchildren,e._=t.vkey,e.p=t.vname,e},k=(t,e,n,l,o,s)=>{if(n!==l){let c=et(t,e);if(e.toLowerCase(),"class"===e){const e=t.classList,o=S(n),s=S(l);e.remove(...o.filter(t=>t&&!s.includes(t))),e.add(...s.filter(t=>t&&!o.includes(t)))}else{const i=y(l);if((c||i&&null!==l)&&!o)try{if(t.tagName.includes("-"))t[e]=l;else{let o=null==l?"":l;"list"===e?c=!1:null!=n&&t[e]==o||(t[e]=o)}}catch(r){}null==l||!1===l?t.removeAttribute(e):(!c||4&s||o)&&!i&&t.setAttribute(e,l=!0===l?"":l)}}},M=/\s/,S=t=>t?t.split(M):[],U=(t,e,n,l)=>{const o=11===e.h.nodeType&&e.h.host?e.h.host:e.h,s=t&&t.s||w,r=e.s||w;for(l in s)l in r||k(o,l,s[l],void 0,n,e.t);for(l in r)k(o,l,s[l],r[l],n,e.t)},L=(t,s,c,i)=>{let a,f,p,m=s.u[c],$=0;if(o||(r=!0,"slot"===m.$&&(e&&i.classList.add(e+"-s"),m.t|=m.u?2:1)),null!==m.o)a=m.h=u.createTextNode(m.o);else if(1&m.t)a=m.h=u.createTextNode("");else if(a=m.h=u.createElement(2&m.t?"slot-fb":m.$),U(null,m,!1),null!=e&&a["s-si"]!==e&&a.classList.add(a["s-si"]=e),m.u)for($=0;$<m.u.length;++$)f=L(t,m,$,a),f&&a.appendChild(f);return a["s-hn"]=l,3&m.t&&(a["s-sr"]=!0,a["s-cr"]=n,a["s-sn"]=m.p||"",p=t&&t.u&&t.u[c],p&&p.$===m.$&&t.h&&O(t.h,!1)),a},O=(t,e)=>{f.t|=1;const n=t.childNodes;for(let o=n.length-1;o>=0;o--){const t=n[o];t["s-hn"]!==l&&t["s-ol"]&&(T(t).insertBefore(t,P(t)),t["s-ol"].remove(),t["s-ol"]=void 0,r=!0),e&&O(t,e)}f.t&=-2},x=(t,e,n,o,s,r)=>{let c,i=t["s-cr"]&&t["s-cr"].parentNode||t;for(i.shadowRoot&&i.tagName===l&&(i=i.shadowRoot);s<=r;++s)o[s]&&(c=L(null,n,s,t),c&&(o[s].h=c,i.insertBefore(c,P(e))))},C=(t,e,n,l,o)=>{for(;e<=n;++e)(l=t[e])&&(s=!0,(o=l.h)["s-ol"]?o["s-ol"].remove():O(o,!0),o.remove())},E=(t,e)=>t.$===e.$&&("slot"!==t.$||t.p===e.p),P=t=>t&&t["s-ol"]||t,T=t=>(t["s-ol"]?t["s-ol"]:t).parentNode,A=(t,e)=>{const n=e.h=t.h,l=t.u,o=e.u,s=e.o;let r;null===s?("slot"===e.$||U(t,e,!1),null!==l&&null!==o?((t,e,n,l)=>{let o,s=0,r=0,c=e.length-1,i=e[0],a=e[c],u=l.length-1,f=l[0],p=l[u];for(;s<=c&&r<=u;)null==i?i=e[++s]:null==a?a=e[--c]:null==f?f=l[++r]:null==p?p=l[--u]:E(i,f)?(A(i,f),i=e[++s],f=l[++r]):E(a,p)?(A(a,p),a=e[--c],p=l[--u]):E(i,p)?("slot"!==i.$&&"slot"!==p.$||O(i.h.parentNode,!1),A(i,p),t.insertBefore(i.h,a.h.nextSibling),i=e[++s],p=l[--u]):E(a,f)?("slot"!==i.$&&"slot"!==p.$||O(a.h.parentNode,!1),A(a,f),t.insertBefore(a.h,i.h),a=e[--c],f=l[++r]):(o=L(e&&e[r],n,r,t),f=l[++r],o&&T(i.h).insertBefore(o,P(i.h)));s>c?x(t,null==l[u+1]?null:l[u+1].h,n,l,r,u):r>u&&C(e,s,c)})(n,l,e,o):null!==o?(null!==t.o&&(n.textContent=""),x(n,null,e,o,0,o.length-1)):null!==l&&C(l,0,l.length-1)):(r=n["s-cr"])?r.parentNode.textContent=s:t.o!==s&&(n.data=s)},F=t=>{let e,n,l,o,s,r,c=t.childNodes;for(n=0,l=c.length;n<l;n++)if(e=c[n],1===e.nodeType){if(e["s-sr"])for(s=e["s-sn"],e.hidden=!1,o=0;o<l;o++)if(c[o]["s-hn"]!==e["s-hn"])if(r=c[o].nodeType,""!==s){if(1===r&&s===c[o].getAttribute("slot")){e.hidden=!0;break}}else if(1===r||3===r&&""!==c[o].textContent.trim()){e.hidden=!0;break}F(e)}},N=[],W=t=>{let e,n,l,o,r,c,i=0,a=t.childNodes,u=a.length;for(;i<u;i++){if(e=a[i],e["s-sr"]&&(n=e["s-cr"]))for(l=n.parentNode.childNodes,o=e["s-sn"],c=l.length-1;c>=0;c--)n=l[c],n["s-cn"]||n["s-nr"]||n["s-hn"]===e["s-hn"]||(q(n,o)?(r=N.find(t=>t.v===n),s=!0,n["s-sn"]=n["s-sn"]||o,r?r.j=e:N.push({j:e,v:n}),n["s-sr"]&&N.map(t=>{q(t.v,n["s-sn"])&&(r=N.find(t=>t.v===n),r&&!t.j&&(t.j=r.j))})):N.some(t=>t.v===n)||N.push({v:n}));1===e.nodeType&&W(e)}},q=(t,e)=>1===t.nodeType?null===t.getAttribute("slot")&&""===e||t.getAttribute("slot")===e:t["s-sn"]===e||""===e,B=(t,e)=>{e&&!t.g&&e["s-p"].push(new Promise(e=>t.g=e))},H=(t,e)=>{if(t.t|=16,4&t.t)return void(t.t|=512);const n=t.R,l=()=>V(t,n,e);return B(t,t.k),I(void 0,()=>pt(l))},V=(t,c,i)=>{const a=t.M,m=a["s-rc"];i&&(t=>{const e=t.S,n=t.M,l=e.t,o=((t,e)=>{let n=h(e.U),l=st.get(n);if(t=11===t.nodeType?t:u,l)if("string"==typeof l){let e,o=d.get(t=t.head||t);o||d.set(t,o=new Set),o.has(n)||(e=u.createElement("style"),e.innerHTML=l,t.insertBefore(e,t.querySelector("link")),o&&o.add(n))}else t.adoptedStyleSheets.includes(l)||(t.adoptedStyleSheets=[...t.adoptedStyleSheets,l]);return n})(p&&n.shadowRoot?n.shadowRoot:n.getRootNode(),e);10&l&&(n["s-sc"]=o,n.classList.add(o+"-h"))})(t),((t,c)=>{const i=t.M,a=t.S,m=t.L||_(null,null),$=(t=>t&&t.$===v)(c)?c:b(null,null,c);if(l=i.tagName,$.$=null,$.t|=4,t.L=$,$.h=m.h=i.shadowRoot||i,e=i["s-sc"],n=i["s-cr"],o=p&&0!=(1&a.t),s=!1,A(m,$),f.t|=1,r){let t,e,n,l,o,s;W($.h);let r=0;for(;r<N.length;r++)t=N[r],e=t.v,e["s-ol"]||(n=u.createTextNode(""),n["s-nr"]=e,e.parentNode.insertBefore(e["s-ol"]=n,e));for(r=0;r<N.length;r++)if(t=N[r],e=t.v,t.j){for(l=t.j.parentNode,o=t.j.nextSibling,n=e["s-ol"];n=n.previousSibling;)if(s=n["s-nr"],s&&s["s-sn"]===e["s-sn"]&&l===s.parentNode&&(s=s.nextSibling,!s||!s["s-nr"])){o=s;break}(!o&&l!==e.parentNode||e.nextSibling!==o)&&e!==o&&(!e["s-hn"]&&e["s-ol"]&&(e["s-hn"]=e["s-ol"].parentNode.nodeName),l.insertBefore(e,o))}else 1===e.nodeType&&(e.hidden=!0)}s&&F($.h),f.t&=-2,N.length=0})(t,z(c)),t.t&=-17,t.t|=2,m&&(m.map(t=>t()),a["s-rc"]=void 0);{const e=a["s-p"],n=()=>D(t);0===e.length?n():(Promise.all(e).then(n),t.t|=4,e.length=0)}},z=t=>{try{t=t.render()}catch(e){nt(e)}return t},D=t=>{const e=t.M,n=t.k;64&t.t||(t.t|=64,J(e),t.O(e),n||G()),t.g&&(t.g(),t.g=void 0),512&t.t&&ft(()=>H(t,!1)),t.t&=-517},G=()=>{J(u.documentElement),ft(()=>(e=>{const n=new CustomEvent("appload",{detail:{namespace:t}});return e.dispatchEvent(n),n})(i))},I=(t,e)=>t&&t.then?t.then(e):e(),J=t=>t.classList.add("hydrated"),K=(t,e,n)=>{if(e.C){const l=Object.entries(e.C),o=t.prototype;if(l.map(([t,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(o,t,{get(){return((t,e)=>Y(this).P.get(e))(0,t)},set(n){((t,e,n,l)=>{const o=Y(this),s=o.P.get(e),r=o.t,c=o.R;n=((t,e)=>null==t||y(t)?t:4&e?"false"!==t&&(""===t||!!t):1&e?t+"":t)(n,l.C[e][0]),8&r&&void 0!==s||n===s||(o.P.set(e,n),c&&2==(18&r)&&H(o,!1))})(0,t,n,e)},configurable:!0,enumerable:!0})}),1&n){const e=new Map;o.attributeChangedCallback=function(t,n,l){f.jmp(()=>{const n=e.get(t);this[n]=(null!==l||"boolean"!=typeof this[n])&&l})},t.observedAttributes=l.filter(([t,e])=>15&e[0]).map(([t,n])=>{const l=n[1]||t;return e.set(l,t),l})}}return t},Q=(t,e={})=>{const n=[],l=e.exclude||[],o=i.customElements,s=u.head,r=s.querySelector("meta[charset]"),c=u.createElement("style"),a=[];let m,d=!0;Object.assign(f,e),f.l=new URL(e.resourcesUrl||"./",u.baseURI).href,t.map(t=>t[1].map(e=>{const s={t:e[0],U:e[1],C:e[2],T:e[3]};s.C=e[2],!p&&1&s.t&&(s.t|=8);const r=s.U,c=class extends HTMLElement{constructor(t){super(t),tt(t=this,s),1&s.t&&(p?t.attachShadow({mode:"open"}):"shadowRoot"in t||(t.shadowRoot=t))}connectedCallback(){m&&(clearTimeout(m),m=null),d?a.push(this):f.jmp(()=>(t=>{if(0==(1&f.t)){const e=Y(t),n=e.S,l=()=>{};if(!(1&e.t)){e.t|=1,12&n.t&&(t=>{const e=t["s-cr"]=u.createComment("");e["s-cn"]=!0,t.insertBefore(e,t.firstChild)})(t);{let n=t;for(;n=n.parentNode||n.host;)if(n["s-p"]){B(e,e.k=n);break}}n.C&&Object.entries(n.C).map(([e,[n]])=>{if(31&n&&t.hasOwnProperty(e)){const n=t[e];delete t[e],t[e]=n}}),(async(t,e,n,l,o)=>{if(0==(32&e.t)){e.t|=32;{if((o=ot(n)).then){const t=()=>{};o=await o,t()}o.isProxied||(K(o,n,2),o.isProxied=!0);const t=()=>{};e.t|=8;try{new o(e)}catch(c){nt(c)}e.t&=-9,t()}const t=h(n.U);if(!st.has(t)&&o.style){const e=()=>{};let l=o.style;8&n.t&&(l=await __sc_import_stencil_components("./p-f5bab17b.js").then(e=>e.scopeCss(l,t,!1))),((t,e,n)=>{let l=st.get(t);$&&n?(l=l||new CSSStyleSheet,l.replace(e)):l=e,st.set(t,l)})(t,l,!!(1&n.t)),e()}}const s=e.k,r=()=>H(e,!0);s&&s["s-rc"]?s["s-rc"].push(r):r()})(0,e,n)}l()}})(this))}disconnectedCallback(){f.jmp(()=>{})}forceUpdate(){(()=>{{const t=Y(this);t.M.isConnected&&2==(18&t.t)&&H(t,!1)}})()}componentOnReady(){return Y(this).A}};s.F=t[0],l.includes(r)||o.get(r)||(n.push(r),o.define(r,K(c,s,1)))})),c.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",c.setAttribute("data-styles",""),s.insertBefore(c,r?r.nextSibling:s.firstChild),d=!1,a.length?a.map(t=>t.connectedCallback()):f.jmp(()=>m=setTimeout(G,30))},X=new WeakMap,Y=t=>X.get(t),Z=(t,e)=>X.set(e.R=t,e),tt=(t,e)=>{const n={t:0,M:t,S:e,P:new Map};return n.A=new Promise(t=>n.O=t),t["s-p"]=[],t["s-rc"]=[],X.set(t,n)},et=(t,e)=>e in t,nt=t=>console.error(t),lt=new Map,ot=t=>{const e=t.U.replace(/-/g,"_"),n=t.F,l=lt.get(n);return l?l[e]:__sc_import_stencil_components(`./${n}.entry.js`).then(t=>(lt.set(n,t),t[e]),nt)},st=new Map,rt=[],ct=[],it=(t,e)=>n=>{t.push(n),c||(c=!0,e&&4&f.t?ft(ut):f.raf(ut))},at=t=>{for(let n=0;n<t.length;n++)try{t[n](performance.now())}catch(e){nt(e)}t.length=0},ut=()=>{at(rt),at(ct),(c=rt.length>0)&&f.raf(ut)},ft=t=>m().then(t),pt=it(ct,!0),mt=()=>a&&a.supports&&a.supports("color","var(--c)")?m():__sc_import_stencil_components("./p-69b85284.js").then(()=>(f.N=i.__cssshim)?(!1).i():0),$t=()=>{f.N=i.__cssshim;const e=Array.from(u.querySelectorAll("script")).find(e=>RegExp(`/${t}(\\.esm)?\\.js($|\\?|#)`).test(e.src)||e.getAttribute("data-stencil-namespace")===t),n=e["data-opts"]||{};return"onbeforeload"in e&&!history.scrollRestoration?{then(){}}:(n.resourcesUrl=new URL(".",new URL(e.getAttribute("data-resources-url")||e.src,i.location.href)).href,dt(n.resourcesUrl,e),i.customElements?m(n):__sc_import_stencil_components("./p-2347dcb6.js").then(()=>n))},dt=(t,e)=>{const n="__sc_import_stencil_components";try{i[n]=Function("w",`return import(w);//${Math.random()}`)}catch(l){const o=new Map;i[n]=l=>{const s=new URL(l,t).href;let r=o.get(s);if(!r){const t=u.createElement("script");t.type="module",t.crossOrigin=e.crossOrigin,t.src=URL.createObjectURL(new Blob([`import * as m from '${s}'; window.${n}.m = m;`],{type:"application/javascript"})),r=new Promise(e=>{t.onload=()=>{e(i[n].m),t.remove()}}),o.set(s,r),u.head.appendChild(t)}return r}}};export{mt as a,Q as b,b as h,$t as p,Z as r}