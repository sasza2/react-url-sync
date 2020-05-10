import { Type } from '.'
import { parse } from './UrlSync'

test('parse string', () => {
  const obj = parse('a=5&b=1,2,3')
  expect(obj).toEqual({ a: '5', b: ['1', '2', '3']})
})

test('parse string with specified type', () => {
  const obj = parse('a=5&b=1,2,3', {
    a: Type.Int,
    b: Type.Array(Type.Int),
  })
  expect(obj).toEqual({ a: 5, b: [1, 2, 3]})
})

test('parse object', () => {
  const obj = parse({ a: 5, b: 'abcdef' })
  expect(obj).toEqual({ a: 5, b: 'abcdef' })
})

test('parse object with specified type', () => {
  const obj = parse({ a: '5', b: '444.1' }, { a: Type.Int, b: Type.Float })
  expect(obj).toEqual({ a: 5, b: 444.1 })
})
