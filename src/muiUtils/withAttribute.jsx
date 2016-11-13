export default (name, value, existing = {}) => {
  const attributes = { ...existing }
  if (value) {
    attributes[name] = value
  }
  return attributes
}
