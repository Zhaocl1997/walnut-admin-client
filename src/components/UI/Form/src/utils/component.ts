export const components = {
  WFormItemExtendQuery: createAsyncComponent(
    () => import('../components/Extend/Query.vue'),
  ),
  WFormItemExtendDivider: createAsyncComponent(
    () => import('../components/Extend/Divider.vue'),
  ),

  WFormExtendDescriptions: createAsyncComponent(
    // @ts-expect-error
    () => import('../../../Descriptions/index.ts'),
  ),
}
