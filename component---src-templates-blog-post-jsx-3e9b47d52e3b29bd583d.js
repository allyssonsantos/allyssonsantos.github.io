(self.webpackChunkallysson_me=self.webpackChunkallysson_me||[]).push([[390],{69100:function(e,t,r){var n=r(99489),o=r(57067);function c(t,r,a){return o()?(e.exports=c=Reflect.construct,e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=c=function(e,t,r){var o=[null];o.push.apply(o,t);var c=new(Function.bind.apply(e,o));return r&&n(c,r.prototype),c},e.exports.default=e.exports,e.exports.__esModule=!0),c.apply(null,arguments)}e.exports=c,e.exports.default=e.exports,e.exports.__esModule=!0},57067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.default=e.exports,e.exports.__esModule=!0},21274:function(e,t,r){var n=r(41048);e.exports={MDXRenderer:n}},41048:function(e,t,r){var n=r(69100),o=r(319),c=r(59713),a=r(37316),u=["scope","children"];function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var i=r(67294),p=r(63497).mdx,f=r(93191).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,c=a(e,u),l=f(t),d=i.useMemo((function(){if(!r)return null;var e=s({React:i,mdx:p},l),t=Object.keys(e),c=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(o(t),[""+r])).apply(void 0,[{}].concat(o(c)))}),[r,t]);return i.createElement(d,s({},c))}},20111:function(e,t,r){"use strict";r.r(t);var n=r(9925),o=r(67294),c=r(21274),a=r(40531),u=r(22591),l=r(56247);function s(e){var t=e.data.mdx,r=e.transitionStatus,n=(0,a.Z)(r);return o.createElement(i,{$_css:n},o.createElement(l.HJ,{title:t.frontmatter.title,description:t.excerpt}),o.createElement(u.Dx,null,t.frontmatter.title),o.createElement(u.dk,null,t.frontmatter.description),o.createElement("time",null,"Publicado em ",t.frontmatter.date),t.frontmatter.img&&o.createElement(u.Ei,{src:"/"+t.frontmatter.img}),o.createElement(l.o5,{headings:t.headings}),o.createElement(c.MDXRenderer,null,t.body))}t.default=s;s.defaultProps={pageContext:void 0},s.defaultProps={transitionStatus:void 0};var i=(0,n.default)("div").withConfig({displayName:"blog-post___StyledDiv",componentId:"sc-94awsv-0"})(["animation:",";"],(function(e){return e.$_css}))}}]);
//# sourceMappingURL=component---src-templates-blog-post-jsx-3e9b47d52e3b29bd583d.js.map