
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsCapacitor() {
  const [isCapacitor, setIsCapacitor] = React.useState(false)
  
  React.useEffect(() => {
    // Check if running in Capacitor environment
    const isCapApp = window.Capacitor && window.Capacitor.isNativePlatform()
    setIsCapacitor(!!isCapApp)
  }, [])
  
  return isCapacitor
}

export function useDevice() {
  const isMobile = useIsMobile()
  const isCapacitor = useIsCapacitor()
  
  return {
    isMobile,
    isCapacitor,
    isNative: isCapacitor,
    isBrowser: !isCapacitor,
    isDesktop: !isMobile
  }
}
