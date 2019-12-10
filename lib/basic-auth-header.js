import toBase64 from './to-base-64'
import isEmpty from 'lodash.isempty'

export default function(unPwPair) {
  if (isEmpty(unPwPair)) {
    return false
  }
  return `Basic ${toBase64(unPwPair)}`
}
