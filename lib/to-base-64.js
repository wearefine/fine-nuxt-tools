export default function(str) {
  try {
    return `${Buffer.from(str).toString('base64')}`
  } catch (error) {
    return ''
  }
}
