const vuexRouterSync = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === "route/ROUTE_CHANGED") {
      // TODO router 변경시 현재 pending 중인 request cancel 작업
      const currentMenu = mutation.payload.to.matched[0]?.name;
      const breadcrumbs = mutation.payload.to.matched.map(route => {
        return {
          name: route.name,
          text: route.meta.title || route.name
        };
      });

      store.commit("global/SET_CURRENT_MENU", currentMenu);
      store.commit("global/SET_BREAD_CRUMBS", breadcrumbs);
    }
  });
};

export default vuexRouterSync;
