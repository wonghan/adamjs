import adam from './../js/base'
import JQ from 'jquery'
/**
 * test query
 */
describe('test query', () => {
  const query = adam.query
  test('test name=js', () => {
    expect(query('name', '?name=js')).toBe('js')
  })
  test('test name = "empty string"', () => {
    expect(query('name', '?name=')).toBe('')
  })
  test('test name is not exist', () => {
    expect(query('name', '?name2=123')).toBeUndefined()
  })
  test('test name with multiple param', () => {
    expect(query('name', '?name=js&name2=123')).toBe('js')
    expect(query('name2', '?name=js&name2=123')).toBe('123')
  })
  test('test name ont exist with no param', () => {
    expect(query('name', '?')).toBeUndefined()
  })
  test('test name & querystring with no strings', () => {
    expect(query(123, 123)).toBeUndefined()
    expect(query('name', 123)).toBeUndefined()
    expect(query(123, '?name=js')).toBeUndefined()
    expect(query('name', [])).toBeUndefined()
    expect(query('name', {})).toBeUndefined()
    expect(query('name', true)).toBeUndefined()
    expect(query('name', undefined)).toBeUndefined()
    expect(query('name', null)).toBeUndefined()
    expect(query()).toBeUndefined()
  })
})

/**
 * test serialize
 */
describe('test serialize', () => {
  const serialize = adam.serialize
  test('test with single param', () => {
    expect(serialize({hello: 'js'})).toBe('?hello=js')
  })
  test('test with multiple param', () => {
    expect(serialize({hello: 'js', hi: 'test'})).toBe('?hello=js&hi=test')
    expect(serialize({hello: 'js', hi: 'test', me: ''})).toBe('?hello=js&hi=test&me=')
  })
  test('test with no param', () => {
    expect(serialize({})).toBe('')
  })
  test('test obj not exist', () => {
    expect(serialize('123')).toBeUndefined()
    expect(serialize(123)).toBeUndefined()
    expect(serialize(true)).toBeUndefined()
    expect(serialize([])).toBeUndefined()
    expect(serialize(null)).toBeUndefined()
    expect(serialize(undefined)).toBeUndefined()
    expect(serialize()).toBeUndefined()
  })
})

/**
 * test $
 * 引入了真正的jQuery进行对比
 */
describe('test $', () => {
  const $ = adam.$
  test('test with id', () => {
    document.body.innerHTML = '<div id="jquery">jquery</div><div id="jquery2">jquery2</div>'
    expect($('#jquery')['0']).toEqual(JQ('#jquery')['0'])
    expect($('#jquery2')['0']).toEqual(JQ('#jquery2')['0'])
  })
  test('test with className', () => {
    document.body.innerHTML = '<div class="jquery">jquery</div><div class="jquery">jquery2</div>'
    expect($('.jquery')['0']).toEqual(JQ('.jquery')['0'])
    expect($('.jquery')['1']).toEqual(JQ('.jquery')['1'])
  })
  test('test with tagName', () => {
    document.body.innerHTML = '<div class="jquery">jquery</div><div>jquery2</div>'
    expect($('div')['0']).toEqual(JQ('div')['0'])
    expect($('div')['1']).toEqual(JQ('div')['1'])
  })
  test('test with all', () => {
    document.body.innerHTML = '<div class="jquery">jquery</div>'
    expect($('*')['0']).toEqual(JQ('*')['0'])
  })
  test('test combination selector', () => {
    document.body.innerHTML = '<div class="jquery"><p class="child">jquery</p></div><div class="jquery2">jquery2</div>'
    // 多元素选择器
    expect($('.jquery,.jquery2')['0']).toEqual(JQ('.jquery,.jquery2')['0'])
    expect($('.jquery,.jquery2')['1']).toEqual(JQ('.jquery,.jquery2')['1'])
    // 后代选择器
    expect($('.jquery .child')['0']).toEqual(JQ('.jquery .child')['0'])
    // 子元素选择器
    expect($('.jquery>.child')['0']).toEqual(JQ('.jquery>.child')['0'])
    // 毗邻元素选择器
    expect($('.jquery+div')['0']).toEqual(JQ('.jquery+div')['0'])
  })
  test('test with not exist', () => {
    document.body.innerHTML = '<div class="jquery">jquery</div>'
    expect($('')).toBeUndefined()
    expect($(123)).toBeUndefined()
    expect($(true)).toBeUndefined()
    expect($([])).toBeUndefined()
    expect($(null)).toBeUndefined()
    expect($(undefined)).toBeUndefined()
    expect($()).toBeUndefined()
  })
})

/**
 * test removeNode
 */
describe('test removeNode', () => {
  const removeNode = adam.removeNode
  test(`node is exist`, () => {
    document.body.innerHTML = `<ul id="list"><li>1</li><li>2</li><li>3</li></ul>`
    const li = list.getElementsByTagName('li')

    expect(li.length).toBe(3)
    expect(removeNode(li[0]).innerHTML).toBe('1') // 删除节点
    expect(li.length).toBe(2)
    expect(li[0].innerHTML).toBe('2')
  })
  test(`node is not exist`, () => {
    document.body.innerHTML = `<ul id="list"><li>1</li><li>2</li><li>3</li></ul>`
    const li = list.getElementsByTagName('li')
    expect(removeNode(li[3])).toBeFalsy()
    expect(removeNode('')).toBeFalsy()
    expect(removeNode(123)).toBeFalsy()
    expect(removeNode(true)).toBeFalsy()
    expect(removeNode([])).toBeFalsy()
    expect(removeNode(null)).toBeFalsy()
    expect(removeNode(undefined)).toBeFalsy()
    expect(removeNode()).toBeFalsy()
  })
})

/**
 * test insertAfter
 */
describe('test insertAfter', () => {
  const insertAfter = adam.insertAfter
  test(`node is exist`, () => {
    document.body.innerHTML = `<ul id="list"><li>1</li><li>2</li><li>3</li></ul>`
    const target = document.getElementById('list')
    const node = document.createElement('li')
    expect(target.children.length).toBe(3)
    expect(insertAfter(node, target)).toBeTruthy() // 插入节点
    expect(target.children.length).toBe(4)
  })
  test(`node is not exist`, () => {
    expect(insertAfter('', '')).toBeFalsy()
    expect(insertAfter(123, 123)).toBeFalsy()
    expect(insertAfter(true, true)).toBeFalsy()
    expect(insertAfter([], [])).toBeFalsy()
    expect(insertAfter(null, null)).toBeFalsy()
    expect(insertAfter(undefined, undefined)).toBeFalsy()
    expect(insertAfter()).toBeFalsy()
  })
})

/**
 * test addClass
 */
describe('test addClass', () => {
  const addClass = adam.addClass
  test(`node is exist`, () => {
    document.body.innerHTML = `<ul id="list"><li>1</li><li>2</li><li>3</li></ul>`
    const node = document.getElementById('list')
    expect(addClass(node, '1')).toBeTruthy()
    expect(node.className).toBe('1')
    expect(addClass(node, ['2', '3'])).toBeTruthy()
    expect(node.className).toBe('1 2 3')
  })
  test(`node is not exist`, () => {
    document.body.innerHTML = `<ul id="list"><li>1</li><li>2</li><li>3</li></ul>`
    const node = document.getElementById('list')
    expect(addClass('', '')).toBeFalsy()
    expect(addClass(123, 123)).toBeFalsy()
    expect(addClass(true, true)).toBeFalsy()
    expect(addClass([], [])).toBeFalsy()
    expect(addClass(null, null)).toBeFalsy()
    expect(addClass(undefined, undefined)).toBeFalsy()
    expect(addClass()).toBeFalsy()
    expect(addClass(node, '')).toBeFalsy()
    expect(addClass(node, 123)).toBeFalsy()
    expect(addClass(node, [])).toBeFalsy()
    expect(addClass(node, true)).toBeFalsy()
    expect(addClass(node, [{}])).toBeFalsy()
    expect(addClass(node, null)).toBeFalsy()
    expect(addClass(node, undefined)).toBeFalsy()
  })
})

/**
 * test removeClass
 */
describe('test removeClass', () => {
  const removeClass = adam.removeClass
  test(`node is exist`, () => {
    document.body.innerHTML = `<ul id="list" class="1 2 3"><li>1</li><li>2</li><li>3</li></ul>`
    const node = document.getElementById('list')
    expect(node.className).toBe('1 2 3')
    expect(removeClass(node, '2')).toBeTruthy()
    expect(node.className).toBe('1 3')
    expect(removeClass(node, ['1', '3'])).toBeTruthy()
    expect(node.className).toBe('')
  })
  test(`node is not exist`, () => {
    document.body.innerHTML = `<ul id="list"><li>1</li><li>2</li><li>3</li></ul>`
    const node = document.getElementById('list')
    expect(removeClass('', '')).toBeFalsy()
    expect(removeClass(123, 123)).toBeFalsy()
    expect(removeClass(true, true)).toBeFalsy()
    expect(removeClass([], [])).toBeFalsy()
    expect(removeClass(null, null)).toBeFalsy()
    expect(removeClass(undefined, undefined)).toBeFalsy()
    expect(removeClass()).toBeFalsy()
    expect(removeClass(node, '')).toBeFalsy()
    expect(removeClass(node, 123)).toBeFalsy()
    expect(removeClass(node, true)).toBeFalsy()
    expect(removeClass(node, [{}])).toBeFalsy()
    expect(removeClass(node, null)).toBeFalsy()
    expect(removeClass(node, undefined)).toBeFalsy()
  })
})

/**
 * test getAbsoluteUrl
 */
describe('test getAbsoluteUrl', () => {
  const getAbsoluteUrl = adam.getAbsoluteUrl
  const target = window.location.href
  test(`test true`, () => {
    expect(getAbsoluteUrl('/aaa')).toBe(target + '/aaa')
  })
  test(`test false`, () => {
    expect(getAbsoluteUrl([])).toBeFalsy()
    expect(getAbsoluteUrl({})).toBeFalsy()
    expect(getAbsoluteUrl(1)).toBeFalsy()
    expect(getAbsoluteUrl(true)).toBeFalsy()
    expect(getAbsoluteUrl(null)).toBeFalsy()
    expect(getAbsoluteUrl(undefined)).toBeFalsy()
  })
})

/**
 * test debounce
 */
describe('debounce', () => {
  const debounce = adam.debounce
  test('test true', () => {
    jest.useFakeTimers() // 声明语句，启用jest伪装计时器函数，因为使用了advanceTimersByTime()
    const callback = jest.fn() // 声明语句，使用jest伪装函数
    const createDebounce = debounce(callback, 300)
    expect(callback).not.toBeCalled() // callback还未被调用
    for (let i = 0; i < 11; i++) { // 循环执行createDebounce 11次，每次都在经过299ms时setTimeout被刷新
      createDebounce()
      jest.advanceTimersByTime(299) // 过了299ms
    }
    expect(callback).not.toBeCalled() // callback还未被调用
    jest.advanceTimersByTime(1) // 再过1ms
    expect(callback).toBeCalled() // callback被调用
    expect(callback).toHaveBeenCalledTimes(1) // callback只被调用1次
  })
  test('test false', () => {
    expect(debounce(undefined, undefined)).toBeFalsy()
    expect(debounce([], [])).toBeFalsy()
    expect(debounce({}, {})).toBeFalsy()
    expect(debounce(1, 1)).toBeFalsy()
    expect(debounce(true, true)).toBeFalsy()
    expect(debounce(null, null)).toBeFalsy()
  })
})

/**
 * test throttle
 */
describe('throttle', () => {
  const throttle = adam.throttle
  test('test true', () => {
    jest.useFakeTimers() // 声明语句，启用jest伪装计时器函数，因为使用了advanceTimersByTime()
    const callback = jest.fn() // 声明语句，使用jest伪装函数
    const createThrottle = throttle(callback, 300)
    expect(callback).not.toBeCalled() // callback还未被调用
    for (let i = 0; i < 11; i++) { // 循环执行createDebounce 11次，每次的setTimeout不会被刷新
      createThrottle()
      jest.advanceTimersByTime(299) // 过了299ms
    }
    expect(callback).toBeCalled() // callback被调用
    expect(callback).toHaveBeenCalledTimes(5) // callback被调用5次
    jest.advanceTimersByTime(1) // 再过1ms
    expect(callback).toHaveBeenCalledTimes(6) // callback被调用6次
  })
  test('test false', () => {
    expect(throttle(undefined, undefined)).toBeFalsy()
    expect(throttle([], [])).toBeFalsy()
    expect(throttle({}, {})).toBeFalsy()
    expect(throttle(1, 1)).toBeFalsy()
    expect(throttle(true, true)).toBeFalsy()
    expect(throttle(null, null)).toBeFalsy()
  })
})

/**
 * test removeItemByIndex
 */
describe('removeItemByIndex', () => {
  const removeItemByIndex = adam.removeItemByIndex
  test('test true', () => {
    expect(removeItemByIndex(1, [1, 2, 3])).toEqual([1, 3])
  })
  test('test false', () => {
    expect(removeItemByIndex(undefined, undefined)).toBeFalsy()
    expect(removeItemByIndex([], [])).toBeFalsy()
    expect(removeItemByIndex({}, {})).toBeFalsy()
    expect(removeItemByIndex(1, 1)).toBeFalsy()
    expect(removeItemByIndex(true, true)).toBeFalsy()
    expect(removeItemByIndex(null, null)).toBeFalsy()
    expect(removeItemByIndex('1', [1, 2, 3])).toBeFalsy()
  })
})
