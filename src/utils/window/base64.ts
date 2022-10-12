export const wbtoa = (a: string) => window.btoa(unescape(encodeURIComponent(a)))
export const watob = (a: string) => decodeURIComponent(escape(window.atob(a)))
