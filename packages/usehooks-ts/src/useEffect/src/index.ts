import { useEffect as useEffectReact } from 'react'

import type { DependencyList, EffectCallback } from 'react'

import { useIsFirstRender } from '../../useIsFirstRender/src'

function useEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()

  useEffectReact(() => {
    if (!isFirst) {
      return effect()
    }
  }, deps)
}

export { useEffect }
