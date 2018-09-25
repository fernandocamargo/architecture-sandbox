export default object =>
  Array.isArray(object) ? object : [object].filter(Boolean);
