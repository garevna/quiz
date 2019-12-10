(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{113:function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */!function(){"use strict";var ERROR="input is invalid type",WINDOW="object"==typeof window,root=WINDOW?window:{};root.JS_SHA256_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!root.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,AMD=__webpack_require__(114),ARRAY_BUFFER=!root.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[];!root.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t,e){return function(s){return new Sha256(e,!0).update(s)[t]()}},createMethod=function(t){var e=createOutputMethod("hex",t);NODE_JS&&(e=nodeWrap(e,t)),e.create=function(){return new Sha256(t)},e.update=function(t){return e.create().update(t)};for(var s=0;s<OUTPUT_TYPES.length;++s){var r=OUTPUT_TYPES[s];e[r]=createOutputMethod(r,t)}return e},nodeWrap=function(method,is224){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),algorithm=is224?"sha224":"sha256",nodeMethod=function(t){if("string"==typeof t)return crypto.createHash(algorithm).update(t,"utf8").digest("hex");if(null==t)throw new Error(ERROR);return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash(algorithm).update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod},createHmacOutputMethod=function(t,e){return function(s,r){return new HmacSha256(s,e,!0).update(r)[t]()}},createHmacMethod=function(t){var e=createHmacOutputMethod("hex",t);e.create=function(e){return new HmacSha256(e,t)},e.update=function(t,s){return e.create(t).update(s)};for(var s=0;s<OUTPUT_TYPES.length;++s){var r=OUTPUT_TYPES[s];e[r]=createHmacOutputMethod(r,t)}return e};function Sha256(t,e){e?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function HmacSha256(t,e,s){var r,n=typeof t;if("string"===n){var i,a=[],o=t.length,h=0;for(r=0;r<o;++r)(i=t.charCodeAt(r))<128?a[h++]=i:i<2048?(a[h++]=192|i>>6,a[h++]=128|63&i):i<55296||i>=57344?(a[h++]=224|i>>12,a[h++]=128|i>>6&63,a[h++]=128|63&i):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++r)),a[h++]=240|i>>18,a[h++]=128|i>>12&63,a[h++]=128|i>>6&63,a[h++]=128|63&i);t=a}else{if("object"!==n)throw new Error(ERROR);if(null===t)throw new Error(ERROR);if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw new Error(ERROR)}t.length>64&&(t=new Sha256(e,!0).update(t).array());var c=[],l=[];for(r=0;r<64;++r){var p=t[r]||0;c[r]=92^p,l[r]=54^p}Sha256.call(this,e,s),this.update(l),this.oKeyPad=c,this.inner=!0,this.sharedMemory=s}Sha256.prototype.update=function(t){if(!this.finalized){var e,s=typeof t;if("string"!==s){if("object"!==s)throw new Error(ERROR);if(null===t)throw new Error(ERROR);if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw new Error(ERROR);e=!0}for(var r,n,i=0,a=t.length,o=this.blocks;i<a;){if(this.hashed&&(this.hashed=!1,o[0]=this.block,o[16]=o[1]=o[2]=o[3]=o[4]=o[5]=o[6]=o[7]=o[8]=o[9]=o[10]=o[11]=o[12]=o[13]=o[14]=o[15]=0),e)for(n=this.start;i<a&&n<64;++i)o[n>>2]|=t[i]<<SHIFT[3&n++];else for(n=this.start;i<a&&n<64;++i)(r=t.charCodeAt(i))<128?o[n>>2]|=r<<SHIFT[3&n++]:r<2048?(o[n>>2]|=(192|r>>6)<<SHIFT[3&n++],o[n>>2]|=(128|63&r)<<SHIFT[3&n++]):r<55296||r>=57344?(o[n>>2]|=(224|r>>12)<<SHIFT[3&n++],o[n>>2]|=(128|r>>6&63)<<SHIFT[3&n++],o[n>>2]|=(128|63&r)<<SHIFT[3&n++]):(r=65536+((1023&r)<<10|1023&t.charCodeAt(++i)),o[n>>2]|=(240|r>>18)<<SHIFT[3&n++],o[n>>2]|=(128|r>>12&63)<<SHIFT[3&n++],o[n>>2]|=(128|r>>6&63)<<SHIFT[3&n++],o[n>>2]|=(128|63&r)<<SHIFT[3&n++]);this.lastByteIndex=n,this.bytes+=n-this.start,n>=64?(this.block=o[16],this.start=n-64,this.hash(),this.hashed=!0):this.start=n}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha256.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[16]=this.block,t[e>>2]|=EXTRA[3&e],this.block=t[16],e>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},Sha256.prototype.hash=function(){var t,e,s,r,n,i,a,o,h,c=this.h0,l=this.h1,p=this.h2,u=this.h3,d=this.h4,f=this.h5,H=this.h6,v=this.h7,_=this.blocks;for(t=16;t<64;++t)e=((n=_[t-15])>>>7|n<<25)^(n>>>18|n<<14)^n>>>3,s=((n=_[t-2])>>>17|n<<15)^(n>>>19|n<<13)^n>>>10,_[t]=_[t-16]+e+_[t-7]+s<<0;for(h=l&p,t=0;t<64;t+=4)this.first?(this.is224?(i=300032,v=(n=_[0]-1413257819)-150054599<<0,u=n+24177077<<0):(i=704751109,v=(n=_[0]-210244248)-1521486534<<0,u=n+143694565<<0),this.first=!1):(e=(c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),r=(i=c&l)^c&p^h,v=u+(n=v+(s=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&f^~d&H)+K[t]+_[t])<<0,u=n+(e+r)<<0),e=(u>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),r=(a=u&c)^u&l^i,H=p+(n=H+(s=(v>>>6|v<<26)^(v>>>11|v<<21)^(v>>>25|v<<7))+(v&d^~v&f)+K[t+1]+_[t+1])<<0,e=((p=n+(e+r)<<0)>>>2|p<<30)^(p>>>13|p<<19)^(p>>>22|p<<10),r=(o=p&u)^p&c^a,f=l+(n=f+(s=(H>>>6|H<<26)^(H>>>11|H<<21)^(H>>>25|H<<7))+(H&v^~H&d)+K[t+2]+_[t+2])<<0,e=((l=n+(e+r)<<0)>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10),r=(h=l&p)^l&u^o,d=c+(n=d+(s=(f>>>6|f<<26)^(f>>>11|f<<21)^(f>>>25|f<<7))+(f&H^~f&v)+K[t+3]+_[t+3])<<0,c=n+(e+r)<<0;this.h0=this.h0+c<<0,this.h1=this.h1+l<<0,this.h2=this.h2+p<<0,this.h3=this.h3+u<<0,this.h4=this.h4+d<<0,this.h5=this.h5+f<<0,this.h6=this.h6+H<<0,this.h7=this.h7+v<<0},Sha256.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,s=this.h2,r=this.h3,n=this.h4,i=this.h5,a=this.h6,o=this.h7,h=HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[s>>28&15]+HEX_CHARS[s>>24&15]+HEX_CHARS[s>>20&15]+HEX_CHARS[s>>16&15]+HEX_CHARS[s>>12&15]+HEX_CHARS[s>>8&15]+HEX_CHARS[s>>4&15]+HEX_CHARS[15&s]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[n>>28&15]+HEX_CHARS[n>>24&15]+HEX_CHARS[n>>20&15]+HEX_CHARS[n>>16&15]+HEX_CHARS[n>>12&15]+HEX_CHARS[n>>8&15]+HEX_CHARS[n>>4&15]+HEX_CHARS[15&n]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[a>>28&15]+HEX_CHARS[a>>24&15]+HEX_CHARS[a>>20&15]+HEX_CHARS[a>>16&15]+HEX_CHARS[a>>12&15]+HEX_CHARS[a>>8&15]+HEX_CHARS[a>>4&15]+HEX_CHARS[15&a];return this.is224||(h+=HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[15&o]),h},Sha256.prototype.toString=Sha256.prototype.hex,Sha256.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,s=this.h2,r=this.h3,n=this.h4,i=this.h5,a=this.h6,o=this.h7,h=[t>>24&255,t>>16&255,t>>8&255,255&t,e>>24&255,e>>16&255,e>>8&255,255&e,s>>24&255,s>>16&255,s>>8&255,255&s,r>>24&255,r>>16&255,r>>8&255,255&r,n>>24&255,n>>16&255,n>>8&255,255&n,i>>24&255,i>>16&255,i>>8&255,255&i,a>>24&255,a>>16&255,a>>8&255,255&a];return this.is224||h.push(o>>24&255,o>>16&255,o>>8&255,255&o),h},Sha256.prototype.array=Sha256.prototype.digest,Sha256.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),e=new DataView(t);return e.setUint32(0,this.h0),e.setUint32(4,this.h1),e.setUint32(8,this.h2),e.setUint32(12,this.h3),e.setUint32(16,this.h4),e.setUint32(20,this.h5),e.setUint32(24,this.h6),this.is224||e.setUint32(28,this.h7),t},HmacSha256.prototype=new Sha256,HmacSha256.prototype.finalize=function(){if(Sha256.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();Sha256.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),Sha256.prototype.finalize.call(this)}};var exports=createMethod();exports.sha256=exports,exports.sha224=createMethod(!0),exports.sha256.hmac=createHmacMethod(),exports.sha224.hmac=createHmacMethod(!0),COMMON_JS?module.exports=exports:(root.sha256=exports.sha256,root.sha224=exports.sha224,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}()}).call(this,__webpack_require__(7),__webpack_require__(4))},114:function(t,e){(function(e){t.exports=e}).call(this,{})},134:function(t,e,s){"use strict";s.r(e);var r=s(113);const n={data:()=>({cardClass:"mb-8 py-5 px-12 dark-card",cardHeight:150,stepperColor:"#590",logins:null,newUser:!1,password:"",showPassText:!1,color:"#09b",user:{name:"",lastName:"",password:"",passHash:"",avatar:null},registered:!1,stage:0,backIcon:"chevron_left",backIconColor:"#09b",theFile:null,avatar:"https://www.themelister.com/templates/nabster/dleimages/noavatar.png"}),computed:{validLogin:function(){return this.user&&this.user.login&&0===this.logins.filter(t=>-1!==t.indexOf(this.user.login)).length},loginHint:function(){return this.user.login?this.validLogin?"Valid":`User ${this.user.login} already exists`:""},loginColor:function(){return this.validLogin?"#09b":"#fa0"},passwordLabel:function(){return`Password for ${this.user.login}`},passColor:function(){return this.user?this.user.password.length<8?"#f00":this.user.password.match(/[A-Z]/g)?this.user.password.match(/[a-z]/g)?this.user.password.match(/[0-9]/g)?"#09b":"#d90":"#e70":"#f50":"#f00"},passHint:function(){return this.user?this.user.password.length<8?"There must be at least 8 characters":this.user.password.match(/[A-Z]/g)?this.user.password.match(/[a-z]/g)?this.user.password.match(/[0-9]/g)?"correct password":"There must be at least one digit":"There must be at least one character in lower case":"There must be at least one character in upper case":""},duplicatePassColor:function(){return this.user.password!==this.password?"#f50":"#09b"},duplicatePassHint:function(){return this.user.password!==this.password?"incorrect":"correct"},avatarHint:function(){return this.theFile?-1===this.theFile.type.indexOf("image")?"Selected file is not image":this.theFile.size<3e5?""+this.theFile.size:"Avatar size must be less then 300Kb":"Upload file"},validFile:function(){return!!this.theFile&&-1!==this.theFile.type.indexOf("image")&&this.theFile.size<3e5},avatarColor:function(){return this.validFile?"#09b":"#f50"}},methods:{async getLogins(){this.logins=Object.keys(await(await fetch("https://garevna-js-quiz.glitch.me/forms/all")).json())},showPicture(){this.validFile&&(this.avatar=URL.createObjectURL(this.theFile))},exit(){this.$root.$emit("sign-up-finished")},saveUserData(){this.user.passHash=Object(r.sha256)(this.user.password),delete this.user.password;let t=this.user.login;delete this.user.login,this.user.registered=(new Date).toLocaleDateString(),this.user.results=JSON.stringify({});let e=new FormData;for(let t in this.user)e.set(t,this.user[t]);e.set("avatar",this.theFile),fetch(`https://garevna-js-quiz.glitch.me/form/${t}`,{method:"POST",body:e}).then(e=>{e.ok&&(document.cookie=`user=${t}`,document.cookie=`pass=${this.user.passHash}`,this.$root.$store.commit("setUser",{login:t,fname:this.user.lastName,name:this.user.name,registered:(new Date).toLocaleDateString(),photoURL:URL.createObjectURL(this.theFile),passHash:this.user.passHash}))})}},created(){this.getLogins().then(()=>this.stage=1)},template:'\n  <v-container fluid fill-height>\n   <v-stepper v-model="stage" dark\n              class="dark-card mx-auto"\n              v-if="user">\n    <v-stepper-header dark>\n          <v-stepper-step :complete="validLogin"\n                          step="1"\n                          :color="stepperColor">\n          </v-stepper-step>\n\n      <v-divider></v-divider>\n\n          <v-stepper-step :complete="stage > 2"\n                          step="2"\n                          :color="stepperColor">\n          </v-stepper-step>\n\n      <v-divider></v-divider>\n\n          <v-stepper-step :complete="stage > 3"\n                          step="3"\n                          :color="stepperColor">\n          </v-stepper-step>\n\n\n      <v-divider></v-divider>\n\n          <v-stepper-step :complete="stage > 4"\n                          step="4"\n                          :color="stepperColor">\n          </v-stepper-step>\n\n      <v-divider></v-divider>\n\n          <v-stepper-step :complete="stage > 5"\n                          step="5"\n                          :color="stepperColor">\n          </v-stepper-step>\n\n      <v-divider></v-divider>\n\n          <v-stepper-step :complete="stage > 6"\n                          step="6"\n                          :color="stepperColor">\n          </v-stepper-step>\n\n    </v-stepper-header>\n\n    <v-stepper-items class="transparent" dark>\n      <v-stepper-content step="1" v-if="logins">\n        <v-card :class="cardClass"\n                :height="cardHeight">\n          <v-text-field v-model="user.login"\n                        :hint="loginHint"\n                        label="User login"\n                        :color="loginColor">\n          </v-text-field>\n        </v-card>\n\n        <v-btn class="transparent"\n               v-if="validLogin"\n               @click="stage = 2">\n          Continue\n        </v-btn>\n\n        <v-btn transparent text @click="exit">Cancel</v-btn>\n      </v-stepper-content>\n\n      <v-stepper-content step="2">\n        <v-card :class="cardClass"\n                :height="cardHeight">\n          <v-text-field v-model="user.name"\n                        autofocus\n                        outlined\n                        label="name"\n                        hint="Your name"\n                        color="#09b">\n        </v-text-field>\n        </v-card>\n\n        <v-btn class="transparent"\n               v-if="user.name.length > 1"\n               @click="stage = 3">\n          Continue\n        </v-btn>\n\n        <v-btn transparent text @click="exit">Cancel</v-btn>\n      </v-stepper-content>\n\n      <v-stepper-content step="3">\n        <v-card :class="cardClass"\n                :height="cardHeight">\n          <v-text-field v-model="user.lastName"\n                        autofocus\n                        outlined\n                        hint="last name"\n                        label="Your family name"\n                        color="#09b">\n          </v-text-field>\n        </v-card>\n\n        <v-btn class="transparent"\n               v-if="user.lastName.length > 2"\n               @click="stage = 4">\n          Continue\n        </v-btn>\n\n        <v-btn transparent text @click="exit">Cancel</v-btn>\n      </v-stepper-content>\n\n      <v-stepper-content step="4">\n        <v-card :class="cardClass"\n                :height="cardHeight">\n          <v-text-field v-model="user.password"\n                        autofocus\n                        :hint="passHint"\n                        :label="passwordLabel"\n                        :append-icon="showPassText ? \'mdi-eye\' : \'mdi-eye-off\'"\n                        :type="showPassText ? \'text\' : \'password\'"\n                        @click:append="showPassText = !showPassText"\n                        :color="passColor">\n          </v-text-field>\n        </v-card>\n\n        <v-btn class="transparent"\n               v-if="passHint === \'correct password\'"\n               @click="stage = 5">\n          Continue\n        </v-btn>\n\n        <v-btn transparent text @click="exit">Cancel</v-btn>\n      </v-stepper-content>\n\n      <v-stepper-content step="5">\n        <v-card :class="cardClass"\n                :height="cardHeight">\n          <v-text-field v-model="password"\n                        autofocus\n                        :hint="duplicatePassHint"\n                        :label="passwordLabel"\n                        :append-icon="showPassText ? \'mdi-eye\' : \'mdi-eye-off\'"\n                        :type="showPassText ? \'text\' : \'password\'"\n                        @click:append="showPassText = !showPassText"\n                        :color="duplicatePassColor">\n          </v-text-field>\n        </v-card>\n\n        <v-btn class="transparent"\n               v-if="duplicatePassHint === \'correct\'"\n               @click="stage = 6">\n          Continue\n        </v-btn>\n\n        <v-btn transparent text @click="exit">Cancel</v-btn>\n      </v-stepper-content>\n\n      <v-stepper-content step="6">\n        <v-card :class="cardClass"\n                :height="cardHeight">\n          <v-avatar size="58">\n              <v-img :src="avatar"></v-img>\n          </v-avatar>\n          <v-file-input label="Avatar" dense\n                        class="transparent"\n                        v-model="theFile"\n                        :hint="avatarHint"\n                        :color="avatarColor"\n                        @change="showPicture"\n                        prepend-icon="create"\n                        show-size\n                        color="#09b">\n\n          </v-file-input>\n        </v-card>\n\n        <v-btn class="transparent"\n               v-if="duplicatePassHint === \'correct\'"\n               @click="saveUserData">\n          Submit\n        </v-btn>\n\n        <v-btn transparent text @click="exit">Cancel</v-btn>\n      </v-stepper-content>\n\n    </v-stepper-items>\n  </v-stepper>\n</v-container>\n  '};e.default=n}}]);