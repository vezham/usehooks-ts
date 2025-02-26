import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useIsFirstRender } from '../src'

describe('useIsFirstRender', () => {
  it('should initialize', () => {
    const { result } = renderHook(() => useIsFirstRender())

    expect(result.current).toBe(true)
  })

  it('should return true at the first render, next false', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender())

    expect(result.current).toBe(true)

    rerender()

    expect(result.current).toBe(false)
  })
})
