import { useEffect } from "react";

/** Progressive enhancement: content remains visible if motion is unavailable. */
export function useLandingEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let dispose = () => {};
    const revealed = new WeakSet<Element>();

    function setup() {
      dispose();
      if (reducedMotion.matches) return;
      const cleanups: (() => void)[] = [];
      const process = document.querySelector<HTMLElement>(".process-section");
      if (process && "IntersectionObserver" in window) {
        process.classList.add("process-reveal");
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              process.classList.add("process-visible");
              observer.disconnect();
            }
          },
          { threshold: 0.12 },
        );
        observer.observe(process);
        cleanups.push(() => {
          observer.disconnect();
          process.classList.remove("process-reveal", "process-visible");
        });
      }

      if ("IntersectionObserver" in window) {
        const targets = Array.from(
          document.querySelectorAll<HTMLElement>(
            "#cases > .section-heading, #cases .case-card, .cases-note, #pricing > .section-heading, .prices, .pricing-note, .faq, .contact, .footer-top, .footer-wordmark",
          ),
        );
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              revealed.add(entry.target);
              entry.target.classList.add("reveal-visible");
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0, rootMargin: "0px 0px -24px 0px" },
        );
        const showOnFocus = (event: FocusEvent) => {
          const target = (event.target as HTMLElement).closest(".reveal-ready");
          if (!target) return;
          revealed.add(target);
          target.classList.add("reveal-visible");
          observer.unobserve(target);
        };
        targets.forEach((target) => {
          // Never hide content already in view or revisited via an anchor.
          if (
            revealed.has(target) ||
            target.getBoundingClientRect().top < window.innerHeight
          ) {
            revealed.add(target);
            return;
          }
          target.classList.add("reveal-ready");
          observer.observe(target);
        });
        document.addEventListener("focusin", showOnFocus);
        cleanups.push(() => {
          observer.disconnect();
          document.removeEventListener("focusin", showOnFocus);
          targets.forEach((target) =>
            target.classList.remove("reveal-ready", "reveal-visible"),
          );
        });
      }
      if (finePointer.matches) {
        document
          .querySelectorAll<HTMLElement>(
            ".price, .solution-panel, .process-section, .contact",
          )
          .forEach((card) => {
            let frame = 0;
            let x = 0;
            let y = 0;
            const move = (event: PointerEvent) => {
              if (event.pointerType === "touch") return;
              const bounds = card.getBoundingClientRect();
              x = event.clientX - bounds.left;
              y = event.clientY - bounds.top;
              if (frame) return;
              frame = requestAnimationFrame(() => {
                card.style.setProperty("--spot-x", `${x}px`);
                card.style.setProperty("--spot-y", `${y}px`);
                card.classList.add("spotlight-active");
                frame = 0;
              });
            };
            const leave = () => {
              cancelAnimationFrame(frame);
              frame = 0;
              card.classList.remove("spotlight-active");
            };
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);
            card.addEventListener("pointercancel", leave);
            cleanups.push(() => {
              leave();
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", leave);
              card.removeEventListener("pointercancel", leave);
              card.style.removeProperty("--spot-x");
              card.style.removeProperty("--spot-y");
            });
          });
      }
      dispose = () => cleanups.forEach((cleanup) => cleanup());
    }
    setup();
    reducedMotion.addEventListener("change", setup);
    finePointer.addEventListener("change", setup);
    return () => {
      dispose();
      reducedMotion.removeEventListener("change", setup);
      finePointer.removeEventListener("change", setup);
    };
  }, []);
}
