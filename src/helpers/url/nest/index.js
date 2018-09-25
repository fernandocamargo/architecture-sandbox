export const nest = (items, base = "") => {
  return items.map(({ url = "", children = [], ...item }) => {
    const URL = base + url;

    return {
      url: URL,
      children: nest(children, URL),
      ...item
    };
  });
};

export default nest;
