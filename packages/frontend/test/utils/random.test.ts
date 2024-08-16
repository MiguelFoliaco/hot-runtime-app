import { expect, test } from 'vitest'
import { random } from '../../src/utils/random'

test('test function random', () => {
    const randomItem = random(1, 1000)
    expect(random(1, 1000)).toBe(randomItem)
})