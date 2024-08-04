export default function getRiotIdFromString(string: string) {
  const [name, tag] = string.split('#')
  return {
    name,
    tag
  }
}
