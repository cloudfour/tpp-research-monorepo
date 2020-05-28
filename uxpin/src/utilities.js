export function sizeToUtility(size) {
  if (size) {
    return `c4-size-${size.toString().replace("-", "n")}`;
  } else {
    return "";
  }
}
