// 此方法不行，比下面的getIndexs方法的循环次数要多
function kmp(desStr, pattern) {
  let next = getNext(pattern),
    i = 0,
    j = 0,
    len = desStr.length,
    jLen = pattern.length,
    arr = [];
  let count = 0;
  let backCount = 0

  while (i < len) {
    count++
    if (j == -1 || desStr[i] == pattern[j]) {
      i++;
      j++;
    } else {
      backCount++
      j = next[j];
    }
    if (j == jLen) {
      arr.push(i - j);
      j = 0;
    }
  }
  console.log('kmp backcount-->', backCount)
  console.log('kmp count-->', count)
  return arr;
}

function getNext(str) {
  if (!str) {
    return;
  }
  let len = str.length,
    next = [-1],
    k = -1,
    i = 0;

  while (i < len - 1) {
    if (k == -1 || str[i] == str[k]) {
      next[++i] = ++k;
    } else {
      k = next[k];
    }
  }
  return next;
}

// 此方法相较于上面的kmp算法更优，循环次数更少
function getIndexs(des, pattern) {
  let next = getNext(pattern)
  let i = 0;
  let j = 0;
  let len = des.length - pattern.length;
  let plen = pattern.length
  let indexes = []
  let count = 0
  let backCount = 0

  while (i <= len) {
    count++
    if (des[i + j] == pattern[j]) {
      j++
    } else {
      backCount++
      i += j - next[j]
      if (next[j] <= 0) {
        j = 0
      } else {
        // 再次优化，当有前缀时，i和j跳过前缀比较前缀后的字符
        j = next[j]
      }
    }
    if (j == plen) {
      indexes.push(i)
      j = 0
      i += plen
    }
  }
  console.log('index backcount-->', backCount)
  console.log('index count-->', count)
  return indexes
}

// 优化后的next数组求解
function getNext(str) {
  let k = -1;
  let next = [-1];
  let i = 0;

  while (i < str.length - 1) {
    if (str[i] == str[k] || k == -1) {
      next[++i] = ++k
      // 优化
      if (str[i] == str[k]) {
        next[i] = next[k]
      }
    } else {
      k = next[k]
    }
  }
  return next;
}
