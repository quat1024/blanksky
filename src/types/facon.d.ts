declare module "facon" {
  export default function f(
    strings: TemplateStringsArray,
    ...args: (string | HTMLElement)[]
  ): HTMLElement & {
    collect: <T extends object>(args?: {
      attr?: string,
      keepAttribute?: boolean,
      to?: T
    }) => T
  }
}