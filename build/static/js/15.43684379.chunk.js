(this.webpackJsonpmeka_lads=this.webpackJsonpmeka_lads||[]).push([[15],{1303:function(t,r,e){"use strict";function n(t,r){return(n=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}e.r(r),e.d(r,"TorusConnector",(function(){return o}));var o=function(t){var r,o;function i(r){var e,n=r.chainId,o=r.initOptions,i=void 0===o?{}:o,u=r.constructorOptions,c=void 0===u?{}:u,s=r.loginOptions,a=void 0===s?{}:s;return(e=t.call(this,{supportedChainIds:[n]})||this).chainId=n,e.initOptions=i,e.constructorOptions=c,e.loginOptions=a,e}o=t,(r=i).prototype=Object.create(o.prototype),r.prototype.constructor=r,n(r,o);var u=i.prototype;return u.activate=function(){try{var t=this,r=function(){return Promise.resolve(t.torus.login(t.loginOptions).then((function(t){return t[0]}))).then((function(r){return{provider:t.torus.provider,account:r}}))},n=function(){if(!t.torus)return Promise.resolve(e.e(8).then(e.t.bind(null,1140,7)).then((function(t){var r;return null!=(r=null==t?void 0:t.default)?r:t}))).then((function(r){return t.torus=new r(t.constructorOptions),Promise.resolve(t.torus.init(t.initOptions)).then((function(){}))}))}();return Promise.resolve(n&&n.then?n.then(r):r())}catch(o){return Promise.reject(o)}},u.getProvider=function(){try{return Promise.resolve(this.torus.provider)}catch(t){return Promise.reject(t)}},u.getChainId=function(){try{return Promise.resolve(this.chainId)}catch(t){return Promise.reject(t)}},u.getAccount=function(){try{return Promise.resolve(this.torus.ethereum.send("eth_accounts").then((function(t){return t[0]})))}catch(t){return Promise.reject(t)}},u.deactivate=function(){return Promise.resolve()},u.close=function(){try{var t=this;return Promise.resolve(t.torus.cleanUp()).then((function(){t.emitDeactivate()}))}catch(r){return Promise.reject(r)}},i}(e(613).a)},613:function(t,r,e){"use strict";e.d(r,"a",(function(){return i}));var n=e(35),o=e(51);var i=function(t){var r,e;function n(r){var e,n=(void 0===r?{}:r).supportedChainIds;return(e=t.call(this)||this).supportedChainIds=n,e}e=t,(r=n).prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e;var i=n.prototype;return i.emitUpdate=function(t){this.emit(o.a.Update,t)},i.emitError=function(t){this.emit(o.a.Error,t)},i.emitDeactivate=function(){this.emit(o.a.Deactivate)},n}(n.EventEmitter)}}]);
//# sourceMappingURL=15.43684379.chunk.js.map