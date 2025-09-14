export const checkPath = (path: string, url: string) => {
  if (url === "/") {
    return path === url;
  } else {
    return path.includes(url);
  }
};