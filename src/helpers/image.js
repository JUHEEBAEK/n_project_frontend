export default (path, alt) => {
  if (!path) {
    return alt;
  }
  return `${process.env.VUE_APP_PUBLIC_RESOURCE_PATH}/${path}`;
};
