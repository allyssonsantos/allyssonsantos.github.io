declare module '@gympass/yoga';
declare module '*.svg' {
  const component: React.FC<React.SVGProps<SVGSVGElement>>;

  export default component;
}
