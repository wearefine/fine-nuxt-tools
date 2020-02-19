export default function(obj, keysToBool) {
  const { boolean } = require('boolean')
  const mapped = { ...obj }
  keysToBool.forEach(x => {
    mapped[x] = boolean(mapped[x])
  })
  return mapped
}
