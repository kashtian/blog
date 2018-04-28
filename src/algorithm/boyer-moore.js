/**
 * 此算法比kmp算法更高效，(微笑)
 */
function bm(des, pattern) {
  let badMap = badHash(pattern)
  let goodArr = goodSuffix(pattern)
  let plen = pattern.length
  let len = des.length - plen
  let i = 0
  let j = plen - 1
  let indexs = []
  let badLen = 0
  let goodLen = 0
  let count = 0
  let blockCount = 0

  while (i <= len) {
    count++
    if (des[i + j] == pattern[j]) {
      j--
      blockCount++
    } else {
      badLen = badMap[j][des[i + j]] || (j - (-1))
      goodLen = goodArr[j]
      console.log('j-->', j, i, badLen, goodLen)
      i += (goodLen > badLen ? goodLen : badLen)
      j = plen - 1
      blockCount++
    }
    if (j == -1) {
      indexs.push(i)
      j = plen - 1
      i += plen
      blockCount++
    }
  }

  console.log('bm blockCount-->', blockCount)
  console.log('bm count-->', count)

  return indexs
}

function badHash(str) {
  let hash = {0: {}}

  for (let i = 1, len = str.length; i < len; i++) {
    hash[i] = {}
    for (let j = 0; j < i; j++) {
      hash[i][str[j]] = i - j
    }
  }
  return hash
}

function goodSuffix(str) {
  let len = str.length;
  let i = len - 2;
  let prefix = ''
  let arr = []

  arr[i+1] = len

  while (i >= 0) {
    prefix = str.slice(0, len - i - 1)
    if (prefix == str.slice(i + 1)) {
      arr[i] = i + 1
    } else {
      arr[i] = arr[i+1]
    }
    i--
  }
  arr[len - 1] = 0

  return arr
}
