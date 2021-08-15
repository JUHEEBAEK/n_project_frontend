function createRoute(route) {
  return {
    name: route.name,
    path: route.path,
    redirect: route.redirect || null,
    component: route.componentPath
      ? () => import(/* webpackMode: "lazy" */ `@/views/${route.componentPath}.vue`)
      : null,
    meta: {
      ...(route.meta || {}),
      requireAuth: true
    }
  };
}

function filterRoutesByAuth(routes, userType) {
  const filteredRoutes = routes.filter(route => {
    if (route.children && route.children.length > 0) {
      route.children = filterRoutesByAuth(route.children, userType);
      return true;
    } else {
      return !route.meta || !route.meta.auth || route.meta.length === 0 || route.meta.auth.includes(userType);
    }
  });

  return filteredRoutes;
}

function generateRoutes(routes, userType) {
  const recordRoutes = routes.map(route => {
    if (route.children && route.children.length > 0) {
      const recordRoute = createRoute(route);
      recordRoute.children = generateRoutes(route.children, userType);
      return recordRoute;
    } else {
      return createRoute(route);
    }
  });

  return recordRoutes;
}

export { generateRoutes, filterRoutesByAuth };
