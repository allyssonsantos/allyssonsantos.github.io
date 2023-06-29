export const mockedPost = {
  title: 'Blog One🚀',
  publishedAt: '2021-12-24',
  description: 'Learn how to build a Next.js blog with MDX and Contentlayer!',
  cover: 'github_captions.jpeg',
  altCover: 'Antiga interface da página inicial do github',
  tags: ['css', 'javascript'],
  category: 'react',
  locale: 'pt',
  body: {
    raw:
      '\n' +
      '# Hey There👋\n' +
      '\n' +
      "Welcome to Blog One✨ Let's learn together!\n" +
      '\n' +
      '<button>Hellooo</button>\n' +
      '\n' +
      '```typescript:lib/test.ts\n' +
      "const foo = 'bar';\n" +
      '```\n',
    code:
      'var Component=(()=>{var h=Object.create;var o=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var m=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty;var b=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),j=(n,e)=>{for(var a in e)o(n,a,{get:e[a],enumerable:!0})},c=(n,e,a,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of g(e))!u.call(n,s)&&s!==a&&o(n,s,{get:()=>e[s],enumerable:!(r=p(e,s))||r.enumerable});return n};var x=(n,e,a)=>(a=n!=null?h(m(n)):{},c(e||!n||!n.__esModule?o(a,"default",{value:n,enumerable:!0}):a,n)),y=n=>c(o({},"__esModule",{value:!0}),n);var l=b((w,i)=>{i.exports=_jsx_runtime});var v={};j(v,{default:()=>_,frontmatter:()=>N});var t=x(l()),N={title:"Blog One\\u{1F680}",publishedAt:"2021-12-24",description:"Learn how to build a Next.js blog with MDX and Contentlayer!",cover:"github_captions.jpeg",altCover:"Antiga interface da p\\xE1gina inicial do github",tags:["css","javascript"]};function d(n){let e=Object.assign({h1:"h1",a:"a",p:"p",div:"div",pre:"pre",code:"code",span:"span"},n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"hey-there",children:(0,t.jsx)(e.a,{href:"#hey-there",children:"Hey There\\u{1F44B}"})}),`\n' +
      '`,(0,t.jsx)(e.p,{children:"Welcome to Blog One\\u2728 Let\'s learn together!"}),`\n' +
      '`,(0,t.jsx)("button",{children:"Hellooo"}),`\n' +
      '`,(0,t.jsx)(e.div,{className:"rehype-code-title",children:"lib/test.ts"}),(0,t.jsx)(e.pre,{className:"language-typescript",children:(0,t.jsx)(e.code,{className:"language-typescript code-highlight",children:(0,t.jsxs)(e.span,{className:"code-line",children:[(0,t.jsx)(e.span,{className:"token keyword",children:"const"})," foo ",(0,t.jsx)(e.span,{className:"token operator",children:"="})," ",(0,t.jsx)(e.span,{className:"token string",children:"\'bar\'"}),(0,t.jsx)(e.span,{className:"token punctuation",children:";"}),`\n' +
      '`]})})})]})}function f(n={}){let{wrapper:e}=n.components||{};return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(d,n)})):d(n)}var _=f;return y(v);})();\n' +
      ';return Component;',
  },
  _id: 'hello.mdx',
  _raw: {
    sourceFilePath: 'hello.mdx',
    sourceFileName: 'hello.mdx',
    sourceFileDir: '.',
    contentType: 'mdx' as const,
    flattenedPath: 'hello',
  },
  type: 'Blog' as const,
  readingTime: { text: '1 min read', minutes: 0.085, time: 5100, words: 17 },
  slug: 'hello',
};
