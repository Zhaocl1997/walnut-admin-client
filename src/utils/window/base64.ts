export const wbtoa = (a: string) => window.btoa(unescape(encodeURIComponent(a)))
export const watob = (a: any) => decodeURIComponent(escape(window.atob(a)))
