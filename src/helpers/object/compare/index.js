import stringify from "helpers/object/stringify";

export default first => ({
  with: second => stringify(first) === stringify(second)
});
