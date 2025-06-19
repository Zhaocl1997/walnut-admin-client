export default createAsyncComponent(async () => {
  useScriptTag('https://cdn.jsdelivr.net/npm/@cap.js/widget@0.1.20')

  return import('./index.vue')
})
