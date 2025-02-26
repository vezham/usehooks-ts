import { act, renderHook } from '@testing-library/react'

import { useCopyToClipboard } from './useCopyToClipboard'

describe('useCopyToClipboard()', () => {
  const originalClipboard = { ...global.navigator.clipboard }
  const mockData = 'Test value'

  beforeEach(() => {
    const mockClipboard = {
      writeText: vitest.fn(),
    }
    // @ts-ignore mock clipboard
    global.navigator.clipboard = mockClipboard
  })

  afterEach(() => {
    vitest.resetAllMocks()
    // @ts-ignore mock clipboard
    global.navigator.clipboard = originalClipboard
  })

  it('should use clipboard', () => {
    const { result } = renderHook(() => useCopyToClipboard())

    expect(result.current.value).toBe(null)
    expect(typeof result.current.copy).toBe('function')
    expect(typeof result.current.copyWithToast).toBe('function')
  })

  it('should copy to the clipboard and the state', async () => {
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current.copy(mockData)
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData)
    expect(result.current.value).toBe(mockData)
  })

  it('should copy to the clipboard and the state - copyWithToast', async () => {
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current.copyWithToast(mockData)
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData)
    expect(result.current.value).toBe(mockData)
  })
})
