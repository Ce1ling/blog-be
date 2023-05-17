/**
 * 判断 `origin` 是否全部都是 `target` 类型
 * @param {any|any[]} origin 可以是 `target` 支持的所有类型, 也可以是一个数组.
 * 如果是一个数组则会校验所有元素是否为 `target` 类型
 * @param {'number'|'string'|'boolean'|'null'|'undefined'|'function'|'array'|'object'} target 
 * 目标类型, 仅支持: `'number'`|`'string'`|`'boolean'`|`'null'`|`'undefined'`|`'function'`|`'array'`|`'object'`
 * @retrun 返回 `true` 则代表全部是 `target` 类型, `false` 则并非全都是.
 */
const isTargetType = (origin, target) => {
  /** `isTargetType` 的核心函数 */
  const handleType = (o, t) => {
    // 基本类型(function 也会在这处理)
    if (typeof o !== 'object') {
      return typeof o === t
    }
  
    // 数组
    if (Array.isArray(o)) {
      return t === 'array'
    }
  
    // 对象
    if (o instanceof Object) {
      return t === 'object'
    }
  
    // 排除以上类型后就仅剩下 null 了
    return (o === null) && t === 'null'
  }

  if (Array.isArray(origin)) {
    for (const item of origin) {
      // 如果存在为 false 的元素则直接中断并返回
      const result = handleType(item, target)
      if (!result) { return result }
    }
    return true
  }

  return handleType(origin, target)
}



module.exports = {
  isTargetType
}