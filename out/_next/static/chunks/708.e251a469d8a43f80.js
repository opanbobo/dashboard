(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[708],{75708:function(t,r,e){var n;"undefined"!=typeof self&&self,t.exports=(n=e(67294),function(t){function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var e={};return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},r.p="",r(r.s=0)}([function(t,r,e){"use strict";function n(){return n=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},n.apply(this,arguments)}function o(t){return a(t)||i(t)||u(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,r){if(t){if("string"==typeof t)return s(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?s(t,r):void 0}}function i(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function a(t){if(Array.isArray(t))return s(t)}function s(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(r,"__esModule",{value:!0}),e.d(r,"HighchartsReact",(function(){return d}));var p=e(1),l=e.n(p),y="undefined"!=typeof window?p.useLayoutEffect:p.useEffect,d=Object(p.memo)(Object(p.forwardRef)((function(t,r){var e=Object(p.useRef)(),c=Object(p.useRef)(),u=Object(p.useRef)(t.constructorType),i=Object(p.useRef)(t.highcharts);return y((function(){function r(){var r=t.highcharts||"object"===("undefined"==typeof window?"undefined":f(window))&&window.Highcharts,n=t.constructorType||"chart";r?r[n]?t.options?c.current=r[n](e.current,t.options,t.callback):console.warn('The "options" property was not passed.'):console.warn('The "constructorType" property is incorrect or some required module is not imported.'):console.warn('The "highcharts" property was not passed.')}if(c.current){if(!1!==t.allowChartUpdate)if(t.constructorType!==u.current||t.highcharts!==i.current)u.current=t.constructorType,i.current=t.highcharts,r();else if(!t.immutable&&c.current){var n;(n=c.current).update.apply(n,[t.options].concat(o(t.updateArgs||[!0,!0])))}else r()}else r()}),[t.options,t.allowChartUpdate,t.updateArgs,t.containerProps,t.highcharts,t.constructorType]),y((function(){return function(){c.current&&(c.current.destroy(),c.current=null)}}),[]),Object(p.useImperativeHandle)(r,(function(){return{get chart(){return c.current},container:e}}),[]),l.a.createElement("div",n({},t.containerProps,{ref:e}))})));r.default=d},function(t,r){t.exports=n}]))}}]);