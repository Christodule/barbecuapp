var e,n;e=this,n=function(e){"use strict";var n=function(){return(n=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var a in n=arguments[t])Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);return e}).apply(this,arguments)};function t(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(t[r[a]]=e[r[a]])}return t}function r(e){var n="function"==typeof Symbol&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function a(e,n){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,a,o=t.call(e),i=[];try{for(;(void 0===n||n-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(t=o.return)&&t.call(o)}finally{if(a)throw a.error}}return i}function o(e,n){for(var t=0,r=n.length,a=e.length;t<r;t++,a++)e[a]=n[t];return e}function i(e){for(var n=[],t=0;t<e.length;t++){var r=e[t];n.push([t,r])}return n}function u(e){for(var n=Object.keys(e),t=n.length,r=new Array(t);t--;)r[t]=[n[t],e[n[t]]];return r}function l(e){return"string"==typeof e?'"'+e.replace(/"/g,'"')+'"':""+e}function p(e){return e}function f(e){return function(n,t){return e(n)?[]:t.fail()}}function c(e){return t={type:function(){return e.type},validateBeforeMap:e.validate,validateBeforeUnmap:e.validate,map:e.map,unmap:e.map},n(n({},t),{validateBeforeMapXml:t.validateBeforeUnmap,mapXml:t.map,unmapXml:t.unmap});var t}function m(e){return"number"==typeof e||"string"==typeof e&&!isNaN(e)}function v(e){return"number"==typeof e?e:+e}function d(e){return"bigint"==typeof e?e:BigInt(e)}function y(e,n){var t=new Set(n),r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&!t.has(a)&&(r[a]=e[a]);return r}function s(e){return-1!==e.indexOf(" ")?l(e):e}function h(e,n){return{value:e,type:n,branch:[e],path:[]}}function b(e){var t=function(n,t,r){return b({value:t,type:r.type(),branch:o(o([],a(e.branch)),[t]),path:o(o([],a(e.path)),[n])})},r=function(e,n,r){return e.map((function(e){return r(e,t(e[0],e[1],n))}))};return n(n({},e),{createChild:t,flatmapChildren:function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return X(r.apply(void 0,o([],a(e))))},mapChildren:r,fail:function(t){return[n(n({},e),{message:j(e,t)})]}})}function j(e,n){var t=JSON.stringify(e.value,(function(e,n){return"bigint"==typeof n?n.toString():n}));return n=(null!=n?n:"Expected value to be of type '"+e.type+"' but found '"+typeof e.value+"'.")+"\n\nGiven value: "+t+"\nType: '"+typeof e.value+"'\nExpected type: '"+e.type+"'",e.path.length>0&&(n+="\nPath: "+e.path.map((function(e){return s(e.toString())})).join(" › ")),n}function X(e){var n,t,a,o,i=[];try{for(var u=r(e),l=u.next();!l.done;l=u.next()){var p=l.value;try{for(var f=(a=void 0,r(p)),c=f.next();!c.done;c=f.next()){var m=c.value;i.push(m)}}catch(e){a={error:e}}finally{try{c&&!c.done&&(o=f.return)&&o.call(f)}finally{if(a)throw a.error}}}}catch(e){n={error:e}}finally{try{l&&!l.done&&(t=u.return)&&t.call(u)}finally{if(n)throw n.error}}return i}function O(e){return"bigint"==typeof e||"number"==typeof e||"string"==typeof e&&/^-?\d+$/.test(e)}function g(e){return"boolean"==typeof e||"string"==typeof e&&("true"===e||"false"===e)}function B(e,n){return null==e||e===n}function M(e){var n=function(n,t,r){if("object"!=typeof t||null===t)return r.fail();var a=t;return r.flatmapChildren(u(a),e,(function(t,r){return e[n](t[1],r)}))};return{type:function(){return"Record<string,"+e.type()+">"},validateBeforeMap:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.apply(void 0,o(["validateBeforeMap"],a(e)))},validateBeforeUnmap:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.apply(void 0,o(["validateBeforeUnmap"],a(e)))},map:function(n,t){var r={};for(var a in n)if(Object.prototype.hasOwnProperty.call(n,a)){var o=n[a];r[a]=e.map(o,t.createChild(a,o,e))}return r},unmap:function(n,t){var r={};for(var a in n)if(Object.prototype.hasOwnProperty.call(n,a)){var o=n[a];r[a]=e.unmap(o,t.createChild(a,o,e))}return r},validateBeforeMapXml:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.apply(void 0,o(["validateBeforeMapXml"],a(e)))},mapXml:function(n,t){var r={};for(var a in n)if(Object.prototype.hasOwnProperty.call(n,a)){var o=n[a];r[a]=e.mapXml(o,t.createChild(a,o,e))}return r},unmapXml:function(n,t){var r={};for(var a in n)if(Object.prototype.hasOwnProperty.call(n,a)){var o=n[a];r[a]=e.unmapXml(o,t.createChild(a,o,e))}return r}}}function x(e){var n=P(e,!1,!1);return n.type=function(){return"StrictObject<{"+Object.keys(e).map(s).join(",")+"}>"},n}function w(e){return P(e,!0,!0)}function S(e){var n=P(e,!0,!1);return n.type=function(){return"Object<{"+Object.keys(e).map(s).join(",")+"}>"},n}function P(e,n,t){var r=Object.keys(e),o=k(e),i=function(e){var n,t,r={},o={};for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var u=a(e[i],3),l=u[0],p=u[2];!0===(null==p?void 0:p.isAttr)?o[null!==(n=p.xmlName)&&void 0!==n?n:l]=i:r[null!==(t=null==p?void 0:p.xmlName)&&void 0!==t?t:l]=i}return{elementsToProps:r,attributesToProps:o}}(e),u=function(e){var n,t={},r={};for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=a(e[o],3),u=i[0],l=i[1],p=i[2];((null==p?void 0:p.isAttr)?r:t)[o]=[null!==(n=null==p?void 0:p.xmlName)&&void 0!==n?n:u,l,p]}return{elementsSchema:t,attributesSchema:r}}(e),l=function(e){return{attributesSchema:k(e.attributesSchema),elementsSchema:k(e.elementsSchema)}}(u);return{type:function(){return"Object<{"+r.map(s).join(",")+",...}>"},validateBeforeMap:C(e,"validateBeforeMap",n),validateBeforeUnmap:C(o,"validateBeforeUnmap",n),map:$(e,"map",t),unmap:$(o,"unmap",t),validateBeforeMapXml:A(e,i,n),mapXml:N(u,t),unmapXml:U(l,t),objectSchema:e}}function A(e,n,r){var i=n.elementsToProps,u=n.attributesToProps;return function(n,l){if("object"!=typeof n||null===n)return l.fail();var p=n,f=p.$,c=t(p,["$"]),m=null!=f?f:{};return o(o([],a(T({validationMethod:"validateBeforeMapXml",propTypeName:"child elements",propTypePrefix:"element",valueTypeName:"element",propMapping:i,objectSchema:e,valueObject:c,ctxt:l,allowAdditionalProperties:r}))),a(T({validationMethod:"validateBeforeMapXml",propTypeName:"attributes",propTypePrefix:"@",valueTypeName:"element",propMapping:u,objectSchema:e,valueObject:m,ctxt:l,allowAdditionalProperties:r})))}}function N(e,r){var o=e.elementsSchema,i=e.attributesSchema,l=$(o,"mapXml",r),p=$(i,"mapXml",!1),f=u(i).map((function(e){var n=a(e,2);return n[0],a(n[1],1)[0]}));return function(e,a){var o=e,i=o.$,u=t(o,["$"]),c=null!=i?i:{},m=n(n({},p(c,a)),l(u,a));if(r){var v=y(c,f);Object.keys(v).length>0&&(m.$=v)}return m}}function U(e,r){var o=e.elementsSchema,i=e.attributesSchema,l=$(o,"unmapXml",r),p=$(i,"unmapXml",!1),f=u(i).map((function(e){var n=a(e,2);return n[0],a(n[1],1)[0]}));return function(e,a){var o=e,i=o.$,u=t(o,["$"]),c="object"==typeof i&&null!==i&&r?i:{};return n(n({},l(y(u,f),a)),{$:n(n({},c),p(e,a))})}}function T(e){var n=e.validationMethod,t=e.propTypeName,r=e.propTypePrefix,i=e.valueTypeName,u=e.propMapping,p=e.objectSchema,f=e.valueObject,c=e.ctxt,m=e.allowAdditionalProperties,v=[],d=new Set,y=new Set(Object.keys(f));for(var s in u)if(Object.prototype.hasOwnProperty.call(u,s)){var h=p[u[s]][1];y.delete(s),s in f?v.push.apply(v,o([],a(h[n](f[s],c.createChild(r+s,f[s],h))))):0!==h.type().indexOf("Optional<")&&d.add(s)}var b=Array.from(y);b.length>0&&!m&&v.push.apply(v,o([],a(c.fail("Some unknown "+t+" were found in the "+i+": "+b.map(l).join(", ")+"."))));var j=Array.from(d);return j.length>0&&v.push.apply(v,o([],a(c.fail("Some "+t+" are missing in the "+i+": "+j.map(l).join(", ")+".")))),v}function C(e,n,t){var r=function(e){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[e[t][0]]=t);return n}(e);return function(a,o){return"object"!=typeof a||null===a?o.fail():T({validationMethod:n,propTypeName:"properties",propTypePrefix:"",valueTypeName:"object",propMapping:r,objectSchema:e,valueObject:a,ctxt:o,allowAdditionalProperties:t})}}function $(e,n,t){return function(r,a){var o={},i=r,u=new Set(Object.keys(i));for(var l in e)if(Object.prototype.hasOwnProperty.call(e,l)){var p=e[l],f=p[0],c=i[f];u.delete(f),0===p[1].type().indexOf("Optional<")&&void 0===c||(o[l]=p[1][n](c,a.createChild(f,c,p[1])))}return t&&u.forEach((function(e){o[e]=i[e]})),o}}function k(e){var n={};for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var r=e[t];n[r[0]]=[t,r[1],r[2]]}return n}function E(e){return"string"==typeof e}e.array=function(e,n){return{type:function(){return"Array<"+e.type()+">"},validateBeforeMap:function(n,t){return Array.isArray(n)?t.flatmapChildren(i(n),e,(function(n,t){return e.validateBeforeMap(n[1],t)})):t.fail()},validateBeforeUnmap:function(n,t){return Array.isArray(n)?t.flatmapChildren(i(n),e,(function(n,t){return e.validateBeforeUnmap(n[1],t)})):t.fail()},map:function(n,t){return t.mapChildren(i(n),e,(function(n,t){return e.map(n[1],t)}))},unmap:function(n,t){return t.mapChildren(i(n),e,(function(n,t){return e.unmap(n[1],t)}))},mapXml:function(t,r){var a=t;return(null==n?void 0:n.xmlItemName)&&(a=t[n.xmlItemName],r=r.createChild(n.xmlItemName,a,e)),r.mapChildren(i(a),e,(function(n,t){return e.mapXml(n[1],t)}))},unmapXml:function(t,r){var a,o=r.mapChildren(i(t),e,(function(n,t){return e.unmapXml(n[1],t)}));return(null==n?void 0:n.xmlItemName)?((a={})[n.xmlItemName]=o,a):o},validateBeforeMapXml:function(t,r){var a=t;if(null==n?void 0:n.xmlItemName){var o="Expected array to be wrapped with XML element "+n.xmlItemName+".";if("object"!=typeof t||null===t||!(n.xmlItemName in t))return r.fail(o);a=t[n.xmlItemName],r=r.createChild(n.xmlItemName,a,e)}return Array.isArray(a)?r.flatmapChildren(i(a),e,(function(n,t){return e.validateBeforeMapXml(n[1],t)})):r.fail()}}},e.bigint=function(){return c({type:"bigint",validate:f(O),map:d})},e.boolean=function(){return c({type:"boolean",validate:f(g),map:function(e){return"boolean"==typeof e?e:"true"===e}})},e.defaults=function(e,n){return{type:function(){return"Defaults<"+e.type()+","+l(n)+">"},validateBeforeMap:function(t,r){return B(t,n)?[]:e.validateBeforeMap(t,r)},validateBeforeUnmap:function(t,r){return B(t,n)?[]:e.validateBeforeUnmap(t,r)},map:function(t,r){return B(t,n)?n:e.map(t,r)},unmap:function(t,r){return B(t,n)?n:e.unmap(t,r)},validateBeforeMapXml:function(t,r){return B(t,n)?[]:e.validateBeforeMapXml(t,r)},mapXml:function(t,r){return B(t,n)?n:e.mapXml(t,r)},unmapXml:function(t,r){return B(t,n)?n:e.unmapXml(t,r)}}},e.dict=M,e.dictWithXmlEntries=function(e){var t=M(e),o=n({},t);return o.unmapXml=function(e,n){return{entry:u(t.unmapXml(e,n)).map((function(e){var n=a(e,2);return{$:{key:n[0]},_:n[1]}}))}},o.mapXml=function(e,n){var a,o;if(!("entry"in e))return{};var i=e.entry;Array.isArray(i)||(i=[i]);var u={};try{for(var l=r(i),p=l.next();!p.done;p=l.next()){var f=p.value;u[f.$.key]=f._}}catch(e){a={error:e}}finally{try{p&&!p.done&&(o=l.return)&&o.call(l)}finally{if(a)throw a.error}}return t.mapXml(u,n)},o.validateBeforeMapXml=function(e,n){var a,o;if("object"!=typeof e||null===e)return n.fail();if(!("entry"in e))return[];var i=e.entry;Array.isArray(i)||(i=[i]);var u={};try{for(var l=r(i),p=l.next();!p.done;p=l.next()){var f=p.value;if("object"!=typeof f||null===f)return n.fail('Expected "entry" to be an XML element.');if(!("$"in f)||!("key"in f.$))return n.fail('Expected "entry" element to have an attribute named "key".');var c=f;u[c.$.key]=c._}}catch(e){a={error:e}}finally{try{p&&!p.done&&(o=l.return)&&o.call(l)}finally{if(a)throw a.error}}return t.validateBeforeMapXml(u,n)},o},e.discriminatedObject=function(e,n,t,r,o){var i=function(e,n,a){if(void 0===a&&(a=!1),"object"==typeof e&&null!==e&&(a&&function(e,n){return"$"in e&&"object"==typeof e.$&&n in e.$}(e,n)||!a&&n in e)){var o=a?e.$[n]:e[n];if("string"==typeof o&&o in t)return t[o]}return t[r]};return{type:function(){return"DiscriminatedUnion<"+n+",["+u(t).map((function(e){var n=a(e,2);return n[0],n[1].type})).join(",")+"]>"},map:function(e,t){return i(e,n).map(e,t)},unmap:function(n,t){return i(n,e).unmap(n,t)},validateBeforeMap:function(e,t){return i(e,n).validateBeforeMap(e,t)},validateBeforeUnmap:function(n,t){return i(n,e).validateBeforeUnmap(n,t)},mapXml:function(e,t){var r;return i(e,null!==(r=null==o?void 0:o.xmlName)&&void 0!==r?r:n,null==o?void 0:o.isAttr).mapXml(e,t)},unmapXml:function(n,t){return i(n,e).unmapXml(n,t)},validateBeforeMapXml:function(e,t){var r;return i(e,null!==(r=null==o?void 0:o.xmlName)&&void 0!==r?r:n,null==o?void 0:o.isAttr).validateBeforeMapXml(e,t)}}},e.expandoObject=w,e.extendExpandoObject=function(e,t){return w(n(n({},e.objectSchema),t))},e.extendObject=function(e,t){return S(n(n({},e.objectSchema),t))},e.extendStrictObject=function(e,t){return x(n(n({},e.objectSchema),t))},e.lazy=function(e){var n,t,r,i=(n=e,r=!1,function(){for(var e=[],a=0;a<arguments.length;a++)e[a]=arguments[a];return r?t:(r=!0,t=n.apply(this,e))});return{type:function(){return"Lazy<"+i().type()+">"},map:function(){for(var e,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return(e=i()).map.apply(e,o([],a(n)))},unmap:function(){for(var e,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return(e=i()).unmap.apply(e,o([],a(n)))},validateBeforeMap:function(){for(var e,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return(e=i()).validateBeforeMap.apply(e,o([],a(n)))},validateBeforeUnmap:function(){for(var e,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return(e=i()).validateBeforeUnmap.apply(e,o([],a(n)))},mapXml:function(){for(var e,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return(e=i()).mapXml.apply(e,o([],a(n)))},unmapXml:function(){for(var e,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return(e=i()).unmapXml.apply(e,o([],a(n)))},validateBeforeMapXml:function(){for(var e,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return(e=i()).validateBeforeMapXml.apply(e,o([],a(n)))}}},e.literal=function(e){return c({type:"Literal<"+l(e)+">",validate:f((function(n){return e===n})),map:function(){return e}})},e.nullable=function(e){return{type:function(){return"Nullable<"+e.type()+">"},validateBeforeMap:function(n,t){return null===n?[]:e.validateBeforeMap(n,t)},validateBeforeUnmap:function(n,t){return null===n?[]:e.validateBeforeUnmap(n,t)},map:function(n,t){return null===n?null:e.map(n,t)},unmap:function(n,t){return null===n?null:e.unmap(n,t)},validateBeforeMapXml:function(n,t){return null===n?[]:e.validateBeforeMapXml(n,t)},mapXml:function(n,t){return null===n?null:e.mapXml(n,t)},unmapXml:function(n,t){return null===n?null:e.unmapXml(n,t)}}},e.number=function(){return c({type:"number",validate:f(m),map:v})},e.numberEnum=function(e){var n=f(function(e){var n=Object.values(e);return function(e){return m(e)&&n.includes(v(e))}}(e));return c({type:"Enum<"+Object.values(e).filter((function(e){return"number"==typeof e})).join(",")+">",map:v,validate:n})},e.object=S,e.optional=function(e){return{type:function(){return"Optional<"+e.type()+">"},validateBeforeMap:function(n,t){return void 0===n?[]:e.validateBeforeMap(n,t)},validateBeforeUnmap:function(n,t){return void 0===n?[]:e.validateBeforeUnmap(n,t)},map:function(n,t){return void 0===n?void 0:e.map(n,t)},unmap:function(n,t){return void 0===n?void 0:e.unmap(n,t)},validateBeforeMapXml:function(n,t){return void 0===n?[]:e.validateBeforeMapXml(n,t)},mapXml:function(n,t){return void 0===n?void 0:e.mapXml(n,t)},unmapXml:function(n,t){return void 0===n?void 0:e.unmapXml(n,t)}}},e.strictObject=x,e.string=function(){return c({type:"string",validate:f(E),map:p})},e.stringEnum=function(e){var n=f(function(e){var n=Object.values(e);return function(e){return"string"==typeof e&&n.includes(e)}}(e));return c({type:"Enum<"+Object.values(e).map(l).join(",")+">",map:p,validate:n})},e.unknown=function(){return c({type:"unknown",validate:function(){return[]},map:p})},e.validateAndMap=function(e,n){var t=b(h(e,n.type())),r=n.validateBeforeMap(e,t);return 0===r.length?{errors:!1,result:n.map(e,t)}:{errors:r}},e.validateAndMapXml=function(e,n){var t=b(h(e,n.type())),r=n.validateBeforeMapXml(e,t);return 0===r.length?{errors:!1,result:n.mapXml(e,t)}:{errors:r}},e.validateAndUnmap=function(e,n){var t=b(h(e,n.type())),r=n.validateBeforeUnmap(e,t);return 0===r.length?{errors:!1,result:n.unmap(e,t)}:{errors:r}},e.validateAndUnmapXml=function(e,n){var t=b(h(e,n.type())),r=n.validateBeforeUnmap(e,t);return 0===r.length?{errors:!1,result:n.unmapXml(e,t)}:{errors:r}},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).ApimaticSchema={});
