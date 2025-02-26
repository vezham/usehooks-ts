import { renderHook } from '@testing-library/react'
import { describe, expect, it, vitest } from 'vitest'

import { useEffect } from '../src'

describe('useEffect', () => {
  it('should initialize', () => {
    const { result } = renderHook(() => {
      useEffect(vitest.fn())
    })

    expect(result.current).not.toBeTruthy()
  })

  it('the callback function should have been called on update', () => {
    const effect = vitest.fn()
    const { rerender } = renderHook(() => {
      useEffect(effect)
    })

    expect(effect).not.toHaveBeenCalled()

    rerender()

    expect(effect).toHaveBeenCalledTimes(1)
  })
})
