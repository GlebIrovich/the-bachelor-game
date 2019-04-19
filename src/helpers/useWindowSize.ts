export const useWindowSize = () => {
  if (window) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  return {
    width: 300,
    height: 200,
  }
}