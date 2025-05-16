import type { ShallowRef } from 'vue'

export const { setContext: setLayoutContext, getContext: useLayoutContext }
    = useContext<{ scrollWrapper: ShallowRef<HTMLElement | null> }>(Symbol(AppConstSymbolKey.LAYOUT_KEY))
