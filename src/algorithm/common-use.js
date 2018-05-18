/**
 * 冒泡排序（相邻元素比较交换）
 * 与选择排序的差别：
 * 循环次数一样，差别在于冒泡排序交换元素的次数，因为是两两交换，所以冒泡排序
 * 交换元素次数通常大于选择排序
 */
function bubbleSort(a) {
  let temp
  let count = 0
  let len = a.length
  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      count++
      if (a[j] > a[j + 1]) {
        temp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = temp
      }
    }
  }
  console.log('bubble sort count-->', count)
  return a
}

/**
 * 选择排序（依次找出最小元素到当前位置）
 */
function selectSort(a) {
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
  console.log('select sort count-->', count)
  return a
}

/**
 * 快速排序，选择一个基准数，这里是第一个，从后向前找比基准数小的，交换，再从前向后找
 * 比基准数大的，交换，直到i,j相遇，依次递归
 */
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

/**
 * 堆排序，此处建立最小堆，然后依次从堆顶拿出元素，再重建最小堆，直到元素拿完
 */
function heapSort(a) {
  let count = 0
  // 创建最小堆
  function buildMinHeap(a) {
    let len = a.length
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      minHeapUnit(a, i, len)
    }
    console.log('build min heap-->', a, count)
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

/**
 * 计数排序，从数组a中找到最小值min，和最大值max，创建一个min-max下标的数组c,c里存储，a中对应该数字的个数，
 * 最后将数组c里的下标i按c[i]的个数输出：c[0] = 4 ===> [0, 0, 0, 0]
 */

/**
 * 桶排序，比如基数排序里用到的0-9下标的桶数组b，个位比较时，将该数字放进其个位数1对应的b[1]里
 */

/**
 * 基数排序(暂不实现，还要转换为字符串，分位数比较，麻烦)
 * 原理：将整数按位数切割成不同的数字，不足则高位补0，然后按位（个，十，百...)分别比较，从低位到高位进行比较
 */

/**
 * 插入排序，认为第一个元素有序，取出下一个元素，从后向前扫描有序数组，如果已排序的元素大于新元素，已排序元素向后
 * 移一位，直到找到比新元素小的，将新元素插入其后
 */

/**
 * 归并排序，将数组先递归到最小（一个），然后依次合并，合并时需要用到其他排序算法
 */

/**
 * 二分查找,在有序数组的基础上，找到中间位置，比较，相等则返回位置，中间值小于k,则继续在前面数组查找，否则在中间值后的数组查找
 * 尾调用优化（最后一步只调用函数没有其他操作）：只保留内层函数调用记录，不需要外层函数调用记录
 */
function binarySearch(a, k, l = 0, h) {
  if (typeof h == 'undefined') {
    h = a.length - 1
  }
  let mid = l + Math.ceil((h - l) / 2)
  if (a[mid] == k) {
    return mid
  } else if (a[mid] < k) {
    l = mid + 1
  } else {
    h = mid - 1
  }
  if (l > h) {
    return -1
  }
  return binarySearch(a, k, l, h)
}

/**
 * 二叉查找树（暂略）
 */

/**
 * 翻转二叉树（链式结构才可以）
 */
function flipBinaryTree(node) {
  if (!node) {
    return
  }
  let temp
  temp = node.left
  node.left = node.right
  node.right = temp
  flipBinaryTree(node.left)
  flipBinaryTree(node.right)
}
// 构造二叉树
function createBinaryTree(a) {
  let root = {value: a[0]}
  let queue = [root]
  let node
  for (let i = 1, len = a.length; i < len; i++) {
    node = queue[0]
    if (!node.left) {
      node.left = {value: a[i]}
      queue.push(node.left)
    } else if (!node.right) {
      node.right = {value: a[i]}
      queue.push(node.right)
      queue.shift()
    }
  }
  logBinaryTree(root, a.length)
  return root
}
// 日志打出二叉树结构
function logBinaryTree(tree, num) {
  let queue = [tree]
  let node
  let i = 0
  let count = 0
  let str = ''
  let maxLevel = Math.floor(Math.log(num) / Math.log(2))
  let max = Math.pow(2, maxLevel)
  while (queue.length > 0) {
    node = queue.shift()
    node && queue.push(node.left)
    node && queue.push(node.right)
    
    str += ' ' + (node ? node.value : ' ') + ' '
    count++
    if (count == Math.pow(2, i)) {
      if (i < maxLevel) {
        for (let j = 0; j < (max - count)*3/2; j++) {
          str = ' ' + str
        }
      }
      console.log(str)
      i++
      count = 0
      str = ''
    }
  }
}

/**
 * 二叉树，先序
 */
function preOrderRecursive(tree) {
  preOrderRecursive.result = (preOrderRecursive.result || '') + ' ' + tree.value
  if (tree.left) {
    preOrderRecursive(tree.left)
  }
  if (tree.right) {
    preOrderRecursive(tree.right)
  }
  return preOrderRecursive.result
}

function preOrderCycle(tree) {
  let arr = [tree]
  let node
  let str = ''
  
  while(arr.length) {
    node = arr.shift()
    str += ' ' + node.value
    if (node.right) {
      arr.unshift(node.right)
    }
    if (node.left) {
      arr.unshift(node.left)
    }
  }
  console.log(str)
}

/**
 * 二叉树，中序
 */
function inOrderRecursive(tree) {
  if (tree.left) {
    inOrderRecursive(tree.left)
  }
  inOrderRecursive.result = (inOrderRecursive.result || '') + ' ' + tree.value
  if (tree.right) {
    inOrderRecursive(tree.right)
  }
  return inOrderRecursive.result
}

function inOrderCycle(tree) {
  let arr = [tree]
  let node
  let visited = []
  let str = ''

  while(arr.length) {
    node = arr[0]

    if ((node.left || node.right) && !visited.includes(node.left) && !visited.includes(node.right)) {
      arr.shift()
      if (node.right && !visited.includes(node.right)) {
        arr.unshift(node.right)
      }
      arr.unshift(node)
      if (node.left && !visited.includes(node.left)) {
        arr.unshift(node.left)
      }
    } else {
      visited.push(arr.shift())
      str += ' ' + node.value
    }
  }
  console.log(str)
}

// 中序非递归优化
function inOrderCycleOptimize(root) {
  let arr = []
  let str = ''

  while(arr.length || root) {
    if (root) {
      arr.push(root)
      root = root.left
    } else {
      root = arr.pop()
      str += ' ' + root.value
      root = root.right
    }
  }
  console.log(str)
}

/**
 * 二叉树，后序
 */
function postOrderRecursive(tree) {
  if (tree.left) {
    postOrderRecursive(tree.left)
  }
  if (tree.right) {
    postOrderRecursive(tree.right)
  }
  postOrderRecursive.result = (postOrderRecursive.result || '') + ' ' + tree.value
  return postOrderRecursive.result
}

function postOrderCycle(tree) {
  let arr = [tree]
  let node
  let visited = []
  let str = ''

  while(arr.length) {
    node = arr[0]
    if ((node.left || node.right) && !visited.includes(node.left) && !visited.includes(node.right)) {
      if (node.right && !visited.includes(node.right)) {
        arr.unshift(node.right)
      }
      if (node.left && !visited.includes(node.left)) {
        arr.unshift(node.left)
      }
    } else {
      visited.push(arr.shift())
      str += ' ' + node.value
    }
  }
  console.log(str)
}

// 一种逆序思想，先根右左的顺序遍历，再逆序就是后序遍历了
function postOrderCycle2(root) {
  let arr = [root]
  let output = []
  let str = ''

  while(arr.length) {
    root = arr.shift()
    output.unshift(root)
    if (root.left) {
      arr.unshift(root.left)
    }
    if (root.right) {
      arr.unshift(root.right)
    }
  }

  output.forEach(item => {
    str += ' ' + item.value
  })
  console.log(str)
}

/**
 * 树，bfs
 */
function treeBFS(root) {
  let queue = [root]
  let str = ''

  while(queue.length) {
    root = queue.shift()
    str += ' ' + root.value
    if (root.children) {
      root.children.forEach(child => {
        queue.push(child)
      })
    }
  }
  console.log(str)
}

// 创建多叉树
function createTree(tree, children) {
  tree.children = []
  children.forEach(item => {
    tree.children.push({
      value: item
    })
  })
}

/**
 * 树，dfs
 */
function treeDFS(root) {
  treeDFS.result = (treeDFS.result || '') + ' ' + root.value
  if (root.children) {
    root.children.forEach(child => {
      treeDFS(child)
    })
  }
  return treeDFS.result
}

function treeDFSCycle(root) {
  let arr = [root]
  let i = 0
  let str = ''

  while(arr.length) {
    root = arr.pop()
    str += ' ' + root.value
    if (root.children) {
      i = root.children.length - 1
      while(i >= 0) {
        arr.push(root.children[i])
        i--
      }
    }
  }
  console.log(str)
}

 /**
  * 图
  */

/**
 * 排列组合
 */
