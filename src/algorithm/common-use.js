// 冒泡排序（这个是选择排序的实现，不是冒泡排序，尴尬）
function bubbleSort(a) {
  let j = 0
  let temp
  let count = 0

  for (let i = 0, len = a.length; i < len - 1; i++) {
    for (j = i + 1; j < len; j++) {
      count++
      if (a[i] > a[j]) {
        temp = a[i]
        a[i] = a[j]
        a[j] = temp
      }
    }
  }
  console.log('bubble sort count-->', count)
  return a
}

// 快速排序
var qcount = 0
function quickSort(a, start = 0, end) {
  if (typeof end == 'undefined') {
    end = a.length - 1
  }
  if (start >= end) {
    qcount++
    return
  }
  let j = end
  let i = start
  let x = a[start]
  while (i < j) {
    while (i < j && a[j] > x) {
      qcount++
      j--
    }
    if (i < j) {
      qcount++
      a[i] = a[j]
      i++
    }
    while (i < j && a[i] <= x) {
      qcount++
      i++
    }
    if (i < j) {
      qcount++
      a[j] = a[i]
      j--
    }
  }
  qcount++
  a[i] = x
  quickSort(a, start, i - 1)
  quickSort(a, i + 1, end)
  console.log('quickSort count-->', qcount)
  return a
}

// 堆排序
function heapSort(a) {
  let count = 0
  // 创建最小堆
  function buildMinHeap(a) {
    let len = a.length
    for (let i = Math.ceil(len / 2) - 1; i >= 0; i--) {
      minHeapUnit(a, i, len)
    }
    console.log('build min heap-->', a)
  }

  // 每层构建最小堆
  function minHeapUnit(a, i, len) {
    let temp = a[i]
    let j = 2 * i + 1
    while (j < len) {
      count++
      if (j + 1 < len && a[j + 1] < a[j]) {
        j++
      }
      if (a[j] >= temp) {
        break
      }
      a[i] = a[j]
      i = j
      j = 2 * i + 1
    }
    a[i] = temp
    count++
  }

  // 删除最小堆
  function deleteHeap(a) {
    let len = a.length
    let temp
    for (let i = len - 1; i >= 1; i--) {
      temp = a[0]
      a[0] = a[i]
      a[i] = temp
      minHeapUnit(a, 0, i)
    }
  }

  buildMinHeap(a)
  deleteHeap(a)
  console.log('heap sort count-->', count)
  return a
}

// 二分查找

// 翻转二叉树

// 树，先序

// 树，后序

// 树，中序

// 树，bfs

// 树，dfs
