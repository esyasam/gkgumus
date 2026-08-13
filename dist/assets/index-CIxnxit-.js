(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();var xs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Pl=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],l=n[e++],c=n[e++],h=((s&7)<<18|(o&63)<<12|(l&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],l=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|l&63)}}return t.join("")},Fo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],l=s+1<n.length,c=l?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,y=o>>2,A=(o&3)<<4|c>>4;let R=(c&15)<<2|f>>6,S=f&63;h||(S=64,l||(R=64)),r.push(e[y],e[A],e[R],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Oo(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Pl(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const A=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||c==null||f==null||A==null)throw new Vl;const R=o<<2|c>>4;if(r.push(R),f!==64){const S=c<<4&240|f>>2;if(r.push(S),A!==64){const k=f<<6&192|A;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Vl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const kl=function(n){const t=Oo(n);return Fo.encodeByteArray(t,!0)},Mn=function(n){return kl(n).replace(/\./g,"")},Dl=function(n){try{return Fo.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll=()=>Nl().__FIREBASE_DEFAULTS__,xl=()=>{if(typeof process>"u"||typeof xs>"u")return;const n=xs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ml=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Dl(n[1]);return t&&JSON.parse(t)},li=()=>{try{return Ll()||xl()||Ml()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ol=n=>{var t,e;return(e=(t=li())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},Fl=n=>{const t=Ol(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Bo=()=>{var n;return(n=li())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Mn(JSON.stringify(e)),Mn(JSON.stringify(l)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ql(){var n;const t=(n=li())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function $l(){return!ql()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function jl(){try{return typeof indexedDB=="object"}catch{return!1}}function Kl(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl="FirebaseError";class Ie extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Hl,Object.setPrototypeOf(this,Ie.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Uo.prototype.create)}}class Uo{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],l=o?Gl(o,r):"Error",c=`${this.serviceName}: ${l} (${s}).`;return new Ie(s,c,r)}}function Gl(n,t){return n.replace(Ql,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Ql=/\{\$([^}]+)}/g;function Ur(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],l=t[s];if(Ms(o)&&Ms(l)){if(!Ur(o,l))return!1}else if(o!==l)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Ms(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(n){return n&&n._delegate?n._delegate:n}class Xe{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Bl;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Jl(t))try{this.getOrInitializeService({instanceIdentifier:Jt})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=Jt){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Jt){return this.instances.has(t)}getOptions(t=Jt){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,l]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&l.resolve(s)}return s}onInit(t,e){var r;const s=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const l=this.instances.get(s);return l&&t(l,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Xl(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Jt){return this.component?this.component.multipleInstances?t:Jt:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Xl(n){return n===Jt?void 0:n}function Jl(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Yl(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const tu={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},eu=z.INFO,nu={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},ru=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=nu[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class zo{constructor(t){this.name=t,this._logLevel=eu,this._logHandler=ru,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in z))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?tu[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...t),this._logHandler(this,z.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...t),this._logHandler(this,z.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,z.INFO,...t),this._logHandler(this,z.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,z.WARN,...t),this._logHandler(this,z.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...t),this._logHandler(this,z.ERROR,...t)}}const iu=(n,t)=>t.some(e=>n instanceof e);let Os,Fs;function su(){return Os||(Os=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ou(){return Fs||(Fs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const qo=new WeakMap,zr=new WeakMap,$o=new WeakMap,br=new WeakMap,ui=new WeakMap;function au(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",l)},o=()=>{e(qt(n.result)),s()},l=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",l)});return t.then(e=>{e instanceof IDBCursor&&qo.set(e,n)}).catch(()=>{}),ui.set(t,n),t}function lu(n){if(zr.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",l),n.removeEventListener("abort",l)},o=()=>{e(),s()},l=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",l),n.addEventListener("abort",l)});zr.set(n,t)}let qr={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return zr.get(n);if(t==="objectStoreNames")return n.objectStoreNames||$o.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return qt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function uu(n){qr=n(qr)}function cu(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Sr(this),t,...e);return $o.set(r,t.sort?t.sort():[t]),qt(r)}:ou().includes(n)?function(...t){return n.apply(Sr(this),t),qt(qo.get(this))}:function(...t){return qt(n.apply(Sr(this),t))}}function hu(n){return typeof n=="function"?cu(n):(n instanceof IDBTransaction&&lu(n),iu(n,su())?new Proxy(n,qr):n)}function qt(n){if(n instanceof IDBRequest)return au(n);if(br.has(n))return br.get(n);const t=hu(n);return t!==n&&(br.set(n,t),ui.set(t,n)),t}const Sr=n=>ui.get(n);function du(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const l=indexedDB.open(n,t),c=qt(l);return r&&l.addEventListener("upgradeneeded",h=>{r(qt(l.result),h.oldVersion,h.newVersion,qt(l.transaction),h)}),e&&l.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}const fu=["get","getKey","getAll","getAllKeys","count"],mu=["put","add","delete","clear"],Cr=new Map;function Bs(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Cr.get(t))return Cr.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=mu.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||fu.includes(e)))return;const o=async function(l,...c){const h=this.transaction(l,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(c.shift())),(await Promise.all([f[e](...c),s&&h.done]))[0]};return Cr.set(t,o),o}uu(n=>({...n,get:(t,e,r)=>Bs(t,e)||n.get(t,e,r),has:(t,e)=>!!Bs(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(gu(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function gu(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const $r="@firebase/app",Us="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt=new zo("@firebase/app"),yu="@firebase/app-compat",_u="@firebase/analytics-compat",vu="@firebase/analytics",Eu="@firebase/app-check-compat",Tu="@firebase/app-check",Iu="@firebase/auth",wu="@firebase/auth-compat",Au="@firebase/database",Ru="@firebase/data-connect",bu="@firebase/database-compat",Su="@firebase/functions",Cu="@firebase/functions-compat",Pu="@firebase/installations",Vu="@firebase/installations-compat",ku="@firebase/messaging",Du="@firebase/messaging-compat",Nu="@firebase/performance",Lu="@firebase/performance-compat",xu="@firebase/remote-config",Mu="@firebase/remote-config-compat",Ou="@firebase/storage",Fu="@firebase/storage-compat",Bu="@firebase/firestore",Uu="@firebase/vertexai-preview",zu="@firebase/firestore-compat",qu="firebase",$u="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jr="[DEFAULT]",ju={[$r]:"fire-core",[yu]:"fire-core-compat",[vu]:"fire-analytics",[_u]:"fire-analytics-compat",[Tu]:"fire-app-check",[Eu]:"fire-app-check-compat",[Iu]:"fire-auth",[wu]:"fire-auth-compat",[Au]:"fire-rtdb",[Ru]:"fire-data-connect",[bu]:"fire-rtdb-compat",[Su]:"fire-fn",[Cu]:"fire-fn-compat",[Pu]:"fire-iid",[Vu]:"fire-iid-compat",[ku]:"fire-fcm",[Du]:"fire-fcm-compat",[Nu]:"fire-perf",[Lu]:"fire-perf-compat",[xu]:"fire-rc",[Mu]:"fire-rc-compat",[Ou]:"fire-gcs",[Fu]:"fire-gcs-compat",[Bu]:"fire-fst",[zu]:"fire-fst-compat",[Uu]:"fire-vertex","fire-js":"fire-js",[qu]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On=new Map,Ku=new Map,Kr=new Map;function zs(n,t){try{n.container.addComponent(t)}catch(e){Lt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Fn(n){const t=n.name;if(Kr.has(t))return Lt.debug(`There were multiple attempts to register component ${t}.`),!1;Kr.set(t,n);for(const e of On.values())zs(e,n);for(const e of Ku.values())zs(e,n);return!0}function Hu(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new Uo("app","Firebase",Gu);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Xe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu=$u;function jo(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:jr,automaticDataCollectionEnabled:!1},t),s=r.name;if(typeof s!="string"||!s)throw $t.create("bad-app-name",{appName:String(s)});if(e||(e=Bo()),!e)throw $t.create("no-options");const o=On.get(s);if(o){if(Ur(e,o.options)&&Ur(r,o.config))return o;throw $t.create("duplicate-app",{appName:s})}const l=new Zl(s);for(const h of Kr.values())l.addComponent(h);const c=new Qu(e,r,l);return On.set(s,c),c}function Yu(n=jr){const t=On.get(n);if(!t&&n===jr&&Bo())return jo();if(!t)throw $t.create("no-app",{appName:n});return t}function fe(n,t,e){var r;let s=(r=ju[n])!==null&&r!==void 0?r:n;e&&(s+=`-${e}`);const o=s.match(/\s|\//),l=t.match(/\s|\//);if(o||l){const c=[`Unable to register library "${s}" with version "${t}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&l&&c.push("and"),l&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Lt.warn(c.join(" "));return}Fn(new Xe(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu="firebase-heartbeat-database",Ju=1,Je="firebase-heartbeat-store";let Pr=null;function Ko(){return Pr||(Pr=du(Xu,Ju,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Je)}catch(e){console.warn(e)}}}}).catch(n=>{throw $t.create("idb-open",{originalErrorMessage:n.message})})),Pr}async function Zu(n){try{const e=(await Ko()).transaction(Je),r=await e.objectStore(Je).get(Ho(n));return await e.done,r}catch(t){if(t instanceof Ie)Lt.warn(t.message);else{const e=$t.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Lt.warn(e.message)}}}async function qs(n,t){try{const r=(await Ko()).transaction(Je,"readwrite");await r.objectStore(Je).put(t,Ho(n)),await r.done}catch(e){if(e instanceof Ie)Lt.warn(e.message);else{const r=$t.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Lt.warn(r.message)}}}function Ho(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc=1024,ec=30*24*60*60*1e3;class nc{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new ic(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=$s();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(l=>l.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(l=>{const c=new Date(l.date).valueOf();return Date.now()-c<=ec}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Lt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=$s(),{heartbeatsToSend:r,unsentEntries:s}=rc(this._heartbeatsCache.heartbeats),o=Mn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Lt.warn(e),""}}}function $s(){return new Date().toISOString().substring(0,10)}function rc(n,t=tc){const e=[];let r=n.slice();for(const s of n){const o=e.find(l=>l.agent===s.agent);if(o){if(o.dates.push(s.date),js(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),js(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class ic{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return jl()?Kl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Zu(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return qs(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return qs(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function js(n){return Mn(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(n){Fn(new Xe("platform-logger",t=>new pu(t),"PRIVATE")),Fn(new Xe("heartbeat",t=>new nc(t),"PRIVATE")),fe($r,Us,n),fe($r,Us,"esm2017"),fe("fire-js","")}sc("");var oc="firebase",ac="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fe(oc,ac,"app");var Ks=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var te,Go;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,m){function g(){}g.prototype=m.prototype,E.D=m.prototype,E.prototype=new g,E.prototype.constructor=E,E.C=function(_,v,I){for(var p=Array(arguments.length-2),Vt=2;Vt<arguments.length;Vt++)p[Vt-2]=arguments[Vt];return m.prototype[v].apply(_,p)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,m,g){g||(g=0);var _=Array(16);if(typeof m=="string")for(var v=0;16>v;++v)_[v]=m.charCodeAt(g++)|m.charCodeAt(g++)<<8|m.charCodeAt(g++)<<16|m.charCodeAt(g++)<<24;else for(v=0;16>v;++v)_[v]=m[g++]|m[g++]<<8|m[g++]<<16|m[g++]<<24;m=E.g[0],g=E.g[1],v=E.g[2];var I=E.g[3],p=m+(I^g&(v^I))+_[0]+3614090360&4294967295;m=g+(p<<7&4294967295|p>>>25),p=I+(v^m&(g^v))+_[1]+3905402710&4294967295,I=m+(p<<12&4294967295|p>>>20),p=v+(g^I&(m^g))+_[2]+606105819&4294967295,v=I+(p<<17&4294967295|p>>>15),p=g+(m^v&(I^m))+_[3]+3250441966&4294967295,g=v+(p<<22&4294967295|p>>>10),p=m+(I^g&(v^I))+_[4]+4118548399&4294967295,m=g+(p<<7&4294967295|p>>>25),p=I+(v^m&(g^v))+_[5]+1200080426&4294967295,I=m+(p<<12&4294967295|p>>>20),p=v+(g^I&(m^g))+_[6]+2821735955&4294967295,v=I+(p<<17&4294967295|p>>>15),p=g+(m^v&(I^m))+_[7]+4249261313&4294967295,g=v+(p<<22&4294967295|p>>>10),p=m+(I^g&(v^I))+_[8]+1770035416&4294967295,m=g+(p<<7&4294967295|p>>>25),p=I+(v^m&(g^v))+_[9]+2336552879&4294967295,I=m+(p<<12&4294967295|p>>>20),p=v+(g^I&(m^g))+_[10]+4294925233&4294967295,v=I+(p<<17&4294967295|p>>>15),p=g+(m^v&(I^m))+_[11]+2304563134&4294967295,g=v+(p<<22&4294967295|p>>>10),p=m+(I^g&(v^I))+_[12]+1804603682&4294967295,m=g+(p<<7&4294967295|p>>>25),p=I+(v^m&(g^v))+_[13]+4254626195&4294967295,I=m+(p<<12&4294967295|p>>>20),p=v+(g^I&(m^g))+_[14]+2792965006&4294967295,v=I+(p<<17&4294967295|p>>>15),p=g+(m^v&(I^m))+_[15]+1236535329&4294967295,g=v+(p<<22&4294967295|p>>>10),p=m+(v^I&(g^v))+_[1]+4129170786&4294967295,m=g+(p<<5&4294967295|p>>>27),p=I+(g^v&(m^g))+_[6]+3225465664&4294967295,I=m+(p<<9&4294967295|p>>>23),p=v+(m^g&(I^m))+_[11]+643717713&4294967295,v=I+(p<<14&4294967295|p>>>18),p=g+(I^m&(v^I))+_[0]+3921069994&4294967295,g=v+(p<<20&4294967295|p>>>12),p=m+(v^I&(g^v))+_[5]+3593408605&4294967295,m=g+(p<<5&4294967295|p>>>27),p=I+(g^v&(m^g))+_[10]+38016083&4294967295,I=m+(p<<9&4294967295|p>>>23),p=v+(m^g&(I^m))+_[15]+3634488961&4294967295,v=I+(p<<14&4294967295|p>>>18),p=g+(I^m&(v^I))+_[4]+3889429448&4294967295,g=v+(p<<20&4294967295|p>>>12),p=m+(v^I&(g^v))+_[9]+568446438&4294967295,m=g+(p<<5&4294967295|p>>>27),p=I+(g^v&(m^g))+_[14]+3275163606&4294967295,I=m+(p<<9&4294967295|p>>>23),p=v+(m^g&(I^m))+_[3]+4107603335&4294967295,v=I+(p<<14&4294967295|p>>>18),p=g+(I^m&(v^I))+_[8]+1163531501&4294967295,g=v+(p<<20&4294967295|p>>>12),p=m+(v^I&(g^v))+_[13]+2850285829&4294967295,m=g+(p<<5&4294967295|p>>>27),p=I+(g^v&(m^g))+_[2]+4243563512&4294967295,I=m+(p<<9&4294967295|p>>>23),p=v+(m^g&(I^m))+_[7]+1735328473&4294967295,v=I+(p<<14&4294967295|p>>>18),p=g+(I^m&(v^I))+_[12]+2368359562&4294967295,g=v+(p<<20&4294967295|p>>>12),p=m+(g^v^I)+_[5]+4294588738&4294967295,m=g+(p<<4&4294967295|p>>>28),p=I+(m^g^v)+_[8]+2272392833&4294967295,I=m+(p<<11&4294967295|p>>>21),p=v+(I^m^g)+_[11]+1839030562&4294967295,v=I+(p<<16&4294967295|p>>>16),p=g+(v^I^m)+_[14]+4259657740&4294967295,g=v+(p<<23&4294967295|p>>>9),p=m+(g^v^I)+_[1]+2763975236&4294967295,m=g+(p<<4&4294967295|p>>>28),p=I+(m^g^v)+_[4]+1272893353&4294967295,I=m+(p<<11&4294967295|p>>>21),p=v+(I^m^g)+_[7]+4139469664&4294967295,v=I+(p<<16&4294967295|p>>>16),p=g+(v^I^m)+_[10]+3200236656&4294967295,g=v+(p<<23&4294967295|p>>>9),p=m+(g^v^I)+_[13]+681279174&4294967295,m=g+(p<<4&4294967295|p>>>28),p=I+(m^g^v)+_[0]+3936430074&4294967295,I=m+(p<<11&4294967295|p>>>21),p=v+(I^m^g)+_[3]+3572445317&4294967295,v=I+(p<<16&4294967295|p>>>16),p=g+(v^I^m)+_[6]+76029189&4294967295,g=v+(p<<23&4294967295|p>>>9),p=m+(g^v^I)+_[9]+3654602809&4294967295,m=g+(p<<4&4294967295|p>>>28),p=I+(m^g^v)+_[12]+3873151461&4294967295,I=m+(p<<11&4294967295|p>>>21),p=v+(I^m^g)+_[15]+530742520&4294967295,v=I+(p<<16&4294967295|p>>>16),p=g+(v^I^m)+_[2]+3299628645&4294967295,g=v+(p<<23&4294967295|p>>>9),p=m+(v^(g|~I))+_[0]+4096336452&4294967295,m=g+(p<<6&4294967295|p>>>26),p=I+(g^(m|~v))+_[7]+1126891415&4294967295,I=m+(p<<10&4294967295|p>>>22),p=v+(m^(I|~g))+_[14]+2878612391&4294967295,v=I+(p<<15&4294967295|p>>>17),p=g+(I^(v|~m))+_[5]+4237533241&4294967295,g=v+(p<<21&4294967295|p>>>11),p=m+(v^(g|~I))+_[12]+1700485571&4294967295,m=g+(p<<6&4294967295|p>>>26),p=I+(g^(m|~v))+_[3]+2399980690&4294967295,I=m+(p<<10&4294967295|p>>>22),p=v+(m^(I|~g))+_[10]+4293915773&4294967295,v=I+(p<<15&4294967295|p>>>17),p=g+(I^(v|~m))+_[1]+2240044497&4294967295,g=v+(p<<21&4294967295|p>>>11),p=m+(v^(g|~I))+_[8]+1873313359&4294967295,m=g+(p<<6&4294967295|p>>>26),p=I+(g^(m|~v))+_[15]+4264355552&4294967295,I=m+(p<<10&4294967295|p>>>22),p=v+(m^(I|~g))+_[6]+2734768916&4294967295,v=I+(p<<15&4294967295|p>>>17),p=g+(I^(v|~m))+_[13]+1309151649&4294967295,g=v+(p<<21&4294967295|p>>>11),p=m+(v^(g|~I))+_[4]+4149444226&4294967295,m=g+(p<<6&4294967295|p>>>26),p=I+(g^(m|~v))+_[11]+3174756917&4294967295,I=m+(p<<10&4294967295|p>>>22),p=v+(m^(I|~g))+_[2]+718787259&4294967295,v=I+(p<<15&4294967295|p>>>17),p=g+(I^(v|~m))+_[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(v+(p<<21&4294967295|p>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+I&4294967295}r.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var g=m-this.blockSize,_=this.B,v=this.h,I=0;I<m;){if(v==0)for(;I<=g;)s(this,E,I),I+=this.blockSize;if(typeof E=="string"){for(;I<m;)if(_[v++]=E.charCodeAt(I++),v==this.blockSize){s(this,_),v=0;break}}else for(;I<m;)if(_[v++]=E[I++],v==this.blockSize){s(this,_),v=0;break}}this.h=v,this.o+=m},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var g=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=g&255,g/=256;for(this.u(E),E=Array(16),m=g=0;4>m;++m)for(var _=0;32>_;_+=8)E[g++]=this.g[m]>>>_&255;return E};function o(E,m){var g=c;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=m(E)}function l(E,m){this.h=m;for(var g=[],_=!0,v=E.length-1;0<=v;v--){var I=E[v]|0;_&&I==m||(g[v]=I,_=!1)}this.g=g}var c={};function h(E){return-128<=E&&128>E?o(E,function(m){return new l([m|0],0>m?-1:0)}):new l([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return A;if(0>E)return D(f(-E));for(var m=[],g=1,_=0;E>=g;_++)m[_]=E/g|0,g*=4294967296;return new l(m,0)}function y(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return D(y(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=f(Math.pow(m,8)),_=A,v=0;v<E.length;v+=8){var I=Math.min(8,E.length-v),p=parseInt(E.substring(v,v+I),m);8>I?(I=f(Math.pow(m,I)),_=_.j(I).add(f(p))):(_=_.j(g),_=_.add(f(p)))}return _}var A=h(0),R=h(1),S=h(16777216);n=l.prototype,n.m=function(){if(O(this))return-D(this).m();for(var E=0,m=1,g=0;g<this.g.length;g++){var _=this.i(g);E+=(0<=_?_:4294967296+_)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(O(this))return"-"+D(this).toString(E);for(var m=f(Math.pow(E,6)),g=this,_="";;){var v=it(g,m).g;g=J(g,v.j(m));var I=((0<g.g.length?g.g[0]:g.h)>>>0).toString(E);if(g=v,k(g))return I+_;for(;6>I.length;)I="0"+I;_=I+_}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function O(E){return E.h==-1}n.l=function(E){return E=J(this,E),O(E)?-1:k(E)?0:1};function D(E){for(var m=E.g.length,g=[],_=0;_<m;_++)g[_]=~E.g[_];return new l(g,~E.h).add(R)}n.abs=function(){return O(this)?D(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],_=0,v=0;v<=m;v++){var I=_+(this.i(v)&65535)+(E.i(v)&65535),p=(I>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);_=p>>>16,I&=65535,p&=65535,g[v]=p<<16|I}return new l(g,g[g.length-1]&-2147483648?-1:0)};function J(E,m){return E.add(D(m))}n.j=function(E){if(k(this)||k(E))return A;if(O(this))return O(E)?D(this).j(D(E)):D(D(this).j(E));if(O(E))return D(this.j(D(E)));if(0>this.l(S)&&0>E.l(S))return f(this.m()*E.m());for(var m=this.g.length+E.g.length,g=[],_=0;_<2*m;_++)g[_]=0;for(_=0;_<this.g.length;_++)for(var v=0;v<E.g.length;v++){var I=this.i(_)>>>16,p=this.i(_)&65535,Vt=E.i(v)>>>16,be=E.i(v)&65535;g[2*_+2*v]+=p*be,G(g,2*_+2*v),g[2*_+2*v+1]+=I*be,G(g,2*_+2*v+1),g[2*_+2*v+1]+=p*Vt,G(g,2*_+2*v+1),g[2*_+2*v+2]+=I*Vt,G(g,2*_+2*v+2)}for(_=0;_<m;_++)g[_]=g[2*_+1]<<16|g[2*_];for(_=m;_<2*m;_++)g[_]=0;return new l(g,0)};function G(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function Q(E,m){this.g=E,this.h=m}function it(E,m){if(k(m))throw Error("division by zero");if(k(E))return new Q(A,A);if(O(E))return m=it(D(E),m),new Q(D(m.g),D(m.h));if(O(m))return m=it(E,D(m)),new Q(D(m.g),m.h);if(30<E.g.length){if(O(E)||O(m))throw Error("slowDivide_ only works with positive integers.");for(var g=R,_=m;0>=_.l(E);)g=Pt(g),_=Pt(_);var v=ot(g,1),I=ot(_,1);for(_=ot(_,2),g=ot(g,2);!k(_);){var p=I.add(_);0>=p.l(E)&&(v=v.add(g),I=p),_=ot(_,1),g=ot(g,1)}return m=J(E,v.j(m)),new Q(v,m)}for(v=A;0<=E.l(m);){for(g=Math.max(1,Math.floor(E.m()/m.m())),_=Math.ceil(Math.log(g)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),I=f(g),p=I.j(m);O(p)||0<p.l(E);)g-=_,I=f(g),p=I.j(m);k(I)&&(I=R),v=v.add(I),E=J(E,p)}return new Q(v,E)}n.A=function(E){return it(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],_=0;_<m;_++)g[_]=this.i(_)&E.i(_);return new l(g,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],_=0;_<m;_++)g[_]=this.i(_)|E.i(_);return new l(g,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],_=0;_<m;_++)g[_]=this.i(_)^E.i(_);return new l(g,this.h^E.h)};function Pt(E){for(var m=E.g.length+1,g=[],_=0;_<m;_++)g[_]=E.i(_)<<1|E.i(_-1)>>>31;return new l(g,E.h)}function ot(E,m){var g=m>>5;m%=32;for(var _=E.g.length-g,v=[],I=0;I<_;I++)v[I]=0<m?E.i(I+g)>>>m|E.i(I+g+1)<<32-m:E.i(I+g);return new l(v,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Go=r,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=f,l.fromString=y,te=l}).apply(typeof Ks<"u"?Ks:typeof self<"u"?self:typeof window<"u"?window:{});var Cn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qo,je,Wo,Dn,Hr,Yo,Xo,Jo;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,a,u){return i==Array.prototype||i==Object.prototype||(i[a]=u.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Cn=="object"&&Cn];for(var a=0;a<i.length;++a){var u=i[a];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,a){if(a)t:{var u=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var T=i[d];if(!(T in u))break t;u=u[T]}i=i[i.length-1],d=u[i],a=a(d),a!=d&&a!=null&&t(u,i,{configurable:!0,writable:!0,value:a})}}function o(i,a){i instanceof String&&(i+="");var u=0,d=!1,T={next:function(){if(!d&&u<i.length){var w=u++;return{value:a(w,i[w]),done:!1}}return d=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(i){return i||function(){return o(this,function(a,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},c=this||self;function h(i){var a=typeof i;return a=a!="object"?a:i?Array.isArray(i)?"array":a:"null",a=="array"||a=="object"&&typeof i.length=="number"}function f(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function y(i,a,u){return i.call.apply(i.bind,arguments)}function A(i,a,u){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,d),i.apply(a,T)}}return function(){return i.apply(a,arguments)}}function R(i,a,u){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?y:A,R.apply(null,arguments)}function S(i,a){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function k(i,a){function u(){}u.prototype=a.prototype,i.aa=a.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(d,T,w){for(var C=Array(arguments.length-2),K=2;K<arguments.length;K++)C[K-2]=arguments[K];return a.prototype[T].apply(d,C)}}function O(i){const a=i.length;if(0<a){const u=Array(a);for(let d=0;d<a;d++)u[d]=i[d];return u}return[]}function D(i,a){for(let u=1;u<arguments.length;u++){const d=arguments[u];if(h(d)){const T=i.length||0,w=d.length||0;i.length=T+w;for(let C=0;C<w;C++)i[T+C]=d[C]}else i.push(d)}}class J{constructor(a,u){this.i=a,this.j=u,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function G(i){return/^[\s\xa0]*$/.test(i)}function Q(){var i=c.navigator;return i&&(i=i.userAgent)?i:""}function it(i){return it[" "](i),i}it[" "]=function(){};var Pt=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function ot(i,a,u){for(const d in i)a.call(u,i[d],d,i)}function E(i,a){for(const u in i)a.call(void 0,i[u],u,i)}function m(i){const a={};for(const u in i)a[u]=i[u];return a}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(i,a){let u,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(u in d)i[u]=d[u];for(let w=0;w<g.length;w++)u=g[w],Object.prototype.hasOwnProperty.call(d,u)&&(i[u]=d[u])}}function v(i){var a=1;i=i.split(":");const u=[];for(;0<a&&i.length;)u.push(i.shift()),a--;return i.length&&u.push(i.join(":")),u}function I(i){c.setTimeout(()=>{throw i},0)}function p(){var i=nr;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class Vt{constructor(){this.h=this.g=null}add(a,u){const d=be.get();d.set(a,u),this.h?this.h.next=d:this.g=d,this.h=d}}var be=new J(()=>new Qa,i=>i.reset());class Qa{constructor(){this.next=this.g=this.h=null}set(a,u){this.h=a,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let Se,Ce=!1,nr=new Vt,xi=()=>{const i=c.Promise.resolve(void 0);Se=()=>{i.then(Wa)}};var Wa=()=>{for(var i;i=p();){try{i.h.call(i.g)}catch(u){I(u)}var a=be;a.j(i),100>a.h&&(a.h++,i.next=a.g,a.g=i)}Ce=!1};function Mt(){this.s=this.s,this.C=this.C}Mt.prototype.s=!1,Mt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Mt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ht(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}ht.prototype.h=function(){this.defaultPrevented=!0};var Ya=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};c.addEventListener("test",u,a),c.removeEventListener("test",u,a)}catch{}return i}();function Pe(i,a){if(ht.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget){if(Pt){t:{try{it(a.nodeName);var T=!0;break t}catch{}T=!1}T||(a=null)}}else u=="mouseover"?a=i.fromElement:u=="mouseout"&&(a=i.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:Xa[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Pe.aa.h.call(this)}}k(Pe,ht);var Xa={2:"touch",3:"pen",4:"mouse"};Pe.prototype.h=function(){Pe.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var un="closure_listenable_"+(1e6*Math.random()|0),Ja=0;function Za(i,a,u,d,T){this.listener=i,this.proxy=null,this.src=a,this.type=u,this.capture=!!d,this.ha=T,this.key=++Ja,this.da=this.fa=!1}function cn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function hn(i){this.src=i,this.g={},this.h=0}hn.prototype.add=function(i,a,u,d,T){var w=i.toString();i=this.g[w],i||(i=this.g[w]=[],this.h++);var C=ir(i,a,d,T);return-1<C?(a=i[C],u||(a.fa=!1)):(a=new Za(a,this.src,w,!!d,T),a.fa=u,i.push(a)),a};function rr(i,a){var u=a.type;if(u in i.g){var d=i.g[u],T=Array.prototype.indexOf.call(d,a,void 0),w;(w=0<=T)&&Array.prototype.splice.call(d,T,1),w&&(cn(a),i.g[u].length==0&&(delete i.g[u],i.h--))}}function ir(i,a,u,d){for(var T=0;T<i.length;++T){var w=i[T];if(!w.da&&w.listener==a&&w.capture==!!u&&w.ha==d)return T}return-1}var sr="closure_lm_"+(1e6*Math.random()|0),or={};function Mi(i,a,u,d,T){if(Array.isArray(a)){for(var w=0;w<a.length;w++)Mi(i,a[w],u,d,T);return null}return u=Bi(u),i&&i[un]?i.K(a,u,f(d)?!!d.capture:!1,T):tl(i,a,u,!1,d,T)}function tl(i,a,u,d,T,w){if(!a)throw Error("Invalid event type");var C=f(T)?!!T.capture:!!T,K=lr(i);if(K||(i[sr]=K=new hn(i)),u=K.add(a,u,d,C,w),u.proxy)return u;if(d=el(),u.proxy=d,d.src=i,d.listener=u,i.addEventListener)Ya||(T=C),T===void 0&&(T=!1),i.addEventListener(a.toString(),d,T);else if(i.attachEvent)i.attachEvent(Fi(a.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function el(){function i(u){return a.call(i.src,i.listener,u)}const a=nl;return i}function Oi(i,a,u,d,T){if(Array.isArray(a))for(var w=0;w<a.length;w++)Oi(i,a[w],u,d,T);else d=f(d)?!!d.capture:!!d,u=Bi(u),i&&i[un]?(i=i.i,a=String(a).toString(),a in i.g&&(w=i.g[a],u=ir(w,u,d,T),-1<u&&(cn(w[u]),Array.prototype.splice.call(w,u,1),w.length==0&&(delete i.g[a],i.h--)))):i&&(i=lr(i))&&(a=i.g[a.toString()],i=-1,a&&(i=ir(a,u,d,T)),(u=-1<i?a[i]:null)&&ar(u))}function ar(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[un])rr(a.i,i);else{var u=i.type,d=i.proxy;a.removeEventListener?a.removeEventListener(u,d,i.capture):a.detachEvent?a.detachEvent(Fi(u),d):a.addListener&&a.removeListener&&a.removeListener(d),(u=lr(a))?(rr(u,i),u.h==0&&(u.src=null,a[sr]=null)):cn(i)}}}function Fi(i){return i in or?or[i]:or[i]="on"+i}function nl(i,a){if(i.da)i=!0;else{a=new Pe(a,this);var u=i.listener,d=i.ha||i.src;i.fa&&ar(i),i=u.call(d,a)}return i}function lr(i){return i=i[sr],i instanceof hn?i:null}var ur="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bi(i){return typeof i=="function"?i:(i[ur]||(i[ur]=function(a){return i.handleEvent(a)}),i[ur])}function dt(){Mt.call(this),this.i=new hn(this),this.M=this,this.F=null}k(dt,Mt),dt.prototype[un]=!0,dt.prototype.removeEventListener=function(i,a,u,d){Oi(this,i,a,u,d)};function _t(i,a){var u,d=i.F;if(d)for(u=[];d;d=d.F)u.push(d);if(i=i.M,d=a.type||a,typeof a=="string")a=new ht(a,i);else if(a instanceof ht)a.target=a.target||i;else{var T=a;a=new ht(d,i),_(a,T)}if(T=!0,u)for(var w=u.length-1;0<=w;w--){var C=a.g=u[w];T=dn(C,d,!0,a)&&T}if(C=a.g=i,T=dn(C,d,!0,a)&&T,T=dn(C,d,!1,a)&&T,u)for(w=0;w<u.length;w++)C=a.g=u[w],T=dn(C,d,!1,a)&&T}dt.prototype.N=function(){if(dt.aa.N.call(this),this.i){var i=this.i,a;for(a in i.g){for(var u=i.g[a],d=0;d<u.length;d++)cn(u[d]);delete i.g[a],i.h--}}this.F=null},dt.prototype.K=function(i,a,u,d){return this.i.add(String(i),a,!1,u,d)},dt.prototype.L=function(i,a,u,d){return this.i.add(String(i),a,!0,u,d)};function dn(i,a,u,d){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();for(var T=!0,w=0;w<a.length;++w){var C=a[w];if(C&&!C.da&&C.capture==u){var K=C.listener,at=C.ha||C.src;C.fa&&rr(i.i,C),T=K.call(at,d)!==!1&&T}}return T&&!d.defaultPrevented}function Ui(i,a,u){if(typeof i=="function")u&&(i=R(i,u));else if(i&&typeof i.handleEvent=="function")i=R(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:c.setTimeout(i,a||0)}function zi(i){i.g=Ui(()=>{i.g=null,i.i&&(i.i=!1,zi(i))},i.l);const a=i.h;i.h=null,i.m.apply(null,a)}class rl extends Mt{constructor(a,u){super(),this.m=a,this.l=u,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:zi(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ve(i){Mt.call(this),this.h=i,this.g={}}k(Ve,Mt);var qi=[];function $i(i){ot(i.g,function(a,u){this.g.hasOwnProperty(u)&&ar(a)},i),i.g={}}Ve.prototype.N=function(){Ve.aa.N.call(this),$i(this)},Ve.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var cr=c.JSON.stringify,il=c.JSON.parse,sl=class{stringify(i){return c.JSON.stringify(i,void 0)}parse(i){return c.JSON.parse(i,void 0)}};function hr(){}hr.prototype.h=null;function ji(i){return i.h||(i.h=i.i())}function Ki(){}var ke={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function dr(){ht.call(this,"d")}k(dr,ht);function fr(){ht.call(this,"c")}k(fr,ht);var Qt={},Hi=null;function fn(){return Hi=Hi||new dt}Qt.La="serverreachability";function Gi(i){ht.call(this,Qt.La,i)}k(Gi,ht);function De(i){const a=fn();_t(a,new Gi(a))}Qt.STAT_EVENT="statevent";function Qi(i,a){ht.call(this,Qt.STAT_EVENT,i),this.stat=a}k(Qi,ht);function vt(i){const a=fn();_t(a,new Qi(a,i))}Qt.Ma="timingevent";function Wi(i,a){ht.call(this,Qt.Ma,i),this.size=a}k(Wi,ht);function Ne(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){i()},a)}function Le(){this.g=!0}Le.prototype.xa=function(){this.g=!1};function ol(i,a,u,d,T,w){i.info(function(){if(i.g)if(w)for(var C="",K=w.split("&"),at=0;at<K.length;at++){var $=K[at].split("=");if(1<$.length){var ft=$[0];$=$[1];var mt=ft.split("_");C=2<=mt.length&&mt[1]=="type"?C+(ft+"="+$+"&"):C+(ft+"=redacted&")}}else C=null;else C=w;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+a+`
`+u+`
`+C})}function al(i,a,u,d,T,w,C){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+a+`
`+u+`
`+w+" "+C})}function oe(i,a,u,d){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+ul(i,u)+(d?" "+d:"")})}function ll(i,a){i.info(function(){return"TIMEOUT: "+a})}Le.prototype.info=function(){};function ul(i,a){if(!i.g)return a;if(!a)return null;try{var u=JSON.parse(a);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var d=u[i];if(!(2>d.length)){var T=d[1];if(Array.isArray(T)&&!(1>T.length)){var w=T[0];if(w!="noop"&&w!="stop"&&w!="close")for(var C=1;C<T.length;C++)T[C]=""}}}}return cr(u)}catch{return a}}var mn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Yi={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},mr;function pn(){}k(pn,hr),pn.prototype.g=function(){return new XMLHttpRequest},pn.prototype.i=function(){return{}},mr=new pn;function Ot(i,a,u,d){this.j=i,this.i=a,this.l=u,this.R=d||1,this.U=new Ve(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Xi}function Xi(){this.i=null,this.g="",this.h=!1}var Ji={},pr={};function gr(i,a,u){i.L=1,i.v=vn(kt(a)),i.m=u,i.P=!0,Zi(i,null)}function Zi(i,a){i.F=Date.now(),gn(i),i.A=kt(i.v);var u=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),fs(u.i,"t",d),i.C=0,u=i.j.J,i.h=new Xi,i.g=ks(i.j,u?a:null,!i.m),0<i.O&&(i.M=new rl(R(i.Y,i,i.g),i.O)),a=i.U,u=i.g,d=i.ca;var T="readystatechange";Array.isArray(T)||(T&&(qi[0]=T.toString()),T=qi);for(var w=0;w<T.length;w++){var C=Mi(u,T[w],d||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=i.H?m(i.H):{},i.m?(i.u||(i.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,a)):(i.u="GET",i.g.ea(i.A,i.u,null,a)),De(),ol(i.i,i.u,i.A,i.l,i.R,i.m)}Ot.prototype.ca=function(i){i=i.target;const a=this.M;a&&Dt(i)==3?a.j():this.Y(i)},Ot.prototype.Y=function(i){try{if(i==this.g)t:{const mt=Dt(this.g);var a=this.g.Ba();const ue=this.g.Z();if(!(3>mt)&&(mt!=3||this.g&&(this.h.h||this.g.oa()||Es(this.g)))){this.J||mt!=4||a==7||(a==8||0>=ue?De(3):De(2)),yr(this);var u=this.g.Z();this.X=u;e:if(ts(this)){var d=Es(this.g);i="";var T=d.length,w=Dt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Wt(this),xe(this);var C="";break e}this.h.i=new c.TextDecoder}for(a=0;a<T;a++)this.h.h=!0,i+=this.h.i.decode(d[a],{stream:!(w&&a==T-1)});d.length=0,this.h.g+=i,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=u==200,al(this.i,this.u,this.A,this.l,this.R,mt,u),this.o){if(this.T&&!this.K){e:{if(this.g){var K,at=this.g;if((K=at.g?at.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(K)){var $=K;break e}}$=null}if(u=$)oe(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,_r(this,u);else{this.o=!1,this.s=3,vt(12),Wt(this),xe(this);break t}}if(this.P){u=!0;let wt;for(;!this.J&&this.C<C.length;)if(wt=cl(this,C),wt==pr){mt==4&&(this.s=4,vt(14),u=!1),oe(this.i,this.l,null,"[Incomplete Response]");break}else if(wt==Ji){this.s=4,vt(15),oe(this.i,this.l,C,"[Invalid Chunk]"),u=!1;break}else oe(this.i,this.l,wt,null),_r(this,wt);if(ts(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),mt!=4||C.length!=0||this.h.h||(this.s=1,vt(16),u=!1),this.o=this.o&&u,!u)oe(this.i,this.l,C,"[Invalid Chunked Response]"),Wt(this),xe(this);else if(0<C.length&&!this.W){this.W=!0;var ft=this.j;ft.g==this&&ft.ba&&!ft.M&&(ft.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),Ar(ft),ft.M=!0,vt(11))}}else oe(this.i,this.l,C,null),_r(this,C);mt==4&&Wt(this),this.o&&!this.J&&(mt==4?Ss(this.j,this):(this.o=!1,gn(this)))}else Sl(this.g),u==400&&0<C.indexOf("Unknown SID")?(this.s=3,vt(12)):(this.s=0,vt(13)),Wt(this),xe(this)}}}catch{}finally{}};function ts(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function cl(i,a){var u=i.C,d=a.indexOf(`
`,u);return d==-1?pr:(u=Number(a.substring(u,d)),isNaN(u)?Ji:(d+=1,d+u>a.length?pr:(a=a.slice(d,d+u),i.C=d+u,a)))}Ot.prototype.cancel=function(){this.J=!0,Wt(this)};function gn(i){i.S=Date.now()+i.I,es(i,i.I)}function es(i,a){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Ne(R(i.ba,i),a)}function yr(i){i.B&&(c.clearTimeout(i.B),i.B=null)}Ot.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(ll(this.i,this.A),this.L!=2&&(De(),vt(17)),Wt(this),this.s=2,xe(this)):es(this,this.S-i)};function xe(i){i.j.G==0||i.J||Ss(i.j,i)}function Wt(i){yr(i);var a=i.M;a&&typeof a.ma=="function"&&a.ma(),i.M=null,$i(i.U),i.g&&(a=i.g,i.g=null,a.abort(),a.ma())}function _r(i,a){try{var u=i.j;if(u.G!=0&&(u.g==i||vr(u.h,i))){if(!i.K&&vr(u.h,i)&&u.G==3){try{var d=u.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)Rn(u),wn(u);else break t;wr(u),vt(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=Ne(R(u.Za,u),6e3));if(1>=is(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else Xt(u,11)}else if((i.K||u.g==i)&&Rn(u),!G(a))for(T=u.Da.g.parse(a),a=0;a<T.length;a++){let $=T[a];if(u.T=$[0],$=$[1],u.G==2)if($[0]=="c"){u.K=$[1],u.ia=$[2];const ft=$[3];ft!=null&&(u.la=ft,u.j.info("VER="+u.la));const mt=$[4];mt!=null&&(u.Aa=mt,u.j.info("SVER="+u.Aa));const ue=$[5];ue!=null&&typeof ue=="number"&&0<ue&&(d=1.5*ue,u.L=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;const wt=i.g;if(wt){const Sn=wt.g?wt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Sn){var w=d.h;w.g||Sn.indexOf("spdy")==-1&&Sn.indexOf("quic")==-1&&Sn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(Er(w,w.h),w.h=null))}if(d.D){const Rr=wt.g?wt.g.getResponseHeader("X-HTTP-Session-Id"):null;Rr&&(d.ya=Rr,H(d.I,d.D,Rr))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),d=u;var C=i;if(d.qa=Vs(d,d.J?d.ia:null,d.W),C.K){ss(d.h,C);var K=C,at=d.L;at&&(K.I=at),K.B&&(yr(K),gn(K)),d.g=C}else Rs(d);0<u.i.length&&An(u)}else $[0]!="stop"&&$[0]!="close"||Xt(u,7);else u.G==3&&($[0]=="stop"||$[0]=="close"?$[0]=="stop"?Xt(u,7):Ir(u):$[0]!="noop"&&u.l&&u.l.ta($),u.v=0)}}De(4)}catch{}}var hl=class{constructor(i,a){this.g=i,this.map=a}};function ns(i){this.l=i||10,c.PerformanceNavigationTiming?(i=c.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function rs(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function is(i){return i.h?1:i.g?i.g.size:0}function vr(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function Er(i,a){i.g?i.g.add(a):i.h=a}function ss(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}ns.prototype.cancel=function(){if(this.i=os(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function os(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let a=i.i;for(const u of i.g.values())a=a.concat(u.D);return a}return O(i.i)}function dl(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var a=[],u=i.length,d=0;d<u;d++)a.push(i[d]);return a}a=[],u=0;for(d in i)a[u++]=i[d];return a}function fl(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var a=[];i=i.length;for(var u=0;u<i;u++)a.push(u);return a}a=[],u=0;for(const d in i)a[u++]=d;return a}}}function as(i,a){if(i.forEach&&typeof i.forEach=="function")i.forEach(a,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,a,void 0);else for(var u=fl(i),d=dl(i),T=d.length,w=0;w<T;w++)a.call(void 0,d[w],u&&u[w],i)}var ls=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ml(i,a){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var d=i[u].indexOf("="),T=null;if(0<=d){var w=i[u].substring(0,d);T=i[u].substring(d+1)}else w=i[u];a(w,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Yt(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Yt){this.h=i.h,yn(this,i.j),this.o=i.o,this.g=i.g,_n(this,i.s),this.l=i.l;var a=i.i,u=new Fe;u.i=a.i,a.g&&(u.g=new Map(a.g),u.h=a.h),us(this,u),this.m=i.m}else i&&(a=String(i).match(ls))?(this.h=!1,yn(this,a[1]||"",!0),this.o=Me(a[2]||""),this.g=Me(a[3]||"",!0),_n(this,a[4]),this.l=Me(a[5]||"",!0),us(this,a[6]||"",!0),this.m=Me(a[7]||"")):(this.h=!1,this.i=new Fe(null,this.h))}Yt.prototype.toString=function(){var i=[],a=this.j;a&&i.push(Oe(a,cs,!0),":");var u=this.g;return(u||a=="file")&&(i.push("//"),(a=this.o)&&i.push(Oe(a,cs,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(Oe(u,u.charAt(0)=="/"?yl:gl,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",Oe(u,vl)),i.join("")};function kt(i){return new Yt(i)}function yn(i,a,u){i.j=u?Me(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function _n(i,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);i.s=a}else i.s=null}function us(i,a,u){a instanceof Fe?(i.i=a,El(i.i,i.h)):(u||(a=Oe(a,_l)),i.i=new Fe(a,i.h))}function H(i,a,u){i.i.set(a,u)}function vn(i){return H(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Me(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Oe(i,a,u){return typeof i=="string"?(i=encodeURI(i).replace(a,pl),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function pl(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var cs=/[#\/\?@]/g,gl=/[#\?:]/g,yl=/[#\?]/g,_l=/[#\?@]/g,vl=/#/g;function Fe(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function Ft(i){i.g||(i.g=new Map,i.h=0,i.i&&ml(i.i,function(a,u){i.add(decodeURIComponent(a.replace(/\+/g," ")),u)}))}n=Fe.prototype,n.add=function(i,a){Ft(this),this.i=null,i=ae(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(a),this.h+=1,this};function hs(i,a){Ft(i),a=ae(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function ds(i,a){return Ft(i),a=ae(i,a),i.g.has(a)}n.forEach=function(i,a){Ft(this),this.g.forEach(function(u,d){u.forEach(function(T){i.call(a,T,d,this)},this)},this)},n.na=function(){Ft(this);const i=Array.from(this.g.values()),a=Array.from(this.g.keys()),u=[];for(let d=0;d<a.length;d++){const T=i[d];for(let w=0;w<T.length;w++)u.push(a[d])}return u},n.V=function(i){Ft(this);let a=[];if(typeof i=="string")ds(this,i)&&(a=a.concat(this.g.get(ae(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)a=a.concat(i[u])}return a},n.set=function(i,a){return Ft(this),this.i=null,i=ae(this,i),ds(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},n.get=function(i,a){return i?(i=this.V(i),0<i.length?String(i[0]):a):a};function fs(i,a,u){hs(i,a),0<u.length&&(i.i=null,i.g.set(ae(i,a),O(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],a=Array.from(this.g.keys());for(var u=0;u<a.length;u++){var d=a[u];const w=encodeURIComponent(String(d)),C=this.V(d);for(d=0;d<C.length;d++){var T=w;C[d]!==""&&(T+="="+encodeURIComponent(String(C[d]))),i.push(T)}}return this.i=i.join("&")};function ae(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function El(i,a){a&&!i.j&&(Ft(i),i.i=null,i.g.forEach(function(u,d){var T=d.toLowerCase();d!=T&&(hs(this,d),fs(this,T,u))},i)),i.j=a}function Tl(i,a){const u=new Le;if(c.Image){const d=new Image;d.onload=S(Bt,u,"TestLoadImage: loaded",!0,a,d),d.onerror=S(Bt,u,"TestLoadImage: error",!1,a,d),d.onabort=S(Bt,u,"TestLoadImage: abort",!1,a,d),d.ontimeout=S(Bt,u,"TestLoadImage: timeout",!1,a,d),c.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else a(!1)}function Il(i,a){const u=new Le,d=new AbortController,T=setTimeout(()=>{d.abort(),Bt(u,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:d.signal}).then(w=>{clearTimeout(T),w.ok?Bt(u,"TestPingServer: ok",!0,a):Bt(u,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(T),Bt(u,"TestPingServer: error",!1,a)})}function Bt(i,a,u,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(u)}catch{}}function wl(){this.g=new sl}function Al(i,a,u){const d=u||"";try{as(i,function(T,w){let C=T;f(T)&&(C=cr(T)),a.push(d+w+"="+encodeURIComponent(C))})}catch(T){throw a.push(d+"type="+encodeURIComponent("_badmap")),T}}function En(i){this.l=i.Ub||null,this.j=i.eb||!1}k(En,hr),En.prototype.g=function(){return new Tn(this.l,this.j)},En.prototype.i=function(i){return function(){return i}}({});function Tn(i,a){dt.call(this),this.D=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Tn,dt),n=Tn.prototype,n.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=a,this.readyState=1,Ue(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(a.body=i),(this.D||c).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Be(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Ue(this)),this.g&&(this.readyState=3,Ue(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ms(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function ms(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?Be(this):Ue(this),this.readyState==3&&ms(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,Be(this))},n.Qa=function(i){this.g&&(this.response=i,Be(this))},n.ga=function(){this.g&&Be(this)};function Be(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Ue(i)}n.setRequestHeader=function(i,a){this.u.append(i,a)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],a=this.h.entries();for(var u=a.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=a.next();return i.join(`\r
`)};function Ue(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Tn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function ps(i){let a="";return ot(i,function(u,d){a+=d,a+=":",a+=u,a+=`\r
`}),a}function Tr(i,a,u){t:{for(d in u){var d=!1;break t}d=!0}d||(u=ps(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):H(i,a,u))}function W(i){dt.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(W,dt);var Rl=/^https?$/i,bl=["POST","PUT"];n=W.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,a,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():mr.g(),this.v=this.o?ji(this.o):ji(mr),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(w){gs(this,w);return}if(i=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)u.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const w of d.keys())u.set(w,d.get(w));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(w=>w.toLowerCase()=="content-type"),T=c.FormData&&i instanceof c.FormData,!(0<=Array.prototype.indexOf.call(bl,a,void 0))||d||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,C]of u)this.g.setRequestHeader(w,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{vs(this),this.u=!0,this.g.send(i),this.u=!1}catch(w){gs(this,w)}};function gs(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.m=5,ys(i),In(i)}function ys(i){i.A||(i.A=!0,_t(i,"complete"),_t(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,_t(this,"complete"),_t(this,"abort"),In(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),In(this,!0)),W.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?_s(this):this.bb())},n.bb=function(){_s(this)};function _s(i){if(i.h&&typeof l<"u"&&(!i.v[1]||Dt(i)!=4||i.Z()!=2)){if(i.u&&Dt(i)==4)Ui(i.Ea,0,i);else if(_t(i,"readystatechange"),Dt(i)==4){i.h=!1;try{const C=i.Z();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var u;if(!(u=a)){var d;if(d=C===0){var T=String(i.D).match(ls)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),d=!Rl.test(T?T.toLowerCase():"")}u=d}if(u)_t(i,"complete"),_t(i,"success");else{i.m=6;try{var w=2<Dt(i)?i.g.statusText:""}catch{w=""}i.l=w+" ["+i.Z()+"]",ys(i)}}finally{In(i)}}}}function In(i,a){if(i.g){vs(i);const u=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,a||_t(i,"ready");try{u.onreadystatechange=d}catch{}}}function vs(i){i.I&&(c.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Dt(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Dt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),il(a)}};function Es(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Sl(i){const a={};i=(i.g&&2<=Dt(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(G(i[d]))continue;var u=v(i[d]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const w=a[T]||[];a[T]=w,w.push(u)}E(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ze(i,a,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||a}function Ts(i){this.Aa=0,this.i=[],this.j=new Le,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ze("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ze("baseRetryDelayMs",5e3,i),this.cb=ze("retryDelaySeedMs",1e4,i),this.Wa=ze("forwardChannelMaxRetries",2,i),this.wa=ze("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new ns(i&&i.concurrentRequestLimit),this.Da=new wl,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ts.prototype,n.la=8,n.G=1,n.connect=function(i,a,u,d){vt(0),this.W=i,this.H=a||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.I=Vs(this,null,this.W),An(this)};function Ir(i){if(Is(i),i.G==3){var a=i.U++,u=kt(i.I);if(H(u,"SID",i.K),H(u,"RID",a),H(u,"TYPE","terminate"),qe(i,u),a=new Ot(i,i.j,a),a.L=2,a.v=vn(kt(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(a.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=a.v,u=!0),u||(a.g=ks(a.j,null),a.g.ea(a.v)),a.F=Date.now(),gn(a)}Ps(i)}function wn(i){i.g&&(Ar(i),i.g.cancel(),i.g=null)}function Is(i){wn(i),i.u&&(c.clearTimeout(i.u),i.u=null),Rn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&c.clearTimeout(i.s),i.s=null)}function An(i){if(!rs(i.h)&&!i.s){i.s=!0;var a=i.Ga;Se||xi(),Ce||(Se(),Ce=!0),nr.add(a,i),i.B=0}}function Cl(i,a){return is(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=a.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Ne(R(i.Ga,i,a),Cs(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const T=new Ot(this,this.j,i);let w=this.o;if(this.S&&(w?(w=m(w),_(w,this.S)):w=this.S),this.m!==null||this.O||(T.H=w,w=null),this.P)t:{for(var a=0,u=0;u<this.i.length;u++){e:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=u;break t}if(a===4096||u===this.i.length-1){a=u+1;break t}}a=1e3}else a=1e3;a=As(this,T,a),u=kt(this.I),H(u,"RID",i),H(u,"CVER",22),this.D&&H(u,"X-HTTP-Session-Id",this.D),qe(this,u),w&&(this.O?a="headers="+encodeURIComponent(String(ps(w)))+"&"+a:this.m&&Tr(u,this.m,w)),Er(this.h,T),this.Ua&&H(u,"TYPE","init"),this.P?(H(u,"$req",a),H(u,"SID","null"),T.T=!0,gr(T,u,null)):gr(T,u,a),this.G=2}}else this.G==3&&(i?ws(this,i):this.i.length==0||rs(this.h)||ws(this))};function ws(i,a){var u;a?u=a.l:u=i.U++;const d=kt(i.I);H(d,"SID",i.K),H(d,"RID",u),H(d,"AID",i.T),qe(i,d),i.m&&i.o&&Tr(d,i.m,i.o),u=new Ot(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),a&&(i.i=a.D.concat(i.i)),a=As(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Er(i.h,u),gr(u,d,a)}function qe(i,a){i.H&&ot(i.H,function(u,d){H(a,d,u)}),i.l&&as({},function(u,d){H(a,d,u)})}function As(i,a,u){u=Math.min(i.i.length,u);var d=i.l?R(i.l.Na,i.l,i):null;t:{var T=i.i;let w=-1;for(;;){const C=["count="+u];w==-1?0<u?(w=T[0].g,C.push("ofs="+w)):w=0:C.push("ofs="+w);let K=!0;for(let at=0;at<u;at++){let $=T[at].g;const ft=T[at].map;if($-=w,0>$)w=Math.max(0,T[at].g-100),K=!1;else try{Al(ft,C,"req"+$+"_")}catch{d&&d(ft)}}if(K){d=C.join("&");break t}}}return i=i.i.splice(0,u),a.D=i,d}function Rs(i){if(!i.g&&!i.u){i.Y=1;var a=i.Fa;Se||xi(),Ce||(Se(),Ce=!0),nr.add(a,i),i.v=0}}function wr(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Ne(R(i.Fa,i),Cs(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,bs(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Ne(R(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,vt(10),wn(this),bs(this))};function Ar(i){i.A!=null&&(c.clearTimeout(i.A),i.A=null)}function bs(i){i.g=new Ot(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var a=kt(i.qa);H(a,"RID","rpc"),H(a,"SID",i.K),H(a,"AID",i.T),H(a,"CI",i.F?"0":"1"),!i.F&&i.ja&&H(a,"TO",i.ja),H(a,"TYPE","xmlhttp"),qe(i,a),i.m&&i.o&&Tr(a,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=vn(kt(a)),u.m=null,u.P=!0,Zi(u,i)}n.Za=function(){this.C!=null&&(this.C=null,wn(this),wr(this),vt(19))};function Rn(i){i.C!=null&&(c.clearTimeout(i.C),i.C=null)}function Ss(i,a){var u=null;if(i.g==a){Rn(i),Ar(i),i.g=null;var d=2}else if(vr(i.h,a))u=a.D,ss(i.h,a),d=1;else return;if(i.G!=0){if(a.o)if(d==1){u=a.m?a.m.length:0,a=Date.now()-a.F;var T=i.B;d=fn(),_t(d,new Wi(d,u)),An(i)}else Rs(i);else if(T=a.s,T==3||T==0&&0<a.X||!(d==1&&Cl(i,a)||d==2&&wr(i)))switch(u&&0<u.length&&(a=i.h,a.i=a.i.concat(u)),T){case 1:Xt(i,5);break;case 4:Xt(i,10);break;case 3:Xt(i,6);break;default:Xt(i,2)}}}function Cs(i,a){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*a}function Xt(i,a){if(i.j.info("Error code "+a),a==2){var u=R(i.fb,i),d=i.Xa;const T=!d;d=new Yt(d||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||yn(d,"https"),vn(d),T?Tl(d.toString(),u):Il(d.toString(),u)}else vt(2);i.G=0,i.l&&i.l.sa(a),Ps(i),Is(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),vt(2)):(this.j.info("Failed to ping google.com"),vt(1))};function Ps(i){if(i.G=0,i.ka=[],i.l){const a=os(i.h);(a.length!=0||i.i.length!=0)&&(D(i.ka,a),D(i.ka,i.i),i.h.i.length=0,O(i.i),i.i.length=0),i.l.ra()}}function Vs(i,a,u){var d=u instanceof Yt?kt(u):new Yt(u);if(d.g!="")a&&(d.g=a+"."+d.g),_n(d,d.s);else{var T=c.location;d=T.protocol,a=a?a+"."+T.hostname:T.hostname,T=+T.port;var w=new Yt(null);d&&yn(w,d),a&&(w.g=a),T&&_n(w,T),u&&(w.l=u),d=w}return u=i.D,a=i.ya,u&&a&&H(d,u,a),H(d,"VER",i.la),qe(i,d),d}function ks(i,a,u){if(a&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Ca&&!i.pa?new W(new En({eb:u})):new W(i.pa),a.Ha(i.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ds(){}n=Ds.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function bn(){}bn.prototype.g=function(i,a){return new It(i,a)};function It(i,a){dt.call(this),this.g=new Ts(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(i?i["X-WebChannel-Client-Profile"]=a.va:i={"X-WebChannel-Client-Profile":a.va}),this.g.S=i,(i=a&&a.Sb)&&!G(i)&&(this.g.m=i),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!G(a)&&(this.g.D=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new le(this)}k(It,dt),It.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},It.prototype.close=function(){Ir(this.g)},It.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=cr(i),i=u);a.i.push(new hl(a.Ya++,i)),a.G==3&&An(a)},It.prototype.N=function(){this.g.l=null,delete this.j,Ir(this.g),delete this.g,It.aa.N.call(this)};function Ns(i){dr.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){t:{for(const u in a){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}k(Ns,dr);function Ls(){fr.call(this),this.status=1}k(Ls,fr);function le(i){this.g=i}k(le,Ds),le.prototype.ua=function(){_t(this.g,"a")},le.prototype.ta=function(i){_t(this.g,new Ns(i))},le.prototype.sa=function(i){_t(this.g,new Ls)},le.prototype.ra=function(){_t(this.g,"b")},bn.prototype.createWebChannel=bn.prototype.g,It.prototype.send=It.prototype.o,It.prototype.open=It.prototype.m,It.prototype.close=It.prototype.close,Jo=function(){return new bn},Xo=function(){return fn()},Yo=Qt,Hr={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},mn.NO_ERROR=0,mn.TIMEOUT=8,mn.HTTP_ERROR=6,Dn=mn,Yi.COMPLETE="complete",Wo=Yi,Ki.EventType=ke,ke.OPEN="a",ke.CLOSE="b",ke.ERROR="c",ke.MESSAGE="d",dt.prototype.listen=dt.prototype.K,je=Ki,W.prototype.listenOnce=W.prototype.L,W.prototype.getLastError=W.prototype.Ka,W.prototype.getLastErrorCode=W.prototype.Ba,W.prototype.getStatus=W.prototype.Z,W.prototype.getResponseJson=W.prototype.Oa,W.prototype.getResponseText=W.prototype.oa,W.prototype.send=W.prototype.ea,W.prototype.setWithCredentials=W.prototype.Ha,Qo=W}).apply(typeof Cn<"u"?Cn:typeof self<"u"?self:typeof window<"u"?window:{});const Hs="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let we="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re=new zo("@firebase/firestore");function $e(){return re.logLevel}function V(n,...t){if(re.logLevel<=z.DEBUG){const e=t.map(ci);re.debug(`Firestore (${we}): ${n}`,...e)}}function xt(n,...t){if(re.logLevel<=z.ERROR){const e=t.map(ci);re.error(`Firestore (${we}): ${n}`,...e)}}function ge(n,...t){if(re.logLevel<=z.WARN){const e=t.map(ci);re.warn(`Firestore (${we}): ${n}`,...e)}}function ci(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n="Unexpected state"){const t=`FIRESTORE (${we}) INTERNAL ASSERTION FAILED: `+n;throw xt(t),new Error(t)}function X(n,t){n||F()}function U(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends Ie{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class lc{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(gt.UNAUTHENTICATED))}shutdown(){}}class uc{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class cc{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){X(this.o===void 0);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new ee;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ee,t.enqueueRetryable(()=>s(this.currentUser))};const l=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},c=h=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ee)}},0),l()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string"),new Zo(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return X(t===null||typeof t=="string"),new gt(t)}}class hc{constructor(t,e,r){this.l=t,this.h=e,this.P=r,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class dc{constructor(t,e,r){this.l=t,this.h=e,this.P=r}getToken(){return Promise.resolve(new hc(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class fc{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class mc{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){X(this.o===void 0);const r=o=>{o.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.R;return this.R=o.token,V("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(X(typeof e.token=="string"),this.R=e.token,new fc(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const s=pc(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%t.length))}return r}}function j(n,t){return n<t?-1:n>t?1:0}function ye(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Tt.fromMillis(Date.now())}static fromDate(t){return Tt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*e));return new Tt(e,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?j(this.nanoseconds,t.nanoseconds):j(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.timestamp=t}static fromTimestamp(t){return new M(t)}static min(){return new M(new Tt(0,0))}static max(){return new M(new Tt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(t,e,r){e===void 0?e=0:e>t.length&&F(),r===void 0?r=t.length-e:r>t.length-e&&F(),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Ze.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ze?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=t.get(s),l=e.get(s);if(o<l)return-1;if(o>l)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Y extends Ze{construct(t,e,r){return new Y(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new Y(e)}static emptyPath(){return new Y([])}}const gc=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Et extends Ze{construct(t,e,r){return new Et(t,e,r)}static isValidIdentifier(t){return gc.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Et.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Et(["__name__"])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let l=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else c==="`"?(l=!l,s++):c!=="."||l?(r+=c,s++):(o(),s++)}if(o(),l)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Et(e)}static emptyPath(){return new Et([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(t){this.path=t}static fromPath(t){return new L(Y.fromString(t))}static fromName(t){return new L(Y.fromString(t).popFirst(5))}static empty(){return new L(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new L(new Y(t.slice()))}}function yc(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=M.fromTimestamp(r===1e9?new Tt(e+1,0):new Tt(e,r));return new Kt(s,L.empty(),t)}function _c(n){return new Kt(n.readTime,n.key,-1)}class Kt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Kt(M.min(),L.empty(),-1)}static max(){return new Kt(M.max(),L.empty(),-1)}}function vc(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=L.comparator(n.documentKey,t.documentKey),e!==0?e:j(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Tc{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hi(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Ec)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&F(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new b((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof b?e:b.resolve(e)}catch(e){return b.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):b.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):b.reject(e)}static resolve(t){return new b((e,r)=>{e(t)})}static reject(t){return new b((e,r)=>{r(t)})}static waitFor(t){return new b((e,r)=>{let s=0,o=0,l=!1;t.forEach(c=>{++s,c.next(()=>{++o,l&&o===s&&e()},h=>r(h))}),l=!0,o===s&&e()})}static or(t){let e=b.resolve(!1);for(const r of t)e=e.next(s=>s?b.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new b((r,s)=>{const o=t.length,l=new Array(o);let c=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(y=>{l[f]=y,++c,c===o&&r(l)},y=>s(y))}})}static doWhile(t,e){return new b((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function Ic(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function sn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ie(r),this.se=r=>e.writeSequenceNumber(r))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}di.oe=-1;function Gn(n){return n==null}function Gr(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Qn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function wc(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(t,e){this.comparator=t,this.root=e||lt.EMPTY}insert(t,e){return new tt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,lt.BLACK,null,null))}remove(t){return new tt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,lt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Pn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Pn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Pn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Pn(this.root,t,this.comparator,!0)}}class Pn{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class lt{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??lt.RED,this.left=s??lt.EMPTY,this.right=o??lt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new lt(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return lt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return lt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,lt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,lt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw F();const t=this.left.check();if(t!==this.right.check())throw F();return t+(this.isRed()?0:1)}}lt.EMPTY=null,lt.RED=!0,lt.BLACK=!1;lt.EMPTY=new class{constructor(){this.size=0}get key(){throw F()}get value(){throw F()}get color(){throw F()}get left(){throw F()}get right(){throw F()}copy(t,e,r,s,o){return this}insert(t,e,r){return new lt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t){this.comparator=t,this.data=new tt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Qs(this.data.getIterator())}getIteratorFrom(t){return new Qs(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof ut)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ut(this.comparator);return e.data=t,e}}class Qs{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(t){this.fields=t,t.sort(Et.comparator)}static empty(){return new Ut([])}unionWith(t){let e=new ut(Et.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Ut(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ye(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new ea("Invalid base64 string: "+o):o}}(t);return new ct(e)}static fromUint8Array(t){const e=function(s){let o="";for(let l=0;l<s.length;++l)o+=String.fromCharCode(s[l]);return o}(t);return new ct(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return j(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ct.EMPTY_BYTE_STRING=new ct("");const Ac=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ht(n){if(X(!!n),typeof n=="string"){let t=0;const e=Ac.exec(n);if(X(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Z(n.seconds),nanos:Z(n.nanos)}}function Z(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ie(n){return typeof n=="string"?ct.fromBase64String(n):ct.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fi(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function mi(n){const t=n.mapValue.fields.__previous_value__;return fi(t)?mi(t):t}function tn(n){const t=Ht(n.mapValue.fields.__local_write_time__.timestampValue);return new Tt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(t,e,r,s,o,l,c,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=f}}class en{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new en("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof en&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn={mapValue:{}};function se(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?fi(n)?4:Sc(n)?9007199254740991:bc(n)?10:11:F()}function St(n,t){if(n===t)return!0;const e=se(n);if(e!==se(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return tn(n).isEqual(tn(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const l=Ht(s.timestampValue),c=Ht(o.timestampValue);return l.seconds===c.seconds&&l.nanos===c.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return ie(s.bytesValue).isEqual(ie(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return Z(s.geoPointValue.latitude)===Z(o.geoPointValue.latitude)&&Z(s.geoPointValue.longitude)===Z(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return Z(s.integerValue)===Z(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const l=Z(s.doubleValue),c=Z(o.doubleValue);return l===c?Gr(l)===Gr(c):isNaN(l)&&isNaN(c)}return!1}(n,t);case 9:return ye(n.arrayValue.values||[],t.arrayValue.values||[],St);case 10:case 11:return function(s,o){const l=s.mapValue.fields||{},c=o.mapValue.fields||{};if(Gs(l)!==Gs(c))return!1;for(const h in l)if(l.hasOwnProperty(h)&&(c[h]===void 0||!St(l[h],c[h])))return!1;return!0}(n,t);default:return F()}}function nn(n,t){return(n.values||[]).find(e=>St(e,t))!==void 0}function _e(n,t){if(n===t)return 0;const e=se(n),r=se(t);if(e!==r)return j(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,t.booleanValue);case 2:return function(o,l){const c=Z(o.integerValue||o.doubleValue),h=Z(l.integerValue||l.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,t);case 3:return Ws(n.timestampValue,t.timestampValue);case 4:return Ws(tn(n),tn(t));case 5:return j(n.stringValue,t.stringValue);case 6:return function(o,l){const c=ie(o),h=ie(l);return c.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,l){const c=o.split("/"),h=l.split("/");for(let f=0;f<c.length&&f<h.length;f++){const y=j(c[f],h[f]);if(y!==0)return y}return j(c.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,l){const c=j(Z(o.latitude),Z(l.latitude));return c!==0?c:j(Z(o.longitude),Z(l.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Ys(n.arrayValue,t.arrayValue);case 10:return function(o,l){var c,h,f,y;const A=o.fields||{},R=l.fields||{},S=(c=A.value)===null||c===void 0?void 0:c.arrayValue,k=(h=R.value)===null||h===void 0?void 0:h.arrayValue,O=j(((f=S==null?void 0:S.values)===null||f===void 0?void 0:f.length)||0,((y=k==null?void 0:k.values)===null||y===void 0?void 0:y.length)||0);return O!==0?O:Ys(S,k)}(n.mapValue,t.mapValue);case 11:return function(o,l){if(o===Vn.mapValue&&l===Vn.mapValue)return 0;if(o===Vn.mapValue)return 1;if(l===Vn.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),f=l.fields||{},y=Object.keys(f);h.sort(),y.sort();for(let A=0;A<h.length&&A<y.length;++A){const R=j(h[A],y[A]);if(R!==0)return R;const S=_e(c[h[A]],f[y[A]]);if(S!==0)return S}return j(h.length,y.length)}(n.mapValue,t.mapValue);default:throw F()}}function Ws(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return j(n,t);const e=Ht(n),r=Ht(t),s=j(e.seconds,r.seconds);return s!==0?s:j(e.nanos,r.nanos)}function Ys(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=_e(e[s],r[s]);if(o)return o}return j(e.length,r.length)}function ve(n){return Qr(n)}function Qr(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=Ht(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return ie(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return L.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Qr(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const l of r)o?o=!1:s+=",",s+=`${l}:${Qr(e.fields[l])}`;return s+"}"}(n.mapValue):F()}function Wr(n){return!!n&&"integerValue"in n}function pi(n){return!!n&&"arrayValue"in n}function Xs(n){return!!n&&"nullValue"in n}function Js(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Vr(n){return!!n&&"mapValue"in n}function bc(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function Ge(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Qn(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=Ge(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Ge(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Sc(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.value=t}static empty(){return new Rt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Vr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Ge(e)}setAll(t){let e=Et.emptyPath(),r={},s=[];t.forEach((l,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=c.popLast()}l?r[c.lastSegment()]=Ge(l):s.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());Vr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return St(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Vr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){Qn(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new Rt(Ge(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(t,e,r,s,o,l,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=l,this.documentState=c}static newInvalidDocument(t){return new yt(t,0,M.min(),M.min(),M.min(),Rt.empty(),0)}static newFoundDocument(t,e,r,s){return new yt(t,1,e,M.min(),r,s,0)}static newNoDocument(t,e){return new yt(t,2,e,M.min(),M.min(),Rt.empty(),0)}static newUnknownDocument(t,e){return new yt(t,3,e,M.min(),M.min(),Rt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(M.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Rt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=M.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof yt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new yt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(t,e){this.position=t,this.inclusive=e}}function Zs(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],l=n.position[s];if(o.field.isKeyField()?r=L.comparator(L.fromName(l.referenceValue),e.key):r=_e(l,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function to(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!St(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(t,e="asc"){this.field=t,this.dir=e}}function Cc(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{}class rt extends na{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Vc(t,e,r):e==="array-contains"?new Nc(t,r):e==="in"?new Lc(t,r):e==="not-in"?new xc(t,r):e==="array-contains-any"?new Mc(t,r):new rt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new kc(t,r):new Dc(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(_e(e,this.value)):e!==null&&se(this.value)===se(e)&&this.matchesComparison(_e(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return F()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ct extends na{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Ct(t,e)}matches(t){return ra(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ra(n){return n.op==="and"}function ia(n){return Pc(n)&&ra(n)}function Pc(n){for(const t of n.filters)if(t instanceof Ct)return!1;return!0}function Yr(n){if(n instanceof rt)return n.field.canonicalString()+n.op.toString()+ve(n.value);if(ia(n))return n.filters.map(t=>Yr(t)).join(",");{const t=n.filters.map(e=>Yr(e)).join(",");return`${n.op}(${t})`}}function sa(n,t){return n instanceof rt?function(r,s){return s instanceof rt&&r.op===s.op&&r.field.isEqual(s.field)&&St(r.value,s.value)}(n,t):n instanceof Ct?function(r,s){return s instanceof Ct&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,l,c)=>o&&sa(l,s.filters[c]),!0):!1}(n,t):void F()}function oa(n){return n instanceof rt?function(e){return`${e.field.canonicalString()} ${e.op} ${ve(e.value)}`}(n):n instanceof Ct?function(e){return e.op.toString()+" {"+e.getFilters().map(oa).join(" ,")+"}"}(n):"Filter"}class Vc extends rt{constructor(t,e,r){super(t,e,r),this.key=L.fromName(r.referenceValue)}matches(t){const e=L.comparator(t.key,this.key);return this.matchesComparison(e)}}class kc extends rt{constructor(t,e){super(t,"in",e),this.keys=aa("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Dc extends rt{constructor(t,e){super(t,"not-in",e),this.keys=aa("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function aa(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>L.fromName(r.referenceValue))}class Nc extends rt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return pi(e)&&nn(e.arrayValue,this.value)}}class Lc extends rt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&nn(this.value.arrayValue,e)}}class xc extends rt{constructor(t,e){super(t,"not-in",e)}matches(t){if(nn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!nn(this.value.arrayValue,e)}}class Mc extends rt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!pi(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>nn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(t,e=null,r=[],s=[],o=null,l=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=l,this.endAt=c,this.ue=null}}function eo(n,t=null,e=[],r=[],s=null,o=null,l=null){return new Oc(n,t,e,r,s,o,l)}function gi(n){const t=U(n);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Yr(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Gn(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>ve(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>ve(r)).join(",")),t.ue=e}return t.ue}function yi(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Cc(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!sa(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!to(n.startAt,t.startAt)&&to(n.endAt,t.endAt)}function Xr(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(t,e=null,r=[],s=[],o=null,l="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=l,this.startAt=c,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Fc(n,t,e,r,s,o,l,c){return new Wn(n,t,e,r,s,o,l,c)}function _i(n){return new Wn(n)}function no(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Bc(n){return n.collectionGroup!==null}function Qe(n){const t=U(n);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(l){let c=new ut(Et.comparator);return l.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new Un(o,r))}),e.has(Et.keyField().canonicalString())||t.ce.push(new Un(Et.keyField(),r))}return t.ce}function bt(n){const t=U(n);return t.le||(t.le=Uc(t,Qe(n))),t.le}function Uc(n,t){if(n.limitType==="F")return eo(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Un(s.field,o)});const e=n.endAt?new Bn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Bn(n.startAt.position,n.startAt.inclusive):null;return eo(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Jr(n,t,e){return new Wn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Yn(n,t){return yi(bt(n),bt(t))&&n.limitType===t.limitType}function la(n){return`${gi(bt(n))}|lt:${n.limitType}`}function ce(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>oa(s)).join(", ")}]`),Gn(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(l){return`${l.field.canonicalString()} (${l.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>ve(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>ve(s)).join(",")),`Target(${r})`}(bt(n))}; limitType=${n.limitType})`}function Xn(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of Qe(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(l,c,h){const f=Zs(l,c,h);return l.inclusive?f<=0:f<0}(r.startAt,Qe(r),s)||r.endAt&&!function(l,c,h){const f=Zs(l,c,h);return l.inclusive?f>=0:f>0}(r.endAt,Qe(r),s))}(n,t)}function zc(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function ua(n){return(t,e)=>{let r=!1;for(const s of Qe(n)){const o=qc(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function qc(n,t,e){const r=n.field.isKeyField()?L.comparator(t.key,e.key):function(o,l,c){const h=l.data.field(o),f=c.data.field(o);return h!==null&&f!==null?_e(h,f):F()}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return F()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Qn(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return wc(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=new tt(L.comparator);function Gt(){return $c}const ca=new tt(L.comparator);function Ke(...n){let t=ca;for(const e of n)t=t.insert(e.key,e);return t}function jc(n){let t=ca;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function Zt(){return We()}function ha(){return We()}function We(){return new Ae(n=>n.toString(),(n,t)=>n.isEqual(t))}const Kc=new ut(L.comparator);function q(...n){let t=Kc;for(const e of n)t=t.add(e);return t}const Hc=new ut(j);function Gc(){return Hc}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Gr(t)?"-0":t}}function Wc(n){return{integerValue:""+n}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(){this._=void 0}}function Yc(n,t,e){return n instanceof Zr?function(s,o){const l={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&fi(o)&&(o=mi(o)),o&&(l.fields.__previous_value__=o),{mapValue:l}}(e,t):n instanceof zn?da(n,t):n instanceof qn?fa(n,t):function(s,o){const l=Jc(s,o),c=ro(l)+ro(s.Pe);return Wr(l)&&Wr(s.Pe)?Wc(c):Qc(s.serializer,c)}(n,t)}function Xc(n,t,e){return n instanceof zn?da(n,t):n instanceof qn?fa(n,t):e}function Jc(n,t){return n instanceof ti?function(r){return Wr(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class Zr extends Jn{}class zn extends Jn{constructor(t){super(),this.elements=t}}function da(n,t){const e=ma(t);for(const r of n.elements)e.some(s=>St(s,r))||e.push(r);return{arrayValue:{values:e}}}class qn extends Jn{constructor(t){super(),this.elements=t}}function fa(n,t){let e=ma(t);for(const r of n.elements)e=e.filter(s=>!St(s,r));return{arrayValue:{values:e}}}class ti extends Jn{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function ro(n){return Z(n.integerValue||n.doubleValue)}function ma(n){return pi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Zc(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof zn&&s instanceof zn||r instanceof qn&&s instanceof qn?ye(r.elements,s.elements,St):r instanceof ti&&s instanceof ti?St(r.Pe,s.Pe):r instanceof Zr&&s instanceof Zr}(n.transform,t.transform)}class ne{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ne}static exists(t){return new ne(void 0,t)}static updateTime(t){return new ne(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Nn(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class vi{}function pa(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new eh(n.key,ne.none()):new Ei(n.key,n.data,ne.none());{const e=n.data,r=Rt.empty();let s=new ut(Et.comparator);for(let o of t.fields)if(!s.has(o)){let l=e.field(o);l===null&&o.length>1&&(o=o.popLast(),l=e.field(o)),l===null?r.delete(o):r.set(o,l),s=s.add(o)}return new Zn(n.key,r,new Ut(s.toArray()),ne.none())}}function th(n,t,e){n instanceof Ei?function(s,o,l){const c=s.value.clone(),h=so(s.fieldTransforms,o,l.transformResults);c.setAll(h),o.convertToFoundDocument(l.version,c).setHasCommittedMutations()}(n,t,e):n instanceof Zn?function(s,o,l){if(!Nn(s.precondition,o))return void o.convertToUnknownDocument(l.version);const c=so(s.fieldTransforms,o,l.transformResults),h=o.data;h.setAll(ga(s)),h.setAll(c),o.convertToFoundDocument(l.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()}(0,t,e)}function Ye(n,t,e,r){return n instanceof Ei?function(o,l,c,h){if(!Nn(o.precondition,l))return c;const f=o.value.clone(),y=oo(o.fieldTransforms,h,l);return f.setAll(y),l.convertToFoundDocument(l.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof Zn?function(o,l,c,h){if(!Nn(o.precondition,l))return c;const f=oo(o.fieldTransforms,h,l),y=l.data;return y.setAll(ga(o)),y.setAll(f),l.convertToFoundDocument(l.version,y).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(A=>A.field))}(n,t,e,r):function(o,l,c){return Nn(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):c}(n,t,e)}function io(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ye(r,s,(o,l)=>Zc(o,l))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Ei extends vi{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Zn extends vi{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function ga(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function so(n,t,e){const r=new Map;X(n.length===e.length);for(let s=0;s<e.length;s++){const o=n[s],l=o.transform,c=t.data.field(o.field);r.set(o.field,Xc(l,c,e[s]))}return r}function oo(n,t,e){const r=new Map;for(const s of n){const o=s.transform,l=e.data.field(s.field);r.set(s.field,Yc(o,l,t))}return r}class eh extends vi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&th(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Ye(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Ye(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=ha();return this.mutations.forEach(s=>{const o=t.get(s.key),l=o.overlayedDocument;let c=this.applyToLocalView(l,o.mutatedFields);c=e.has(s.key)?null:c;const h=pa(l,c);h!==null&&r.set(s.key,h),l.isValidDocument()||l.convertToNoDocument(M.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),q())}isEqual(t){return this.batchId===t.batchId&&ye(this.mutations,t.mutations,(e,r)=>io(e,r))&&ye(this.baseMutations,t.baseMutations,(e,r)=>io(e,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,B;function ya(n){if(n===void 0)return xt("GRPC error has no .code"),P.UNKNOWN;switch(n){case et.OK:return P.OK;case et.CANCELLED:return P.CANCELLED;case et.UNKNOWN:return P.UNKNOWN;case et.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case et.INTERNAL:return P.INTERNAL;case et.UNAVAILABLE:return P.UNAVAILABLE;case et.UNAUTHENTICATED:return P.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case et.NOT_FOUND:return P.NOT_FOUND;case et.ALREADY_EXISTS:return P.ALREADY_EXISTS;case et.PERMISSION_DENIED:return P.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case et.ABORTED:return P.ABORTED;case et.OUT_OF_RANGE:return P.OUT_OF_RANGE;case et.UNIMPLEMENTED:return P.UNIMPLEMENTED;case et.DATA_LOSS:return P.DATA_LOSS;default:return F()}}(B=et||(et={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh=new te([4294967295,4294967295],0);function ao(n){const t=sh().encode(n),e=new Go;return e.update(t),new Uint8Array(e.digest())}function lo(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new te([e,r],0),new te([s,o],0)]}class Ti{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new He(`Invalid padding: ${e}`);if(r<0)throw new He(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new He(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new He(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=te.fromNumber(this.Ie)}Ee(t,e,r){let s=t.add(e.multiply(te.fromNumber(r)));return s.compare(oh)===1&&(s=new te([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=ao(t),[r,s]=lo(e);for(let o=0;o<this.hashCount;o++){const l=this.Ee(r,s,o);if(!this.de(l))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),l=new Ti(o,s,e);return r.forEach(c=>l.insert(c)),l}insert(t){if(this.Ie===0)return;const e=ao(t),[r,s]=lo(e);for(let o=0;o<this.hashCount;o++){const l=this.Ee(r,s,o);this.Ae(l)}}Ae(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class He extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,on.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new tr(M.min(),s,new tt(j),Gt(),q())}}class on{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new on(r,e,q(),q(),q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(t,e,r,s){this.Re=t,this.removedTargetIds=e,this.key=r,this.Ve=s}}class _a{constructor(t,e){this.targetId=t,this.me=e}}class va{constructor(t,e,r=ct.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class uo{constructor(){this.fe=0,this.ge=ho(),this.pe=ct.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=q(),e=q(),r=q();return this.ge.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:F()}}),new on(this.pe,this.ye,t,e,r)}Ce(){this.we=!1,this.ge=ho()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,X(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class ah{constructor(t){this.Le=t,this.Be=new Map,this.ke=Gt(),this.qe=co(),this.Qe=new tt(j)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const r=this.Ge(e);switch(t.state){case 0:this.ze(e)&&r.De(t.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(t.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(r.Ne(),r.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),r.De(t.resumeToken));break;default:F()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((r,s)=>{this.ze(s)&&e(s)})}He(t){const e=t.targetId,r=t.me.count,s=this.Je(e);if(s){const o=s.target;if(Xr(o))if(r===0){const l=new L(o.path);this.Ue(e,l,yt.newNoDocument(l,M.min()))}else X(r===1);else{const l=this.Ye(e);if(l!==r){const c=this.Ze(t),h=c?this.Xe(c,t,l):1;if(h!==0){this.je(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,f)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let l,c;try{l=ie(r).toUint8Array()}catch(h){if(h instanceof ea)return ge("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new Ti(l,s,o)}catch(h){return ge(h instanceof He?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.Ie===0?null:c}Xe(t,e,r){return e.me.count===r-this.nt(t,e.targetId)?0:2}nt(t,e){const r=this.Le.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const l=this.Le.tt(),c=`projects/${l.projectId}/databases/${l.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.Ue(e,o,null),s++)}),s}rt(t){const e=new Map;this.Be.forEach((o,l)=>{const c=this.Je(l);if(c){if(o.current&&Xr(c.target)){const h=new L(c.target.path);this.ke.get(h)!==null||this.it(l,h)||this.Ue(l,h,yt.newNoDocument(h,t))}o.be&&(e.set(l,o.ve()),o.Ce())}});let r=q();this.qe.forEach((o,l)=>{let c=!0;l.forEachWhile(h=>{const f=this.Je(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(o))}),this.ke.forEach((o,l)=>l.setReadTime(t));const s=new tr(t,e,this.Qe,this.ke,r);return this.ke=Gt(),this.qe=co(),this.Qe=new tt(j),s}$e(t,e){if(!this.ze(t))return;const r=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,r),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,r){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,e)?s.Fe(e,1):s.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),r&&(this.ke=this.ke.insert(e,r))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new uo,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new ut(j),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||V("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new uo),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function co(){return new tt(L.comparator)}function ho(){return new tt(L.comparator)}const lh={asc:"ASCENDING",desc:"DESCENDING"},uh={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ch={and:"AND",or:"OR"};class hh{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ei(n,t){return n.useProto3Json||Gn(t)?t:{value:t}}function dh(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function fh(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function me(n){return X(!!n),M.fromTimestamp(function(e){const r=Ht(e);return new Tt(r.seconds,r.nanos)}(n))}function mh(n,t){return ni(n,t).canonicalString()}function ni(n,t){const e=function(s){return new Y(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Ea(n){const t=Y.fromString(n);return X(Ra(t)),t}function kr(n,t){const e=Ea(t);if(e.get(1)!==n.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new L(Ia(e))}function Ta(n,t){return mh(n.databaseId,t)}function ph(n){const t=Ea(n);return t.length===4?Y.emptyPath():Ia(t)}function fo(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ia(n){return X(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function gh(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:F()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(f,y){return f.useProto3Json?(X(y===void 0||typeof y=="string"),ct.fromBase64String(y||"")):(X(y===void 0||y instanceof Buffer||y instanceof Uint8Array),ct.fromUint8Array(y||new Uint8Array))}(n,t.targetChange.resumeToken),l=t.targetChange.cause,c=l&&function(f){const y=f.code===void 0?P.UNKNOWN:ya(f.code);return new N(y,f.message||"")}(l);e=new va(r,s,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=kr(n,r.document.name),o=me(r.document.updateTime),l=r.document.createTime?me(r.document.createTime):M.min(),c=new Rt({mapValue:{fields:r.document.fields}}),h=yt.newFoundDocument(s,o,l,c),f=r.targetIds||[],y=r.removedTargetIds||[];e=new Ln(f,y,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=kr(n,r.document),o=r.readTime?me(r.readTime):M.min(),l=yt.newNoDocument(s,o),c=r.removedTargetIds||[];e=new Ln([],c,l.key,l)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=kr(n,r.document),o=r.removedTargetIds||[];e=new Ln([],o,s,null)}else{if(!("filter"in t))return F();{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,l=new ih(s,o),c=r.targetId;e=new _a(c,l)}}return e}function yh(n,t){return{documents:[Ta(n,t.path)]}}function _h(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Ta(n,s);const o=function(f){if(f.length!==0)return Aa(Ct.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const l=function(f){if(f.length!==0)return f.map(y=>function(R){return{field:he(R.field),direction:Th(R.dir)}}(y))}(t.orderBy);l&&(e.structuredQuery.orderBy=l);const c=ei(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{_t:e,parent:s}}function vh(n){let t=ph(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){X(r===1);const y=e.from[0];y.allDescendants?s=y.collectionId:t=t.child(y.collectionId)}let o=[];e.where&&(o=function(A){const R=wa(A);return R instanceof Ct&&ia(R)?R.getFilters():[R]}(e.where));let l=[];e.orderBy&&(l=function(A){return A.map(R=>function(k){return new Un(de(k.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(R))}(e.orderBy));let c=null;e.limit&&(c=function(A){let R;return R=typeof A=="object"?A.value:A,Gn(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(A){const R=!!A.before,S=A.values||[];return new Bn(S,R)}(e.startAt));let f=null;return e.endAt&&(f=function(A){const R=!A.before,S=A.values||[];return new Bn(S,R)}(e.endAt)),Fc(t,s,l,o,c,"F",h,f)}function Eh(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function wa(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=de(e.unaryFilter.field);return rt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=de(e.unaryFilter.field);return rt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=de(e.unaryFilter.field);return rt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=de(e.unaryFilter.field);return rt.create(l,"!=",{nullValue:"NULL_VALUE"});default:return F()}}(n):n.fieldFilter!==void 0?function(e){return rt.create(de(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return F()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Ct.create(e.compositeFilter.filters.map(r=>wa(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F()}}(e.compositeFilter.op))}(n):F()}function Th(n){return lh[n]}function Ih(n){return uh[n]}function wh(n){return ch[n]}function he(n){return{fieldPath:n.canonicalString()}}function de(n){return Et.fromServerFormat(n.fieldPath)}function Aa(n){return n instanceof rt?function(e){if(e.op==="=="){if(Js(e.value))return{unaryFilter:{field:he(e.field),op:"IS_NAN"}};if(Xs(e.value))return{unaryFilter:{field:he(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Js(e.value))return{unaryFilter:{field:he(e.field),op:"IS_NOT_NAN"}};if(Xs(e.value))return{unaryFilter:{field:he(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:he(e.field),op:Ih(e.op),value:e.value}}}(n):n instanceof Ct?function(e){const r=e.getFilters().map(s=>Aa(s));return r.length===1?r[0]:{compositeFilter:{op:wh(e.op),filters:r}}}(n):F()}function Ra(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t,e,r,s,o=M.min(),l=M.min(),c=ct.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=l,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new zt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new zt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(t){this.ct=t}}function Rh(n){const t=vh({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Jr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(){this.un=new Sh}addToCollectionParentIndex(t,e){return this.un.add(e),b.resolve()}getCollectionParents(t,e){return b.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return b.resolve()}deleteFieldIndex(t,e){return b.resolve()}deleteAllFieldIndexes(t){return b.resolve()}createTargetIndexes(t,e){return b.resolve()}getDocumentsMatchingTarget(t,e){return b.resolve(null)}getIndexType(t,e){return b.resolve(0)}getFieldIndexes(t,e){return b.resolve([])}getNextCollectionGroupToUpdate(t){return b.resolve(null)}getMinOffset(t,e){return b.resolve(Kt.min())}getMinOffsetFromCollectionGroup(t,e){return b.resolve(Kt.min())}updateCollectionGroup(t,e,r){return b.resolve()}updateIndexEntries(t,e){return b.resolve()}}class Sh{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ut(Y.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ut(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ee(0)}static kn(){return new Ee(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(){this.changes=new Ae(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,yt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?b.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&Ye(r.mutation,s,Ut.empty(),Tt.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,q()).next(()=>r))}getLocalViewOfDocuments(t,e,r=q()){const s=Zt();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let l=Ke();return o.forEach((c,h)=>{l=l.insert(c,h.overlayedDocument)}),l}))}getOverlayedDocuments(t,e){const r=Zt();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,q()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((l,c)=>{e.set(l,c)})})}computeViews(t,e,r,s){let o=Gt();const l=We(),c=function(){return We()}();return e.forEach((h,f)=>{const y=r.get(f.key);s.has(f.key)&&(y===void 0||y.mutation instanceof Zn)?o=o.insert(f.key,f):y!==void 0?(l.set(f.key,y.mutation.getFieldMask()),Ye(y.mutation,f,y.mutation.getFieldMask(),Tt.now())):l.set(f.key,Ut.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,y)=>l.set(f,y)),e.forEach((f,y)=>{var A;return c.set(f,new Ph(y,(A=l.get(f))!==null&&A!==void 0?A:null))}),c))}recalculateAndSaveOverlays(t,e){const r=We();let s=new tt((l,c)=>l-c),o=q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(l=>{for(const c of l)c.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let y=r.get(h)||Ut.empty();y=c.applyToLocalView(f,y),r.set(h,y);const A=(s.get(c.batchId)||q()).add(h);s=s.insert(c.batchId,A)})}).next(()=>{const l=[],c=s.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),f=h.key,y=h.value,A=ha();y.forEach(R=>{if(!o.has(R)){const S=pa(e.get(R),r.get(R));S!==null&&A.set(R,S),o=o.add(R)}}),l.push(this.documentOverlayCache.saveOverlays(t,f,A))}return b.waitFor(l)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(l){return L.isDocumentKey(l.path)&&l.collectionGroup===null&&l.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Bc(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const l=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):b.resolve(Zt());let c=-1,h=o;return l.next(f=>b.forEach(f,(y,A)=>(c<A.largestBatchId&&(c=A.largestBatchId),o.get(y)?b.resolve():this.remoteDocumentCache.getEntry(t,y).next(R=>{h=h.insert(y,R)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,q())).next(y=>({batchId:c,changes:jc(y)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new L(e)).next(r=>{let s=Ke();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let l=Ke();return this.indexManager.getCollectionParents(t,o).next(c=>b.forEach(c,h=>{const f=function(A,R){return new Wn(R,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next(y=>{y.forEach((A,R)=>{l=l.insert(A,R)})})}).next(()=>l))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(l=>{o.forEach((h,f)=>{const y=f.getKey();l.get(y)===null&&(l=l.insert(y,yt.newInvalidDocument(y)))});let c=Ke();return l.forEach((h,f)=>{const y=o.get(h);y!==void 0&&Ye(y.mutation,f,Ut.empty(),Tt.now()),Xn(e,f)&&(c=c.insert(h,f))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return b.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:me(s.createTime)}}(e)),b.resolve()}getNamedQuery(t,e){return b.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(s){return{name:s.name,query:Rh(s.bundledQuery),readTime:me(s.readTime)}}(e)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(){this.overlays=new tt(L.comparator),this.Ir=new Map}getOverlay(t,e){return b.resolve(this.overlays.get(e))}getOverlays(t,e){const r=Zt();return b.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.ht(t,e,o)}),b.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),b.resolve()}getOverlaysForCollection(t,e,r){const s=Zt(),o=e.length+1,l=new L(e.child("")),c=this.overlays.getIteratorFrom(l);for(;c.hasNext();){const h=c.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return b.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new tt((f,y)=>f-y);const l=this.overlays.getIterator();for(;l.hasNext();){const f=l.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let y=o.get(f.largestBatchId);y===null&&(y=Zt(),o=o.insert(f.largestBatchId,y)),y.set(f.getKey(),f)}}const c=Zt(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,y)=>c.set(f,y)),!(c.size()>=s)););return b.resolve(c)}ht(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const l=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,l)}this.overlays=this.overlays.insert(r.key,new rh(e,r));let o=this.Ir.get(e);o===void 0&&(o=q(),this.Ir.set(e,o)),this.Ir.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(){this.sessionToken=ct.EMPTY_BYTE_STRING}getSessionToken(t){return b.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(){this.Tr=new ut(st.Er),this.dr=new ut(st.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const r=new st(t,e);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Vr(new st(t,e))}mr(t,e){t.forEach(r=>this.removeReference(r,e))}gr(t){const e=new L(new Y([])),r=new st(e,t),s=new st(e,t+1),o=[];return this.dr.forEachInRange([r,s],l=>{this.Vr(l),o.push(l.key)}),o}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new L(new Y([])),r=new st(e,t),s=new st(e,t+1);let o=q();return this.dr.forEachInRange([r,s],l=>{o=o.add(l.key)}),o}containsKey(t){const e=new st(t,0),r=this.Tr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class st{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return L.comparator(t.key,e.key)||j(t.wr,e.wr)}static Ar(t,e){return j(t.wr,e.wr)||L.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new ut(st.Er)}checkEmpty(t){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new nh(o,e,r,s);this.mutationQueue.push(l);for(const c of s)this.br=this.br.add(new st(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return b.resolve(l)}lookupMutationBatch(t,e){return b.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.vr(r),o=s<0?0:s;return b.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new st(e,0),s=new st(e,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],l=>{const c=this.Dr(l.wr);o.push(c)}),b.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ut(j);return e.forEach(s=>{const o=new st(s,0),l=new st(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,l],c=>{r=r.add(c.wr)})}),b.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;L.isDocumentKey(o)||(o=o.child(""));const l=new st(new L(o),0);let c=new ut(j);return this.br.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(c=c.add(h.wr)),!0)},l),b.resolve(this.Cr(c))}Cr(t){const e=[];return t.forEach(r=>{const s=this.Dr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){X(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return b.forEach(e.mutations,s=>{const o=new st(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.br=r})}On(t){}containsKey(t,e){const r=new st(e,0),s=this.br.firstAfterOrEqual(r);return b.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,b.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(t){this.Mr=t,this.docs=function(){return new tt(L.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,l=this.Mr(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return b.resolve(r?r.document.mutableCopy():yt.newInvalidDocument(e))}getEntries(t,e){let r=Gt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():yt.newInvalidDocument(s))}),b.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Gt();const l=e.path,c=new L(l.child("")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:f,value:{document:y}}=h.getNext();if(!l.isPrefixOf(f.path))break;f.path.length>l.length+1||vc(_c(y),r)<=0||(s.has(y.key)||Xn(e,y))&&(o=o.insert(y.key,y.mutableCopy()))}return b.resolve(o)}getAllFromCollectionGroup(t,e,r,s){F()}Or(t,e){return b.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Mh(this)}getSize(t){return b.resolve(this.size)}}class Mh extends Ch{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.cr.addEntry(t,s)):this.cr.removeEntry(r)}),b.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(t){this.persistence=t,this.Nr=new Ae(e=>gi(e),yi),this.lastRemoteSnapshotVersion=M.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Ii,this.targetCount=0,this.kr=Ee.Bn()}forEachTarget(t,e){return this.Nr.forEach((r,s)=>e(s)),b.resolve()}getLastRemoteSnapshotVersion(t){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return b.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.Lr&&(this.Lr=e),b.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new Ee(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,b.resolve()}updateTargetData(t,e){return this.Kn(e),b.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,b.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.Nr.forEach((l,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.Nr.delete(l),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)}),b.waitFor(o).next(()=>s)}getTargetCount(t){return b.resolve(this.targetCount)}getTargetData(t,e){const r=this.Nr.get(e)||null;return b.resolve(r)}addMatchingKeys(t,e,r){return this.Br.Rr(e,r),b.resolve()}removeMatchingKeys(t,e,r){this.Br.mr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(l=>{o.push(s.markPotentiallyOrphaned(t,l))}),b.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),b.resolve()}getMatchingKeysForTargetId(t,e){const r=this.Br.yr(e);return b.resolve(r)}containsKey(t,e){return b.resolve(this.Br.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(t,e){this.qr={},this.overlays={},this.Qr=new di(0),this.Kr=!1,this.Kr=!0,this.$r=new Nh,this.referenceDelegate=t(this),this.Ur=new Oh(this),this.indexManager=new bh,this.remoteDocumentCache=function(s){return new xh(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Ah(e),this.Gr=new kh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Dh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.qr[t.toKey()];return r||(r=new Lh(e,this.referenceDelegate),this.qr[t.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,r){V("MemoryPersistence","Starting transaction:",t);const s=new Bh(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(o=>this.referenceDelegate.jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Hr(t,e){return b.or(Object.values(this.qr).map(r=>()=>r.containsKey(t,e)))}}class Bh extends Tc{constructor(t){super(),this.currentSequenceNumber=t}}class wi{constructor(t){this.persistence=t,this.Jr=new Ii,this.Yr=null}static Zr(t){return new wi(t)}get Xr(){if(this.Yr)return this.Yr;throw F()}addReference(t,e,r){return this.Jr.addReference(r,e),this.Xr.delete(r.toString()),b.resolve()}removeReference(t,e,r){return this.Jr.removeReference(r,e),this.Xr.add(r.toString()),b.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),b.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,r=>{const s=L.fromPath(r);return this.ei(t,s).next(o=>{o||e.removeEntry(s,M.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(r=>{r?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return b.or([()=>b.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.$i=r,this.Ui=s}static Wi(t,e){let r=q(),s=q();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Ai(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return $l()?8:Ic(zl())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.Yi(t,e).next(l=>{o.result=l}).next(()=>{if(!o.result)return this.Zi(t,e,s,r).next(l=>{o.result=l})}).next(()=>{if(o.result)return;const l=new Uh;return this.Xi(t,e,l).next(c=>{if(o.result=c,this.zi)return this.es(t,e,l,c.size)})}).next(()=>o.result)}es(t,e,r,s){return r.documentReadCount<this.ji?($e()<=z.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",ce(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):($e()<=z.DEBUG&&V("QueryEngine","Query:",ce(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?($e()<=z.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",ce(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,bt(e))):b.resolve())}Yi(t,e){if(no(e))return b.resolve(null);let r=bt(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Jr(e,null,"F"),r=bt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const l=q(...o);return this.Ji.getDocuments(t,l).next(c=>this.indexManager.getMinOffset(t,r).next(h=>{const f=this.ts(e,c);return this.ns(e,f,l,h.readTime)?this.Yi(t,Jr(e,null,"F")):this.rs(t,f,e,h)}))})))}Zi(t,e,r,s){return no(e)||s.isEqual(M.min())?b.resolve(null):this.Ji.getDocuments(t,r).next(o=>{const l=this.ts(e,o);return this.ns(e,l,r,s)?b.resolve(null):($e()<=z.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ce(e)),this.rs(t,l,e,yc(s,-1)).next(c=>c))})}ts(t,e){let r=new ut(ua(t));return e.forEach((s,o)=>{Xn(t,o)&&(r=r.add(o))}),r}ns(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(t,e,r){return $e()<=z.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",ce(e)),this.Ji.getDocumentsMatchingQuery(t,e,Kt.min(),r)}rs(t,e,r,s){return this.Ji.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(l=>{o=o.insert(l.key,l)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(t,e,r,s){this.persistence=t,this.ss=e,this.serializer=s,this.os=new tt(j),this._s=new Ae(o=>gi(o),yi),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(r)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Vh(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function $h(n,t,e,r){return new qh(n,t,e,r)}async function ba(n,t){const e=U(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.ls(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const l=[],c=[];let h=q();for(const f of s){l.push(f.batchId);for(const y of f.mutations)h=h.add(y.key)}for(const f of o){c.push(f.batchId);for(const y of f.mutations)h=h.add(y.key)}return e.localDocuments.getDocuments(r,h).next(f=>({hs:f,removedBatchIds:l,addedBatchIds:c}))})})}function Sa(n){const t=U(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function jh(n,t){const e=U(n),r=t.snapshotVersion;let s=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const l=e.cs.newChangeBuffer({trackRemovals:!0});s=e.os;const c=[];t.targetChanges.forEach((y,A)=>{const R=s.get(A);if(!R)return;c.push(e.Ur.removeMatchingKeys(o,y.removedDocuments,A).next(()=>e.Ur.addMatchingKeys(o,y.addedDocuments,A)));let S=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(A)!==null?S=S.withResumeToken(ct.EMPTY_BYTE_STRING,M.min()).withLastLimboFreeSnapshotVersion(M.min()):y.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(y.resumeToken,r)),s=s.insert(A,S),function(O,D,J){return O.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:J.addedDocuments.size+J.modifiedDocuments.size+J.removedDocuments.size>0}(R,S,y)&&c.push(e.Ur.updateTargetData(o,S))});let h=Gt(),f=q();if(t.documentUpdates.forEach(y=>{t.resolvedLimboDocuments.has(y)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,y))}),c.push(Kh(o,l,t.documentUpdates).next(y=>{h=y.Ps,f=y.Is})),!r.isEqual(M.min())){const y=e.Ur.getLastRemoteSnapshotVersion(o).next(A=>e.Ur.setTargetsMetadata(o,o.currentSequenceNumber,r));c.push(y)}return b.waitFor(c).next(()=>l.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.os=s,o))}function Kh(n,t,e){let r=q(),s=q();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let l=Gt();return e.forEach((c,h)=>{const f=o.get(c);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(c)),h.isNoDocument()&&h.version.isEqual(M.min())?(t.removeEntry(c,h.readTime),l=l.insert(c,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),l=l.insert(c,h)):V("LocalStore","Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",h.version)}),{Ps:l,Is:s}})}function Hh(n,t){const e=U(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.Ur.getTargetData(r,t).next(o=>o?(s=o,b.resolve(s)):e.Ur.allocateTargetId(r).next(l=>(s=new zt(t,l,"TargetPurposeListen",r.currentSequenceNumber),e.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.os=e.os.insert(r.targetId,r),e._s.set(t,r.targetId)),r})}async function ri(n,t,e){const r=U(n),s=r.os.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,l=>r.persistence.referenceDelegate.removeTarget(l,s))}catch(l){if(!sn(l))throw l;V("LocalStore",`Failed to update sequence numbers for target ${t}: ${l}`)}r.os=r.os.remove(t),r._s.delete(s.target)}function mo(n,t,e){const r=U(n);let s=M.min(),o=q();return r.persistence.runTransaction("Execute query","readwrite",l=>function(h,f,y){const A=U(h),R=A._s.get(y);return R!==void 0?b.resolve(A.os.get(R)):A.Ur.getTargetData(f,y)}(r,l,bt(t)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(l,c.targetId).next(h=>{o=h})}).next(()=>r.ss.getDocumentsMatchingQuery(l,t,e?s:M.min(),e?o:q())).next(c=>(Gh(r,zc(t),c),{documents:c,Ts:o})))}function Gh(n,t,e){let r=n.us.get(t)||M.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.us.set(t,r)}class po{constructor(){this.activeTargetIds=Gc()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Qh{constructor(){this.so=new po,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,r){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new po,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{_o(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){V("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){V("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kn=null;function Dr(){return kn===null?kn=function(){return 268435456+Math.round(2147483648*Math.random())}():kn++,"0x"+kn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="WebChannelConnection";class Jh extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const r=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+e.host,this.vo=`projects/${s}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}get Fo(){return!1}Mo(e,r,s,o,l){const c=Dr(),h=this.xo(e,r.toUriEncodedString());V("RestConnection",`Sending RPC '${e}' ${c}:`,h,s);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,l),this.No(e,h,f,s).then(y=>(V("RestConnection",`Received RPC '${e}' ${c}: `,y),y),y=>{throw ge("RestConnection",`RPC '${e}' ${c} failed with error: `,y,"url: ",h,"request:",s),y})}Lo(e,r,s,o,l,c){return this.Mo(e,r,s,o,l)}Oo(e,r,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+we}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,l)=>e[l]=o),s&&s.headers.forEach((o,l)=>e[l]=o)}xo(e,r){const s=Yh[e];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,r,s){const o=Dr();return new Promise((l,c)=>{const h=new Qo;h.setWithCredentials(!0),h.listenOnce(Wo.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Dn.NO_ERROR:const y=h.getResponseJson();V(pt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(y)),l(y);break;case Dn.TIMEOUT:V(pt,`RPC '${t}' ${o} timed out`),c(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case Dn.HTTP_ERROR:const A=h.getStatus();if(V(pt,`RPC '${t}' ${o} failed with status:`,A,"response text:",h.getResponseText()),A>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const S=R==null?void 0:R.error;if(S&&S.status&&S.message){const k=function(D){const J=D.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(J)>=0?J:P.UNKNOWN}(S.status);c(new N(k,S.message))}else c(new N(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new N(P.UNAVAILABLE,"Connection failed."));break;default:F()}}finally{V(pt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(s);V(pt,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",f,r,15)})}Bo(t,e,r){const s=Dr(),o=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],l=Jo(),c=Xo(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const y=o.join("");V(pt,`Creating RPC '${t}' stream ${s}: ${y}`,h);const A=l.createWebChannel(y,h);let R=!1,S=!1;const k=new Xh({Io:D=>{S?V(pt,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(R||(V(pt,`Opening RPC '${t}' stream ${s} transport.`),A.open(),R=!0),V(pt,`RPC '${t}' stream ${s} sending:`,D),A.send(D))},To:()=>A.close()}),O=(D,J,G)=>{D.listen(J,Q=>{try{G(Q)}catch(it){setTimeout(()=>{throw it},0)}})};return O(A,je.EventType.OPEN,()=>{S||(V(pt,`RPC '${t}' stream ${s} transport opened.`),k.yo())}),O(A,je.EventType.CLOSE,()=>{S||(S=!0,V(pt,`RPC '${t}' stream ${s} transport closed`),k.So())}),O(A,je.EventType.ERROR,D=>{S||(S=!0,ge(pt,`RPC '${t}' stream ${s} transport errored:`,D),k.So(new N(P.UNAVAILABLE,"The operation could not be completed")))}),O(A,je.EventType.MESSAGE,D=>{var J;if(!S){const G=D.data[0];X(!!G);const Q=G,it=Q.error||((J=Q[0])===null||J===void 0?void 0:J.error);if(it){V(pt,`RPC '${t}' stream ${s} received error:`,it);const Pt=it.status;let ot=function(g){const _=et[g];if(_!==void 0)return ya(_)}(Pt),E=it.message;ot===void 0&&(ot=P.INTERNAL,E="Unknown error status: "+Pt+" with message "+it.message),S=!0,k.So(new N(ot,E)),A.close()}else V(pt,`RPC '${t}' stream ${s} received:`,G),k.bo(G)}}),O(c,Yo.STAT_EVENT,D=>{D.stat===Hr.PROXY?V(pt,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===Hr.NOPROXY&&V(pt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function Nr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ca(n){return new hh(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(t,e,r=1e3,s=1.5,o=6e4){this.ui=t,this.timerId=e,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,e-r);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(t,e,r,s,o,l,c,h){this.ui=t,this.Ho=r,this.Jo=s,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Pa(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(xt(e.toString()),xt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===e&&this.P_(r,s)},r=>{t(()=>{const s=new N(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(t,e){const r=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return V("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(V("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class td extends Zh{constructor(t,e,r,s,o,l){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,l),this.serializer=o}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=gh(this.serializer,t),r=function(o){if(!("targetChange"in o))return M.min();const l=o.targetChange;return l.targetIds&&l.targetIds.length?M.min():l.readTime?me(l.readTime):M.min()}(t);return this.listener.d_(e,r)}A_(t){const e={};e.database=fo(this.serializer),e.addTarget=function(o,l){let c;const h=l.target;if(c=Xr(h)?{documents:yh(o,h)}:{query:_h(o,h)._t},c.targetId=l.targetId,l.resumeToken.approximateByteSize()>0){c.resumeToken=fh(o,l.resumeToken);const f=ei(o,l.expectedCount);f!==null&&(c.expectedCount=f)}else if(l.snapshotVersion.compareTo(M.min())>0){c.readTime=dh(o,l.snapshotVersion.toTimestamp());const f=ei(o,l.expectedCount);f!==null&&(c.expectedCount=f)}return c}(this.serializer,t);const r=Eh(this.serializer,t);r&&(e.labels=r),this.a_(e)}R_(t){const e={};e.database=fo(this.serializer),e.removeTarget=t,this.a_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed extends class{}{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Mo(t,ni(e,r),s,o,l)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())})}Lo(t,e,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([l,c])=>this.connection.Lo(t,ni(e,r),s,l,c,o)).catch(l=>{throw l.name==="FirebaseError"?(l.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new N(P.UNKNOWN,l.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class nd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(xt(e),this.D_=!1):V("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(l=>{r.enqueueAndForget(async()=>{ln(this)&&(V("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=U(h);f.L_.add(4),await an(f),f.q_.set("Unknown"),f.L_.delete(4),await er(f)}(this))})}),this.q_=new nd(r,s)}}async function er(n){if(ln(n))for(const t of n.B_)await t(!0)}async function an(n){for(const t of n.B_)await t(!1)}function Va(n,t){const e=U(n);e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),Ci(e)?Si(e):Re(e).r_()&&bi(e,t))}function Ri(n,t){const e=U(n),r=Re(e);e.N_.delete(t),r.r_()&&ka(e,t),e.N_.size===0&&(r.r_()?r.o_():ln(e)&&e.q_.set("Unknown"))}function bi(n,t){if(n.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(M.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Re(n).A_(t)}function ka(n,t){n.Q_.xe(t),Re(n).R_(t)}function Si(n){n.Q_=new ah({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>n.N_.get(t)||null,tt:()=>n.datastore.serializer.databaseId}),Re(n).start(),n.q_.v_()}function Ci(n){return ln(n)&&!Re(n).n_()&&n.N_.size>0}function ln(n){return U(n).L_.size===0}function Da(n){n.Q_=void 0}async function id(n){n.q_.set("Online")}async function sd(n){n.N_.forEach((t,e)=>{bi(n,t)})}async function od(n,t){Da(n),Ci(n)?(n.q_.M_(t),Si(n)):n.q_.set("Unknown")}async function ad(n,t,e){if(n.q_.set("Online"),t instanceof va&&t.state===2&&t.cause)try{await async function(s,o){const l=o.cause;for(const c of o.targetIds)s.N_.has(c)&&(await s.remoteSyncer.rejectListen(c,l),s.N_.delete(c),s.Q_.removeTarget(c))}(n,t)}catch(r){V("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await yo(n,r)}else if(t instanceof Ln?n.Q_.Ke(t):t instanceof _a?n.Q_.He(t):n.Q_.We(t),!e.isEqual(M.min()))try{const r=await Sa(n.localStore);e.compareTo(r)>=0&&await function(o,l){const c=o.Q_.rt(l);return c.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const y=o.N_.get(f);y&&o.N_.set(f,y.withResumeToken(h.resumeToken,l))}}),c.targetMismatches.forEach((h,f)=>{const y=o.N_.get(h);if(!y)return;o.N_.set(h,y.withResumeToken(ct.EMPTY_BYTE_STRING,y.snapshotVersion)),ka(o,h);const A=new zt(y.target,h,f,y.sequenceNumber);bi(o,A)}),o.remoteSyncer.applyRemoteEvent(c)}(n,e)}catch(r){V("RemoteStore","Failed to raise snapshot:",r),await yo(n,r)}}async function yo(n,t,e){if(!sn(t))throw t;n.L_.add(1),await an(n),n.q_.set("Offline"),e||(e=()=>Sa(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V("RemoteStore","Retrying IndexedDB access"),await e(),n.L_.delete(1),await er(n)})}async function _o(n,t){const e=U(n);e.asyncQueue.verifyOperationInProgress(),V("RemoteStore","RemoteStore received new credentials");const r=ln(e);e.L_.add(3),await an(e),r&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await er(e)}async function ld(n,t){const e=U(n);t?(e.L_.delete(2),await er(e)):t||(e.L_.add(2),await an(e),e.q_.set("Unknown"))}function Re(n){return n.K_||(n.K_=function(e,r,s){const o=U(e);return o.w_(),new td(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:id.bind(null,n),Ro:sd.bind(null,n),mo:od.bind(null,n),d_:ad.bind(null,n)}),n.B_.push(async t=>{t?(n.K_.s_(),Ci(n)?Si(n):n.q_.set("Unknown")):(await n.K_.stop(),Da(n))})),n.K_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new ee,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const l=Date.now()+r,c=new Pi(t,e,l,s,o);return c.start(r),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Na(n,t){if(xt("AsyncQueue",`${t}: ${n}`),sn(n))return new N(P.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(t){this.comparator=t?(e,r)=>t(e,r)||L.comparator(e.key,r.key):(e,r)=>L.comparator(e.key,r.key),this.keyedMap=Ke(),this.sortedSet=new tt(this.comparator)}static emptySet(t){return new pe(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof pe)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new pe;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(){this.W_=new tt(L.comparator)}track(t){const e=t.doc.key,r=this.W_.get(e);r?t.type!==0&&r.type===3?this.W_=this.W_.insert(e,t):t.type===3&&r.type!==1?this.W_=this.W_.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.W_=this.W_.remove(e):t.type===1&&r.type===2?this.W_=this.W_.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):F():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,r)=>{t.push(r)}),t}}class Te{constructor(t,e,r,s,o,l,c,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=l,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const l=[];return e.forEach(c=>{l.push({type:0,doc:c})}),new Te(t,e,pe.emptySet(e),l,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Yn(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class cd{constructor(){this.queries=Eo(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,r){const s=U(e),o=s.queries;s.queries=Eo(),o.forEach((l,c)=>{for(const h of c.j_)h.onError(r)})})(this,new N(P.ABORTED,"Firestore shutting down"))}}function Eo(){return new Ae(n=>la(n),Yn)}async function hd(n,t){const e=U(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.H_()&&t.J_()&&(r=2):(o=new ud,r=t.J_()?0:1);try{switch(r){case 0:o.z_=await e.onListen(s,!0);break;case 1:o.z_=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(l){const c=Na(l,`Initialization of query '${ce(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,o),o.j_.push(t),t.Z_(e.onlineState),o.z_&&t.X_(o.z_)&&Vi(e)}async function dd(n,t){const e=U(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const l=o.j_.indexOf(t);l>=0&&(o.j_.splice(l,1),o.j_.length===0?s=t.J_()?0:1:!o.H_()&&t.J_()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function fd(n,t){const e=U(n);let r=!1;for(const s of t){const o=s.query,l=e.queries.get(o);if(l){for(const c of l.j_)c.X_(s)&&(r=!0);l.z_=s}}r&&Vi(e)}function md(n,t,e){const r=U(n),s=r.queries.get(t);if(s)for(const o of s.j_)o.onError(e);r.queries.delete(t)}function Vi(n){n.Y_.forEach(t=>{t.next()})}var ii,To;(To=ii||(ii={})).ea="default",To.Cache="cache";class pd{constructor(t,e,r){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Te(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache||!this.J_())return!0;const r=e!=="Offline";return(!this.options._a||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}oa(t){t=Te.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==ii.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(t){this.key=t}}class xa{constructor(t){this.key=t}}class gd{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=q(),this.mutatedKeys=q(),this.Aa=ua(t),this.Ra=new pe(this.Aa)}get Va(){return this.Ta}ma(t,e){const r=e?e.fa:new vo,s=e?e.Ra:this.Ra;let o=e?e.mutatedKeys:this.mutatedKeys,l=s,c=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((y,A)=>{const R=s.get(y),S=Xn(this.query,A)?A:null,k=!!R&&this.mutatedKeys.has(R.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let D=!1;R&&S?R.data.isEqual(S.data)?k!==O&&(r.track({type:3,doc:S}),D=!0):this.ga(R,S)||(r.track({type:2,doc:S}),D=!0,(h&&this.Aa(S,h)>0||f&&this.Aa(S,f)<0)&&(c=!0)):!R&&S?(r.track({type:0,doc:S}),D=!0):R&&!S&&(r.track({type:1,doc:R}),D=!0,(h||f)&&(c=!0)),D&&(S?(l=l.add(S),o=O?o.add(y):o.delete(y)):(l=l.delete(y),o=o.delete(y)))}),this.query.limit!==null)for(;l.size>this.query.limit;){const y=this.query.limitType==="F"?l.last():l.first();l=l.delete(y.key),o=o.delete(y.key),r.track({type:1,doc:y})}return{Ra:l,fa:r,ns:c,mutatedKeys:o}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const l=t.fa.G_();l.sort((y,A)=>function(S,k){const O=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F()}};return O(S)-O(k)}(y.type,A.type)||this.Aa(y.doc,A.doc)),this.pa(r),s=s!=null&&s;const c=e&&!s?this.ya():[],h=this.da.size===0&&this.current&&!s?1:0,f=h!==this.Ea;return this.Ea=h,l.length!==0||f?{snapshot:new Te(this.query,t.Ra,o,l,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new vo,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=q(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const e=[];return t.forEach(r=>{this.da.has(r)||e.push(new xa(r))}),this.da.forEach(r=>{t.has(r)||e.push(new La(r))}),e}ba(t){this.Ta=t.Ts,this.da=q();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return Te.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class yd{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class _d{constructor(t){this.key=t,this.va=!1}}class vd{constructor(t,e,r,s,o,l){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.Ca={},this.Fa=new Ae(c=>la(c),Yn),this.Ma=new Map,this.xa=new Set,this.Oa=new tt(L.comparator),this.Na=new Map,this.La=new Ii,this.Ba={},this.ka=new Map,this.qa=Ee.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Ed(n,t,e=!0){const r=Ua(n);let s;const o=r.Fa.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Da()):s=await Ma(r,t,e,!0),s}async function Td(n,t){const e=Ua(n);await Ma(e,t,!0,!1)}async function Ma(n,t,e,r){const s=await Hh(n.localStore,bt(t)),o=s.targetId,l=n.sharedClientState.addLocalQueryTarget(o,e);let c;return r&&(c=await Id(n,t,o,l==="current",s.resumeToken)),n.isPrimaryClient&&e&&Va(n.remoteStore,s),c}async function Id(n,t,e,r,s){n.Ka=(A,R,S)=>async function(O,D,J,G){let Q=D.view.ma(J);Q.ns&&(Q=await mo(O.localStore,D.query,!1).then(({documents:E})=>D.view.ma(E,Q)));const it=G&&G.targetChanges.get(D.targetId),Pt=G&&G.targetMismatches.get(D.targetId)!=null,ot=D.view.applyChanges(Q,O.isPrimaryClient,it,Pt);return wo(O,D.targetId,ot.wa),ot.snapshot}(n,A,R,S);const o=await mo(n.localStore,t,!0),l=new gd(t,o.Ts),c=l.ma(o.documents),h=on.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=l.applyChanges(c,n.isPrimaryClient,h);wo(n,e,f.wa);const y=new yd(t,e,l);return n.Fa.set(t,y),n.Ma.has(e)?n.Ma.get(e).push(t):n.Ma.set(e,[t]),f.snapshot}async function wd(n,t,e){const r=U(n),s=r.Fa.get(t),o=r.Ma.get(s.targetId);if(o.length>1)return r.Ma.set(s.targetId,o.filter(l=>!Yn(l,t))),void r.Fa.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ri(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&Ri(r.remoteStore,s.targetId),si(r,s.targetId)}).catch(hi)):(si(r,s.targetId),await ri(r.localStore,s.targetId,!0))}async function Ad(n,t){const e=U(n),r=e.Fa.get(t),s=e.Ma.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Ri(e.remoteStore,r.targetId))}async function Oa(n,t){const e=U(n);try{const r=await jh(e.localStore,t);t.targetChanges.forEach((s,o)=>{const l=e.Na.get(o);l&&(X(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?l.va=!0:s.modifiedDocuments.size>0?X(l.va):s.removedDocuments.size>0&&(X(l.va),l.va=!1))}),await Ba(e,r,t)}catch(r){await hi(r)}}function Io(n,t,e){const r=U(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Fa.forEach((o,l)=>{const c=l.view.Z_(t);c.snapshot&&s.push(c.snapshot)}),function(l,c){const h=U(l);h.onlineState=c;let f=!1;h.queries.forEach((y,A)=>{for(const R of A.j_)R.Z_(c)&&(f=!0)}),f&&Vi(h)}(r.eventManager,t),s.length&&r.Ca.d_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Rd(n,t,e){const r=U(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Na.get(t),o=s&&s.key;if(o){let l=new tt(L.comparator);l=l.insert(o,yt.newNoDocument(o,M.min()));const c=q().add(o),h=new tr(M.min(),new Map,new tt(j),l,c);await Oa(r,h),r.Oa=r.Oa.remove(o),r.Na.delete(t),ki(r)}else await ri(r.localStore,t,!1).then(()=>si(r,t,e)).catch(hi)}function si(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Ma.get(t))n.Fa.delete(r),e&&n.Ca.$a(r,e);n.Ma.delete(t),n.isPrimaryClient&&n.La.gr(t).forEach(r=>{n.La.containsKey(r)||Fa(n,r)})}function Fa(n,t){n.xa.delete(t.path.canonicalString());const e=n.Oa.get(t);e!==null&&(Ri(n.remoteStore,e),n.Oa=n.Oa.remove(t),n.Na.delete(e),ki(n))}function wo(n,t,e){for(const r of e)r instanceof La?(n.La.addReference(r.key,t),bd(n,r)):r instanceof xa?(V("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,t),n.La.containsKey(r.key)||Fa(n,r.key)):F()}function bd(n,t){const e=t.key,r=e.path.canonicalString();n.Oa.get(e)||n.xa.has(r)||(V("SyncEngine","New document in limbo: "+e),n.xa.add(r),ki(n))}function ki(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const t=n.xa.values().next().value;n.xa.delete(t);const e=new L(Y.fromString(t)),r=n.qa.next();n.Na.set(r,new _d(e)),n.Oa=n.Oa.insert(e,r),Va(n.remoteStore,new zt(bt(_i(e.path)),r,"TargetPurposeLimboResolution",di.oe))}}async function Ba(n,t,e){const r=U(n),s=[],o=[],l=[];r.Fa.isEmpty()||(r.Fa.forEach((c,h)=>{l.push(r.Ka(h,t,e).then(f=>{var y;if((f||e)&&r.isPrimaryClient){const A=f?!f.fromCache:(y=e==null?void 0:e.targetChanges.get(h.targetId))===null||y===void 0?void 0:y.current;r.sharedClientState.updateQueryState(h.targetId,A?"current":"not-current")}if(f){s.push(f);const A=Ai.Wi(h.targetId,f);o.push(A)}}))}),await Promise.all(l),r.Ca.d_(s),await async function(h,f){const y=U(h);try{await y.persistence.runTransaction("notifyLocalViewChanges","readwrite",A=>b.forEach(f,R=>b.forEach(R.$i,S=>y.persistence.referenceDelegate.addReference(A,R.targetId,S)).next(()=>b.forEach(R.Ui,S=>y.persistence.referenceDelegate.removeReference(A,R.targetId,S)))))}catch(A){if(!sn(A))throw A;V("LocalStore","Failed to update sequence numbers: "+A)}for(const A of f){const R=A.targetId;if(!A.fromCache){const S=y.os.get(R),k=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(k);y.os=y.os.insert(R,O)}}}(r.localStore,o))}async function Sd(n,t){const e=U(n);if(!e.currentUser.isEqual(t)){V("SyncEngine","User change. New user:",t.toKey());const r=await ba(e.localStore,t);e.currentUser=t,function(o,l){o.ka.forEach(c=>{c.forEach(h=>{h.reject(new N(P.CANCELLED,l))})}),o.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Ba(e,r.hs)}}function Cd(n,t){const e=U(n),r=e.Na.get(t);if(r&&r.va)return q().add(r.key);{let s=q();const o=e.Ma.get(t);if(!o)return s;for(const l of o){const c=e.Fa.get(l);s=s.unionWith(c.view.Va)}return s}}function Ua(n){const t=U(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Oa.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Cd.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Rd.bind(null,t),t.Ca.d_=fd.bind(null,t.eventManager),t.Ca.$a=md.bind(null,t.eventManager),t}class $n{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Ca(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return $h(this.persistence,new zh,t.initialUser,this.serializer)}Ga(t){return new Fh(wi.Zr,this.serializer)}Wa(t){return new Qh}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}$n.provider={build:()=>new $n};class oi{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Io(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Sd.bind(null,this.syncEngine),await ld(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new cd}()}createDatastore(t){const e=Ca(t.databaseInfo.databaseId),r=function(o){return new Jh(o)}(t.databaseInfo);return function(o,l,c,h){return new ed(o,l,c,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,l,c){return new rd(r,s,o,l,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Io(this.syncEngine,e,0),function(){return go.D()?new go:new Wh}())}createSyncEngine(t,e){return function(s,o,l,c,h,f,y){const A=new vd(s,o,l,c,h,f);return y&&(A.Qa=!0),A}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=U(s);V("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await an(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}oi.provider={build:()=>new oi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):xt("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=gt.UNAUTHENTICATED,this.clientId=ta.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async l=>{V("FirestoreClient","Received user=",l.uid),await this.authCredentialListener(l),this.user=l}),this.appCheckCredentials.start(r,l=>(V("FirestoreClient","Received new app check token=",l),this.appCheckCredentialListener(l,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ee;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Na(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Lr(n,t){n.asyncQueue.verifyOperationInProgress(),V("FirestoreClient","Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await ba(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Ao(n,t){n.asyncQueue.verifyOperationInProgress();const e=await kd(n);V("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>_o(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>_o(t.remoteStore,s)),n._onlineComponents=t}async function kd(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V("FirestoreClient","Using user provided OfflineComponentProvider");try{await Lr(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;ge("Error using user provided cache. Falling back to memory cache: "+e),await Lr(n,new $n)}}else V("FirestoreClient","Using default OfflineComponentProvider"),await Lr(n,new $n);return n._offlineComponents}async function Dd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V("FirestoreClient","Using user provided OnlineComponentProvider"),await Ao(n,n._uninitializedComponentsProvider._online)):(V("FirestoreClient","Using default OnlineComponentProvider"),await Ao(n,new oi))),n._onlineComponents}async function Nd(n){const t=await Dd(n),e=t.eventManager;return e.onListen=Ed.bind(null,t.syncEngine),e.onUnlisten=wd.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Td.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Ad.bind(null,t.syncEngine),e}function Ld(n,t,e={}){const r=new ee;return n.asyncQueue.enqueueAndForget(async()=>function(o,l,c,h,f){const y=new Pd({next:R=>{y.Za(),l.enqueueAndForget(()=>dd(o,A));const S=R.docs.has(c);!S&&R.fromCache?f.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&R.fromCache&&h&&h.source==="server"?f.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(R)},error:R=>f.reject(R)}),A=new pd(_i(c.path),y,{includeMetadataChanges:!0,_a:!0});return hd(o,A)}(await Nd(n),n.asyncQueue,t,e,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function za(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(n,t,e){if(!e)throw new N(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Md(n,t,e,r){if(t===!0&&r===!0)throw new N(P.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function bo(n){if(!L.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Od(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":F()}function ai(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Od(n);throw new N(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Md("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=za((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Di{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new So({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new So(t),t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new lc;switch(r.type){case"firstParty":return new dc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=Ro.get(e);r&&(V("ComponentProvider","Removing Datastore"),Ro.delete(e),r.terminate())}(this),Promise.resolve()}}function Fd(n,t,e,r={}){var s;const o=(n=ai(n,Di))._getSettings(),l=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==l&&ge("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:l,ssl:!1})),r.mockUserToken){let c,h;if(typeof r.mockUserToken=="string")c=r.mockUserToken,h=gt.MOCK_USER;else{c=Ul(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new gt(f)}n._authCredentials=new uc(new Zo(c,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Ni(this.firestore,t,this._query)}}class Nt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new rn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Nt(this.firestore,t,this._key)}}class rn extends Ni{constructor(t,e,r){super(t,e,_i(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Nt(this.firestore,null,new L(t))}withConverter(t){return new rn(this.firestore,t,this._path)}}function xr(n,t,...e){if(n=Wl(n),arguments.length===1&&(t=ta.newId()),xd("doc","path",t),n instanceof Di){const r=Y.fromString(t,...e);return bo(r),new Nt(n,null,new L(r))}{if(!(n instanceof Nt||n instanceof rn))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(t,...e));return bo(r),new Nt(n.firestore,n instanceof rn?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Pa(this,"async_queue_retry"),this.Vu=()=>{const r=Nr();r&&V("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=t;const e=Nr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=Nr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new ee;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!sn(t))throw t;V("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(r=>{this.Eu=r,this.du=!1;const s=function(l){let c=l.message||"";return l.stack&&(c=l.stack.includes(l.message)?l.stack:l.message+`
`+l.stack),c}(r);throw xt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=e,e}enqueueAfterDelay(t,e,r){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const s=Pi.createAndSchedule(this,t,e,r,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&F()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}class qa extends Di{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new Co,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Co(t),this._firestoreClient=void 0,await t}}}function Bd(n,t){const e=typeof n=="object"?n:Yu(),r=typeof n=="string"?n:"(default)",s=Hu(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Fl("firestore");o&&Fd(s,...o)}return s}function Ud(n){if(n._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||zd(n),n._firestoreClient}function zd(n){var t,e,r;const s=n._freezeSettings(),o=function(c,h,f,y){return new Rc(c,h,f,y.host,y.ssl,y.experimentalForceLongPolling,y.experimentalAutoDetectLongPolling,za(y.experimentalLongPollingOptions),y.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new Vd(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(t){this._byteString=t}static fromBase64String(t){try{return new jn(ct.fromBase64String(t))}catch(e){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new jn(ct.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Et(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return j(this._lat,t._lat)||j(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}}const jd=new RegExp("[~\\*/\\[\\]]");function Kd(n,t,e){if(t.search(jd)>=0)throw Po(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new $a(...t.split("."))._internalPath}catch{throw Po(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function Po(n,t,e,r,s){let o=`Function ${t}() called with invalid data`;o+=". ";let l="";return new N(P.INVALID_ARGUMENT,o+n+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Nt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Hd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Ka("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Hd extends ja{data(){return super.data()}}function Ka(n,t){return typeof t=="string"?Kd(n,t):t instanceof $a?t._internalPath:t._delegate._internalPath}class Gd{convertValue(t,e="none"){switch(se(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Z(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ie(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw F()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Qn(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,s;const o=(s=(r=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(l=>Z(l.doubleValue));return new $d(o)}convertGeoPoint(t){return new qd(Z(t.latitude),Z(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=mi(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(tn(t));default:return null}}convertTimestamp(t){const e=Ht(t);return new Tt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=Y.fromString(t);X(Ra(r));const s=new en(r.get(1),r.get(3)),o=new L(r.popFirst(5));return s.isEqual(e)||xt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ha extends ja{constructor(t,e,r,s,o,l){super(t,e,r,s,l),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Wd(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Ka("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}}class Wd extends Ha{data(t={}){return super.data(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mr(n){n=ai(n,Nt);const t=ai(n.firestore,qa);return Ld(Ud(t),n._key).then(e=>Xd(t,n,e))}class Yd extends Gd{constructor(t){super(),this.firestore=t}convertBytes(t){return new jn(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Nt(this.firestore,null,e)}}function Xd(n,t,e){const r=e.docs.get(t._key),s=new Yd(n);return new Ha(n,s,t._key,r,new Qd(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(s){we=s})(Wu),Fn(new Xe("firestore",(r,{instanceIdentifier:s,options:o})=>{const l=r.getProvider("app").getImmediate(),c=new qa(new cc(r.getProvider("auth-internal")),new mc(r.getProvider("app-check-internal")),function(f,y){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new en(f.options.projectId,y)}(l,s),l);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),fe(Hs,"4.7.3",t),fe(Hs,"4.7.3","esm2017")})();const Jd={apiKey:"",authDomain:"gkgumus.firebaseapp.com",projectId:"gkgumus",storageBucket:"gkgumus.appspot.com",messagingSenderId:"",appId:""},Zd=jo(Jd),Or=Bd(Zd);/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ga=(n,t,e=[])=>{const r=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(t).forEach(s=>{r.setAttribute(s,String(t[s]))}),e.length&&e.forEach(s=>{const o=Ga(...s);r.appendChild(o)}),r};var tf=([n,t,e])=>Ga(n,t,e);/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ef=n=>Array.from(n.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}),nf=n=>typeof n=="string"?n:!n||!n.class?"":n.class&&typeof n.class=="string"?n.class.split(" "):n.class&&Array.isArray(n.class)?n.class:"",rf=n=>n.flatMap(nf).map(e=>e.trim()).filter(Boolean).filter((e,r,s)=>s.indexOf(e)===r).join(" "),sf=n=>n.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,r)=>e.toUpperCase()+r.toLowerCase()),Vo=(n,{nameAttr:t,icons:e,attrs:r})=>{var k;const s=n.getAttribute(t);if(s==null)return;const o=sf(s),l=e[o];if(!l)return console.warn(`${n.outerHTML} icon name was not found in the provided icons object.`);const c=ef(n),[h,f,y]=l,A={...f,"data-lucide":s,...r,...c},R=rf(["lucide",`lucide-${s}`,c,r]);R&&Object.assign(A,{class:R});const S=tf([h,A,y]);return(k=n.parentNode)==null?void 0:k.replaceChild(S,n)};/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const of=["svg",At,[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=["svg",At,[["path",{d:"M20 6 9 17l-5-5"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=["svg",At,[["path",{d:"m6 9 6 6 6-6"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=["svg",At,[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=["svg",At,[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=["svg",At,[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=["svg",At,[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=["svg",At,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=["svg",At,[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=["svg",At,[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"}],["path",{d:"M3 6h18"}],["path",{d:"M16 10a4 4 0 0 1-8 0"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=["svg",At,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];/**
 * @license lucide v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=({icons:n={},nameAttr:t="data-lucide",attrs:e={}}={})=>{if(!Object.values(n).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const r=document.querySelectorAll(`[${t}]`);if(Array.from(r).forEach(s=>Vo(s,{nameAttr:t,icons:n,attrs:e})),t==="data-lucide"){const s=document.querySelectorAll("[icon-name]");s.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(s).forEach(o=>Vo(o,{nameAttr:"icon-name",icons:n,attrs:e})))}};let x={},jt=[],nt={},Kn="all";const ko={site_title:"Gümüş Kozmetik | Doğal Güzellik",site_description:"Doğadan ilham alan esanslar ve cilt dostu premium bakım formülleri.",primary_color:"#8B5CF6",secondary_color:"#EC4899",background_theme:"dark",hero_title:"Doğal Güzelliğin En Canlı Formülü",hero_subtitle:"Gümüş Kozmetik ile kendinizi şımartın. Doğadan ilham alan saf esanslar ve cildinizi tazeleyen yenileyici bakım formülleriyle zarafetinizi keşfedin.",hero_bg_image:"https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=1600",whatsapp_no:"905000000000",instagram:"gk_gumus",contact_email:"info@gumuskozmetik.com",contact_phone:"+90 (532) 123 45 67",address:"Merkez Mahallesi, Kozmetik Caddesi No:12, Şişli / İstanbul",maps_embed_url:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.349830588698!2d28.981881476566085!3d41.0613271161208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6fc82500001%3A0x640b080512684824!2zTmlsc8SxbiBLb3ptZXRpayBMdGQuIMWedGku!5e0!3m2!1str!2str!4v1715600000000!5m2!1str!2str"},Do={hakkimizda:{title:"Hikayemiz",content:`Gümüş Kozmetik olarak kurulduğumuz günden bu yana doğallık ve estetiği bir araya getirmeyi amaç ediniyoruz. Cildinize zarafet, yaşam alanlarınıza ise kalıcı ferahlık katan formüllerimizle, her üründe üst düzey kalite standartlarını benimsiyoruz.

Özel laboratuvarlarımızda dermatolojik olarak test edilen ürünlerimizle, doğanın şifalı özlerini saf haliyle sizlere ulaştırıyoruz. İnovasyonu ve sürdürülebilirliği temel alarak çevre dostu adımlarla büyüyoruz.`},biz_kimiz:{title:"Vizyonumuz & Misyonumuz",content:`Biz, doğallığın en saf halini teknolojiyle birleştirip kişisel bakımı lüks bir ritüele dönüştüren tutkulu bir ekibiz. Gümüş Kozmetik ailesi olarak misyonumuz, çevre dostu hammaddeler kullanarak cildinize zarar vermeyen, doğanın dengesini koruyan formüller geliştirmektir.

Vizyonumuz ise kozmetik ve kişisel bakım alanında kaliteli hizmet anlayışımızla yerli üretimin gücünü tüm dünyaya göstererek öncü bir küresel marka olmaktır.`},faaliyetlerimiz:{title:"Faaliyet Alanlarımız",content:`Gümüş Kozmetik, kişisel bakım, endüstriyel kozmetik ve ortam kokulandırma alanlarında geniş bir yelpazede hizmet sunmaktadır:

- **Özel Esans Tasarımları**: Markalara ve kişiye özel imza koku tasarımları oluşturuyoruz.
- **Premium Cilt Bakım Formülleri**: Doğal özler, hyaluronik asit ve vitamin kompleksleri ile yaşlanma karşıtı ve nemlendirici serumlar üretiyoruz.
- **Ev & Ofis Kokulandırma**: Bambu çubuklu oda kokuları ve özel sprey formülleriyle yaşam alanlarınızın atmosferini değiştiriyoruz.
- **Toptan & Perakende Satış**: Seçkin güzellik merkezleri, kuaför salonları ve butik mağazalar için tedarik çözümleri sunuyoruz.`},yardim:{title:"Sıkça Sorulan Sorular",content:`Soru: Siparişimi nasıl oluşturabilirim?
Cevap: Sitemizde beğendiğiniz ürünün altındaki 'WhatsApp ile Sipariş Ver' butonuna tıklayarak doğrudan destek ekibimizle görüşebilir ve siparişinizi hızlıca tamamlayabilirsiniz.
---
Soru: Ürünleriniz dermatolojik olarak test ediliyor mu?
Cevap: Evet, tüm kişisel bakım ve cilt bakım serilerimiz akredite laboratuvarlarda dermatolojik testlerden geçirilerek üretilir.
---
Soru: Kargo gönderim süresi nedir?
Cevap: Siparişleriniz onaylandıktan sonra 1-2 iş günü içerisinde kargoya teslim edilmekte ve takip numarası tarafınıza WhatsApp üzerinden iletilmektedir.
---
Soru: İade ve değişim politikanız nedir?
Cevap: Ambalajı açılmamış, kullanılmamış ve hasar görmemiş ürünlerimizi teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz.`}},No=[{id:"P001",category:"Parfüm",name:"Imperial Gold Oud",description:"Oryantal ve sıcak baharat esintileriyle harmanlanmış, gün boyu kalıcılık sunan imza parfümdür. Üst notalarda safran ve kakule, dip notalarda ise zengin amber ve oud esansı taşır.",imageUrl:"https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",price:"480 TL",order:1,location:"Öne Çıkanlar"},{id:"P002",category:"Cilt Bakımı",name:"Hyaluronic Intense Serum",description:"Hücre yenileyici Hyaluronik Asit ve B5 Vitamini içeren derinlemesine nemlendirici cilt serumu. İnce kırışıklık görünümünü azaltır, cilde parlak ve dolgun bir görünüm kazandırır.",imageUrl:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",price:"340 TL",order:2,location:"Öne Çıkanlar"},{id:"P003",category:"Oda Kokusu",name:"Lavender Fields Reed Diffuser",description:"Sakinleştirici Lavanta ve taze Okaliptüs aromaları içeren bambu çubuklu lüks oda kokusu. Evinizde ve ofisinizde 45 güne varan sürekli ve canlandırıcı bir ferahlık sağlar.",imageUrl:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",price:"260 TL",order:3,location:"Anasayfa"},{id:"P004",category:"Parfüm",name:"Violet Petals Blossom",description:"Zarif mor menekşeler, yasemin ve beyaz misk içeren hafif, pudralı taze çiçek kokusu. Bahar tazeliğini teninizde hissetmek isteyenler için ideal bir günlük koku seçeneğidir.",imageUrl:"https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",price:"450 TL",order:4,location:"Anasayfa"},{id:"P005",category:"Cilt Bakımı",name:"C-Vitamin Radiance Glow",description:"%10 Saf C Vitamini ve antioksidan yeşil çay özleriyle formüle edilmiş aydınlatıcı serum. Cilt tonunu eşitler, güneş lekelerinin görünümünü azaltır ve cildi canlandırır.",imageUrl:"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",price:"380 TL",order:5,location:"Anasayfa"}],_f=document.getElementById("page-loader"),Lo=document.getElementById("mobile-drawer"),Fr=document.getElementById("drawer-overlay"),Li=document.getElementById("product-modal"),vf=document.getElementById("modal-close"),Ef=document.getElementById("modal-overlay");document.addEventListener("DOMContentLoaded",async()=>{Hn(),Sf(),Pf(),bf();try{const n=await Mr(xr(Or,"settings","data"));n.exists()?x=n.data():(console.log("Firestore 'settings/data' not found, using premium fallback mock data."),x=ko);const t=await Mr(xr(Or,"notes","data"));t.exists()?nt=t.data():(console.log("Firestore 'notes/data' not found, using premium fallback mock notes."),nt=Do);const e=await Mr(xr(Or,"products","data"));e.exists()&&e.data().list?jt=e.data().list:(console.log("Firestore 'products/data' not found, using premium fallback products list."),jt=No)}catch(n){console.error("Firestore loading error, running in premium fallback preview mode:",n),x=ko,nt=Do,jt=No}Tf(),If(),wf(),Af(),Hn(),Vf(),setTimeout(()=>{_f.classList.add("fade-out")},400)});function Tf(){const n=document.documentElement;if(x.primary_color){n.style.setProperty("--color-primary",x.primary_color);const h=Mo(x.primary_color);h&&n.style.setProperty("--color-primary-rgb",`${h.r}, ${h.g}, ${h.b}`)}if(x.secondary_color){n.style.setProperty("--color-secondary",x.secondary_color);const h=Mo(x.secondary_color);h&&n.style.setProperty("--color-secondary-rgb",`${h.r}, ${h.g}, ${h.b}`)}if(x.background_theme&&x.background_theme.toLowerCase()==="light"?n.setAttribute("data-theme","light"):n.removeAttribute("data-theme"),x.site_title){document.title=x.site_title;const h=document.querySelector('meta[name="description"]');if(h&&x.site_description)h.setAttribute("content",x.site_description);else if(x.site_description){const f=document.createElement("meta");f.name="description",f.content=x.site_description,document.head.appendChild(f)}}const t=x.site_title?x.site_title.split("|")[0].trim():"Gümüş Kozmetik";document.getElementById("header-brand-name").innerText=t,document.getElementById("drawer-brand-name").innerText=t,document.getElementById("footer-brand-name").innerText=t,document.getElementById("copyright-brand").innerText=t,document.getElementById("copyright-year").innerText=new Date().getFullYear(),x.hero_title&&(document.getElementById("hero-title").innerText=x.hero_title),x.hero_subtitle&&(document.getElementById("hero-subtitle").innerText=x.hero_subtitle),x.hero_bg_image&&(document.getElementById("hero-bg").style.backgroundImage=`url('${x.hero_bg_image}')`);const e=document.getElementById("announcement-bar");x.announcement_text&&x.announcement_text.trim()!==""?(document.getElementById("announcement-text").innerText=x.announcement_text,e.classList.remove("hidden")):e.classList.add("hidden"),x.address&&(document.getElementById("contact-address-text").innerText=x.address),x.contact_phone&&(document.getElementById("contact-phone-text").innerText=x.contact_phone),x.contact_email&&(document.getElementById("contact-email-text").innerText=x.contact_email);const r=x.whatsapp_no?x.whatsapp_no.replace(/[^0-9]/g,""):"905000000000",s=encodeURIComponent("Merhaba, web sitenizden ulaşıyorum. Ürünleriniz ve hizmetleriniz hakkında detaylı bilgi almak istiyorum."),o=`https://wa.me/${r}?text=${s}`;document.getElementById("header-whatsapp-btn").href=o,document.getElementById("drawer-whatsapp-btn").href=o,document.getElementById("social-whatsapp").href=o;const l=x.instagram?x.instagram.replace("@","").trim():"gk_gumus";document.getElementById("social-instagram").href=`https://instagram.com/${l}`;const c=document.getElementById("map-iframe-container");x.maps_embed_url&&x.maps_embed_url.trim()!==""?c.innerHTML=`<iframe src="${x.maps_embed_url}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Gümüş Kozmetik Mağazası"></iframe>`:c.innerHTML=`
      <div class="map-placeholder">
        <div class="text-center" style="padding: 40px;">
          <i data-lucide="map-pin" style="width: 48px; height: 48px; color: var(--color-primary); margin-bottom: 16px;"></i>
          <h3>Mağaza Lokasyonumuz</h3>
          <p style="color: var(--color-text-muted); margin-top: 8px;">${x.address||"İstanbul, Türkiye"}</p>
        </div>
      </div>
    `}function If(){if(nt.hakkimizda&&(document.getElementById("tab-hakkimizda-btn").innerText=nt.hakkimizda.title||"Hakkımızda",document.getElementById("pane-hakkimizda").innerHTML=xn(nt.hakkimizda.content)),nt.biz_kimiz&&(document.getElementById("tab-bizkimiz-btn").innerText=nt.biz_kimiz.title||"Biz Kimiz?",document.getElementById("pane-bizkimiz").innerHTML=xn(nt.biz_kimiz.content)),nt.faaliyetlerimiz&&(document.getElementById("activities-title").innerText=nt.faaliyetlerimiz.title||"Faaliyet Alanlarımız",document.getElementById("activities-content").innerHTML=xn(nt.faaliyetlerimiz.content)),nt.referanslarimiz){const n=document.getElementById("references-list");n.innerHTML="";const t=nt.referanslarimiz.content.split(/[,\n]+/).map(e=>e.trim()).filter(e=>e!=="");t.length>0?t.forEach(e=>{const r=document.createElement("div");r.className="reference-item",r.innerText=e,n.appendChild(r)}):document.getElementById("referanslar-container").classList.add("hidden")}}function wf(){const n=document.getElementById("faq-accordion");if(n.innerHTML="",!nt.yardim||!nt.yardim.content){n.innerHTML='<p class="text-center" style="color: var(--color-text-muted);">Yardım metni bulunmamaktadır.</p>';return}document.getElementById("help-title").innerText=nt.yardim.title||"Sıkça Sorulan Sorular";const t=nt.yardim.content.split(/---+/);let e=!1;t.forEach((r,s)=>{const o=r.trim().split(`
`);let l="",c="";if(o.forEach(h=>{const f=h.match(/^(Soru:|Q:|S:)\s*(.*)$/i),y=h.match(/^(Cevap:|A:|C:)\s*(.*)$/i);f?l=f[2].trim():y?c=y[2].trim():l&&!c?l+=" "+h.trim():l&&c&&(c+="<br>"+h.trim())}),l&&c){e=!0;const h=document.createElement("div");h.className="faq-item reveal",h.innerHTML=`
        <button class="faq-header" aria-expanded="false">
          <span>${l}</span>
          <i data-lucide="chevron-down" class="faq-icon-arrow"></i>
        </button>
        <div class="faq-body">
          <div class="faq-content">
            <p>${c}</p>
          </div>
        </div>
      `;const f=h.querySelector(".faq-header");f.addEventListener("click",()=>{const y=h.classList.contains("open");document.querySelectorAll(".faq-item").forEach(A=>{A.classList.remove("open"),A.querySelector(".faq-header").setAttribute("aria-expanded","false")}),y||(h.classList.add("open"),f.setAttribute("aria-expanded","true"))}),n.appendChild(h)}}),e||(n.innerHTML=`
      <div class="activities-content-box reveal" style="padding: 30px;">
        ${xn(nt.yardim.content)}
      </div>
    `)}function Af(){const n=document.getElementById("product-categories"),t=document.getElementById("products-grid"),e=document.getElementById("products-empty");if(t.innerHTML="",!jt||jt.length===0){e.classList.remove("hidden");return}e.classList.add("hidden");const r=["all"];jt.forEach(s=>{s.category&&!r.includes(s.category)&&r.push(s.category)}),n.innerHTML="",r.forEach(s=>{const o=document.createElement("button");o.className=`category-btn ${Kn===s?"active":""}`,o.setAttribute("data-category",s),o.innerText=s==="all"?"Tüm Ürünler":s,o.addEventListener("click",()=>{document.querySelectorAll(".category-btn").forEach(l=>l.classList.remove("active")),o.classList.add("active"),Kn=s,xo()}),n.appendChild(o)}),xo()}function xo(){const n=document.getElementById("products-grid"),t=document.getElementById("products-empty");n.innerHTML="";const e=Kn==="all"?jt:jt.filter(r=>r.category===Kn);if(e.length===0){t.classList.remove("hidden");return}t.classList.add("hidden"),e.forEach(r=>{const s=document.createElement("div");s.className="product-card reveal";const o=r.location&&r.location!=="Anasayfa"&&r.location!=="Normal"?`<span class="product-location-badge">${r.location}</span>`:"";s.innerHTML=`
      <div class="product-image-wrapper">
        ${o}
        <img src="${r.imageUrl||"https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400"}" alt="${r.name}" class="product-img" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${r.category}</span>
        <h3 class="product-name">${r.name}</h3>
        <p class="product-desc">${r.description||"Bu ürün için açıklama bulunmamaktadır."}</p>
        <div class="product-footer">
          <span class="product-price">${r.price||"Fiyat Alın"}</span>
          <button class="btn-view" data-id="${r.id}">
            <span>İncele</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    `,s.querySelector(".btn-view").addEventListener("click",()=>{Rf(r)}),n.appendChild(s)}),Hn()}function Rf(n){document.getElementById("modal-product-img").src=n.imageUrl||"https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",document.getElementById("modal-product-img").alt=n.name,document.getElementById("modal-product-category").innerText=n.category,document.getElementById("modal-product-name").innerText=n.name,document.getElementById("modal-product-desc").innerText=n.description||"Bu ürün için özel bir açıklama bulunmamaktadır. WhatsApp hattımız üzerinden detaylı bilgi alabilirsiniz.",document.getElementById("modal-product-price").innerText=n.price||"Fiyat Sorun";const t=x.whatsapp_no?x.whatsapp_no.replace(/[^0-9]/g,""):"905000000000",e=encodeURIComponent(`Merhaba Gümüş Kozmetik, "${n.name}" (${n.category}) ürününüzü inceledim ve sipariş vermek / detaylı bilgi almak istiyorum. Teşekkürler.`);document.getElementById("modal-order-btn").href=`https://wa.me/${t}?text=${e}`,Li.classList.add("open"),document.body.style.overflow="hidden",Hn()}function Br(){Li.classList.remove("open"),document.body.style.overflow=""}function bf(){vf.addEventListener("click",Br),Ef.addEventListener("click",Br),document.addEventListener("keydown",n=>{n.key==="Escape"&&Li.classList.contains("open")&&Br()})}function Sf(){const n=document.getElementById("menu-toggle"),t=document.getElementById("menu-close"),e=document.getElementById("main-header");window.addEventListener("scroll",()=>{window.scrollY>50?e.classList.add("scrolled"):e.classList.remove("scrolled"),Cf()}),n.addEventListener("click",()=>{Lo.classList.add("open"),Fr.classList.add("open"),document.body.style.overflow="hidden"});const r=()=>{Lo.classList.remove("open"),Fr.classList.remove("open"),document.body.style.overflow=""};t.addEventListener("click",r),Fr.addEventListener("click",r),document.querySelectorAll(".drawer-link").forEach(s=>{s.addEventListener("click",()=>{r()})})}function Cf(){const n=document.querySelectorAll("section[id], header"),t=window.scrollY+100;n.forEach(e=>{if(e.id==="main-header")return;const r=e.offsetTop,s=e.offsetHeight,o=e.id;t>=r&&t<r+s&&(document.querySelectorAll(".nav-link").forEach(l=>{l.classList.remove("active"),l.getAttribute("href")===`#${o}`&&l.classList.add("active")}),document.querySelectorAll(".drawer-link").forEach(l=>{l.classList.remove("active"),l.getAttribute("href")===`#${o}`&&l.classList.add("active")}))})}function Pf(){const n=document.getElementById("tab-hakkimizda-btn"),t=document.getElementById("tab-bizkimiz-btn"),e=document.getElementById("pane-hakkimizda"),r=document.getElementById("pane-bizkimiz");n.addEventListener("click",()=>{t.classList.remove("active"),n.classList.add("active"),r.classList.remove("active"),e.classList.add("active")}),t.addEventListener("click",()=>{n.classList.remove("active"),t.classList.add("active"),e.classList.remove("active"),r.classList.add("active")})}function xn(n){if(!n)return"";let t=String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/^### (.*$)/gim,"<h4>$1</h4>"),t=t.replace(/^## (.*$)/gim,"<h3>$1</h3>"),t=t.replace(/^# (.*$)/gim,"<h2>$1</h2>"),t=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/\*(.*?)\*/g,"<em>$1</em>"),t=t.replace(/^\s*-\s+(.*$)/gim,"<li>$1</li>"),t.split(/\n\n+/).map(s=>{let o=s.trim();return o.startsWith("<li>")?`<ul>${o}</ul>`:o.startsWith("<h4>")||o.startsWith("<h3>")||o.startsWith("<h2>")?o:o.trim()!==""?`<p>${o.replace(/\n/g,"<br>")}</p>`:""}).join(`
`)}function Vf(){const n={root:null,rootMargin:"0px",threshold:.1},t=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&(r.target.classList.add("active"),t.unobserve(r.target))})},n);document.querySelectorAll(".reveal").forEach(e=>{t.observe(e)})}function Hn(){yf({icons:{Phone:mf,Mail:hf,MapPin:df,Instagram:cf,Menu:ff,X:gf,ArrowRight:of,Check:af,ChevronDown:lf,ShoppingBag:pf,ExternalLink:uf}})}function Mo(n){const t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,e=n.replace(t,(s,o,l,c)=>o+o+l+l+c+c),r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}
