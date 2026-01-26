import { useEffect, useMemo, useState } from "react";

export function useTyping(
  text: string,
  {
    speed = 70, // ms por caracter
    startDelay = 250, // ms antes de comenzar
    enabled = true,
  }: { speed?: number; startDelay?: number; enabled?: boolean } = {}
) {
  const [value, setValue] = useState("");

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // si reduce motion, muestra todo de una vez
    if (reduceMotion) {
      setValue(text);
      return;
    }

    let i = 0;
    let t1: number | undefined;
    let t2: number | undefined;

    setValue("");

    t1 = window.setTimeout(() => {
      t2 = window.setInterval(() => {
        i += 1;
        setValue(text.slice(0, i));
        if (i >= text.length && t2) window.clearInterval(t2);
      }, speed);
    }, startDelay);

    return () => {
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearInterval(t2);
    };
  }, [text, speed, startDelay, enabled, reduceMotion]);

  const done = value.length === text.length;

  return { value, done, reduceMotion };
}
