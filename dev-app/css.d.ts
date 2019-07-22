declare module '*.css' {
  const value: string;
  export default value;
}


namespace NodeJS {
  interface Global {
    au: Aurelia;
  }
}