function kmp(desStr, pattern) {
    let next = getNext(pattern),
        i = 0,
        j = 0,
        len = desStr.length,
        jLen = pattern.length,
        arr = [];

    while(i < len) {
        if (j > jLen - 1) {
            arr.push(i - j);
            j = 0;
        }
        if (j == -1 || desStr[i] == pattern[j]) {
            i++;
            j++;
        } else {
            j = next[j];
        }
    }
    return arr;
}

function getNext(str){
    if (!str) {
        return;
    }
    let len = str.length,
        next = [-1],
        k = -1,
        i = 0;

    while(i < len - 1) {
        if (k == -1 || str[i] == str[k]) {
            next[++i] = ++k;
        } else {
            k = next[k];
        }
    }
    return next;
}

// 最初求解next数组的方法
function getNextOrigin(str) {
    if (!str) {
        return;
    }
    let len = str.length,
        next = [0],
        k = 0;
    for (let i = 1; i < len; i++) {
        k = next[i-1];
        while(str[i] != str[k] && k != 0) {
            k = next[k - 1];
        }
        if (str[i] == str[k]) {
            next[i] = k + 1;
        } else {
            next[i] = 0;
        }
    }
    return next;
}