import { useLayoutEffect, useEffect } from "react";

/**
 * return either useLayoutEffect or useEffect
 * depend on environment is server or client
 *
 * This is used to suppress warning from nextjs, the
 * warning that useLayoutEffect does nothing on the server,
 * because its effect cannot be encoded into the server renderer’s output format
 */
const useIsomorphicEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;
