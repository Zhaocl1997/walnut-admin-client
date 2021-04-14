import { defineAsyncComponent, h } from 'vue'

// TODO still need to prove
// loading component
const loadingComponent = () => {
  return h('div', {}, 'Component Loading...')
}

// TODO still need to prove
// error component
const ErrorComponent = () => {
  return h('div', {}, 'Component Error...')
}

// Used 1: w-form async component
export const createAsyncComponent = (loader: any) => {
  return defineAsyncComponent({
    // The factory function
    loader,

    // A component to use while the async component is loading
    loadingComponent: loadingComponent,

    // A component to use if the load fails
    errorComponent: ErrorComponent,

    // Delay before showing the loading component. Default: 200ms.
    delay: 200,

    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    timeout: 3000,

    // Defining if component is suspensible. Default: true.
    suspensible: false,

    /**
     * @param {*} error Error message object
     * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
     * @param {*} fail  End of failure
     * @param {*} attempts Maximum allowed retries number
     */
    onError(error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        // retry on fetch errors, 3 max attempts
        retry()
      } else {
        // Note that retry/fail are like resolve/reject of a promise:
        // one of them must be called for the error handling to continue.
        fail()
      }
    },
  })
}
