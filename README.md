# Adamjs

- a wrapper function package
- npm-url:[npm](https://www.npmjs.com/package/adamjs)
- git-url:[github](https://github.com/wonghan/adamjs)
<br>
<br>

## Installation

You can install with npm:

```
$ npm install adamjs
```
<br>

## Usage

```
import adam from 'adamjs'
```
<br>

## Function
### query(name, querystring)
- Function for gets the value of the specified name in the specified querystring
```
adam.query('name', '?name=js') //return 'js'
```
<br>

### serialize(data)
- Function for turn the object into a url string
```
adam.serialize({hello: 'js'}) //return '?hello=js'
```
<br>

### $(selector)
- Function for simulating jQuery
```
adam.$(selector) //return {DOM|undefined}
```
<br>

### removeNode(node)
- Function for Deleting DOM node
```
adam.removeNode(node) //return {DOM}
```
<br>

### insertAfter(node)
- Function for inserting the node node after the target node
```
adam.insertAfter(node, target) //return true or false
```
<br>

### addClass(node, className)
- Function for add class name
```
adam.addClass(node, className) //return true or false
```
<br>

### removeClass(node, className)
- Function for remove class name
```
adam.removeClass(node, className) //return true or false
```
<br>

### getAbsoluteUrl(url)
- Function for get absolute url
```
adam.getAbsoluteUrl('/hhh') //return 'https://github.com/hhh'
```
<br>

### debounce(callback, time)
- Function for avoiding shake
- example:
```
 test('test true', () => {
    const debounce = adam.debounce
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
```
<br>

### throttle (callback, time)
- Function for timer
- example:
```
test('test true', () => {
    const throttle = adam.throttle
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
```
<br>

### removeItemByIndex(index, arr)
- Function for remove item by index
```
adam.removeItemByIndex(1, [1, 2, 3]) //return [1, 3]
```
