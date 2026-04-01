import gsap from "gsap";
import { prefersReducedMotion } from "./utils";

interface FlipOptions {
  duration?: number;
  ease?: string;
  stagger?: number | gsap.StaggerVars;
  onComplete?: () => void;
}

export function flipAnimate(
  elements: Element | Element[],
  props: gsap.TweenVars,
  options: FlipOptions = {}
) {
  if (prefersReducedMotion()) return;

  const els = Array.isArray(elements) ? elements : [elements];
  const { duration = 1.2, ease = "expo.out", stagger, onComplete } = options;

  const tweenVars: gsap.TweenVars = {
    ...props,
    duration,
    ease,
    ...(stagger ? { stagger } : {}),
    onComplete,
  };

  return gsap.fromTo(els, props.from ?? {}, tweenVars);
}

export function createMorphTransition(
  fromEl: HTMLElement,
  toEl: HTMLElement,
  options: {
    duration?: number;
    ease?: string;
    onComplete?: () => void;
  } = {}
) {
  if (prefersReducedMotion()) return;

  const { duration = 1.4, ease = "expo.inOut", onComplete } = options;

  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();

  const scaleX = fromRect.width / toRect.width;
  const scaleY = fromRect.height / toRect.height;
  const translateX = fromRect.left - toRect.left;
  const translateY = fromRect.top - toRect.top;

  gsap.set(toEl, {
    clipPath: "inset(0 0 0 0)",
    transformOrigin: "top left",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(toEl, { clearProps: "all" });
      onComplete?.();
    },
  });

  tl.fromTo(
    toEl,
    {
      scaleX,
      scaleY,
      x: translateX,
      y: translateY,
      opacity: 0,
    },
    {
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      opacity: 1,
      duration,
      ease,
    }
  );

  return tl;
}
