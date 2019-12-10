import { boolean } from 'boolean'

export default function(obj, keysToBool) {
  const mapped = { ...obj }
  keysToBool.forEach(x => {
    mapped[x] = boolean(mapped[x])
  })
  return mapped
}
