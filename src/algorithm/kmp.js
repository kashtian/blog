/**
 * 一个算法花费的时间与算法中语句的执行次数成正比，哪个算法中语句执行次数多，它花费时间就多
 * 
 * 所以kmp中j ==- 1的情况不需要拆分开来，因为虽然循环次数增加，但是它执行的语句次数是一样的
 * 
 * 然而getIndexs循环次数少，执行语句的次数也少，但由于循环体中的语句都比较简单，所以这两个方法的执行时间并没有什么差异
 */
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
  let k = -1; // next数组的值，表示前后缀公共长度值
  let next = [-1]; // next数组的值，存放的是前后缀公共长度值，只有字符失配时会用到next的值
  let i = 0;

  while (i < str.length - 1) {
    if (str[i] == str[k] || k == -1) {
      next[++i] = ++k
      // 优化点在于： 如果当前字符失配，它的公共前缀处的字符若与它相等必然也失配，故将此值替换成公共前缀处的长度值
      if (str[i] == str[k]) {
        next[i] = next[k]
      }
    } else {
      k = next[k]
    }
  }
  return next;
}
