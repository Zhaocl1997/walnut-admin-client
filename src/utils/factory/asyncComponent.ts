import { NSpin, NText } from 'naive-ui'

// loading component
function loadingComponent() {
  return h(NSpin, { size: 'small' })
}

// error component
function ErrorComponent() {
  return h(NText, { type: 'error' }, 'Error.')
}

// Used 1: w-form async component
export function createAsyncComponent(loader: any) {
  return defineAsyncComponent({
    // The factory function
    loader,

    // A component to use while the async component is loading
    loadingComponent,

    // A component to use if the load fails
    errorComponent: ErrorComponent,

    // Delay before showing the loading component. Default: 200ms.
    delay: 300,

    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    timeout: 10000,

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
      }
      else {
        // Note that retry/fail are like resolve/reject of a promise:
        // one of them must be called for the error handling to continue.
        fail()
      }
    },
  })
}
