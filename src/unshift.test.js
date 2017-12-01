import unshift from './unshift'

describe('unshift', () => {
  const getOp = value => {
    const changeValue = jest.fn()
    unshift(['foo', value], {}, { changeValue })
    return changeValue.mock.calls[0][2]
  }

  it('should call changeValue once', () => {
    const changeValue = jest.fn()
    const state = {}
    const result = unshift(['foo', 'bar'], state, { changeValue })
    expect(result).toBeUndefined()
    expect(changeValue).toHaveBeenCalled()
    expect(changeValue).toHaveBeenCalledTimes(1)
    expect(changeValue.mock.calls[0][0]).toBe(state)
    expect(changeValue.mock.calls[0][1]).toBe('foo')
    expect(typeof changeValue.mock.calls[0][2]).toBe('function')
  })

  it('should turn undefined into an array with one value', () => {
    const op = getOp('bar')
    const result = op(undefined)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(1)
    expect(result[0]).toBe('bar')
  })

  it('should insert value to beginning of array', () => {
    const op = getOp('d')
    const result = op(['a', 'b', 'c'])
    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(['d', 'a', 'b', 'c'])
  })
})
