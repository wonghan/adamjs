'use strict'

var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }

var adam = {}
/**
 * 获取指定的 querystring 中指定 name 的 value
 * @param {String} name
 * @param {String} querystring
 * @return {String|undefined}
 *
 * query('hello', '?hello=js') 结果是 js
 *
 */
adam.query = function (name, querystring) {
  if (!name || typeof name !== 'string') {
    return undefined
  }
  if (!querystring || typeof querystring !== 'string') {
    return undefined
  }
  var reg = new RegExp('(?:\\?|&)' + name + '=(.*?)(?:&|$)')
  var ret = reg.exec(querystring) || []
  return ret[1]
}

/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String|undefined}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 ''
 */
adam.serialize = function (data) {
  if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
    return undefined
  }
  // null的typeof也为'objest',但因为上面代码的条件为'!data'，所以已返回undefined,不需要再写一个条件判断语句

  // 因为数组的typeof也为'objest'，因此用isArray()判别
  if (Array.isArray(data)) {
    return undefined
  }
  var str = ''
  var i = 0
  for (var key in data) {
    if (i === 0) {
      str = '?' + key + '=' + data[key]
      i++
    } else {
      str = str + '&' + key + '=' + data[key]
    }
  }
  return str
}

/**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|undefined}
 */
adam.$ = function (selector) {
  if (!selector || typeof selector !== 'string') {
    return undefined
  }
  var dom = document.querySelectorAll(selector)
  return dom
}

/**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */

adam.removeNode = function (node) {
  if (!node || node.nodeType !== 1) {
    return false
  }
  return node.parentNode.removeChild(node)
}

/**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target
 */
adam.insertAfter = function (node, target) {
  if (!node || !target || node.nodeType !== 1 || target.nodeType !== 1) {
    return false
  }
  target.appendChild(node)
  return true
}

/**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
adam.addClass = function (node, className) {
  if (!node || node.nodeType !== 1 || !className) {
    return false
  }
  if (typeof className === 'string') {
    node.classList.add(className)
    return true
  }
  if (Array.isArray(className) && className.length !== 0) {
    for (var i = 0, len = className.length; i < len; i++) {
      if (typeof className[i] !== 'string') {
        return false
      }
      node.classList.add(className[i])
    }
    return true
  }
  return false
}

/**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
adam.removeClass = function (node, className) {
  if (!node || node.nodeType !== 1 || !className) {
    return false
  }
  if (typeof className === 'string') {
    node.classList.remove(className)
    return true
  }
  if (Array.isArray(className) && className.length !== 0) {
    for (var i = 0, len = className.length; i < len; i++) {
      if (typeof className[i] !== 'string') {
        return false
      }
      node.classList.remove(className[i])
    }
    return true
  }
  return false
}

/**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
adam.getAbsoluteUrl = function (url) {
  if (!url || typeof url !== 'string' || url.indexOf('/') !== 0) {
    return false
  }
  var target = window.location.href
  target = target + url
  return target
}

/**
 * 防抖动
 * @param {Function} callback
 * @param {Number} time
 */
adam.debounce = function (callback, time) {
  if (typeof callback !== 'function' || typeof time !== 'number') {
    return false
  }

  var timer = null

  return function () {
    // 延迟执行，每次调用都刷新计时器，只有最后一次的调用有效
    clearTimeout(timer)
    timer = setTimeout(function () {
      callback()
    }, time)
  }
}

/**
 * 节流阀
 * @param {Function} callback
 * @param {Number} time
 */
adam.throttle = function (callback, time) {
  if (typeof callback !== 'function' || typeof time !== 'number') {
    return false
  }
  var timer = null
  return function () {
    // 定时执行，若此时timer定时器已被设定，则跳过
    if (!timer) {
      timer = setTimeout(function () {
        callback()
        timer = null
      }, time)
    }
  }
}
/**
 *  根据索引移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
adam.removeItemByIndex = function (index, arr) {
  if (typeof index !== 'number' || Array.isArray(arr) !== true) {
    return false
  }
  arr.splice(index, 1)
  return arr
}

module.exports = adam
