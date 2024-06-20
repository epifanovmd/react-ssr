import { beforeRender } from "../../renderer/beforeRender";

export const onBeforeRender = beforeRender(async ({ store }) => {
  await store.postsDataStore.onRefresh();
});
