"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const FRAME_WIDTH = 180;
const FRAME_HEIGHT = Math.round((FRAME_WIDTH * 760) / 625);
const CURSOR_OFFSET = 20;
const VIEWPORT_EDGE = 8;
const TILT_DEG = 6;
const HOLD_MS = 2800;
const FADE_MS = 450;
const SHUTTER_SRC = "/click-reveal/shutter.mp3";

type Position = { x: number; y: number };
type Size = { width: number; height: number };
type SnapPhase = "in" | "shown" | "out";
type Snap = {
  placed: Position;
  tilt: number;
  phase: SnapPhase;
};

type ClickRevealProps = {
  image: string;
  alt: string;
  caption: string;
  children: ReactNode;
  className?: string;
};

function placeAboveRight(cursor: Position, { width, height }: Size): Position {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let x = cursor.x + CURSOR_OFFSET;
  let y = cursor.y - CURSOR_OFFSET - height;

  if (x + width > vw - VIEWPORT_EDGE) {
    x = cursor.x - CURSOR_OFFSET - width;
  }

  if (y < VIEWPORT_EDGE) {
    y = cursor.y + CURSOR_OFFSET;
  }

  x = Math.min(Math.max(x, VIEWPORT_EDGE), vw - VIEWPORT_EDGE - width);
  y = Math.min(Math.max(y, VIEWPORT_EDGE), vh - VIEWPORT_EDGE - height);

  return { x, y };
}

function pickTilt(): number {
  return Math.random() < 0.5 ? -TILT_DEG : TILT_DEG;
}

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function snapStyle(
  placed: Position,
  tilt: number,
  phase: SnapPhase,
): CSSProperties {
  return {
    left: placed.x,
    top: placed.y,
    transform: `rotate(${tilt}deg)`,
    opacity: phase === "shown" ? 1 : 0,
  };
}

export function ClickReveal({
  image,
  alt,
  caption,
  children,
  className,
}: ClickRevealProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const holdTimerRef = useRef<number | null>(null);

  const [snap, setSnap] = useState<Snap | null>(null);
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const showSnap = snap !== null;
  const isFadingOut = snap?.phase === "out";

  function clearHoldTimer() {
    if (holdTimerRef.current === null) return;
    window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
  }

  function beginDismiss() {
    clearHoldTimer();
    setSnap((current) => {
      if (!current || current.phase === "out") return current;
      return { ...current, phase: "out" };
    });
  }

  function ensureAudio() {
    if (audioRef.current) return;
    audioRef.current = new Audio(SHUTTER_SRC);
    audioRef.current.preload = "auto";
  }

  function playShutter() {
    ensureAudio();
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }

  function takeSnap(cursor: Position) {
    clearHoldTimer();
    playShutter();

    const placed = placeAboveRight(cursor, {
      width: FRAME_WIDTH,
      height: FRAME_HEIGHT,
    });

    setSnap({
      placed,
      tilt: pickTilt(),
      phase: "in",
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSnap((current) =>
          current && current.phase === "in"
            ? { ...current, phase: "shown" }
            : current,
        );
      });
    });

    holdTimerRef.current = window.setTimeout(() => {
      holdTimerRef.current = null;
      beginDismiss();
    }, HOLD_MS);
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const isKeyboardActivation = event.detail === 0;
    if (isKeyboardActivation) {
      const rect = event.currentTarget.getBoundingClientRect();
      takeSnap({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      return;
    }
    takeSnap({ x: event.clientX, y: event.clientY });
  }

  useEffect(() => {
    if (!showSnap) return;

    function dismiss() {
      if (holdTimerRef.current !== null) {
        window.clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      setSnap((current) => {
        if (!current || current.phase === "out") return current;
        return { ...current, phase: "out" };
      });
    }

    window.addEventListener("scroll", dismiss, {
      capture: true,
      passive: true,
    });
    document.addEventListener("pointerdown", dismiss, { capture: true });

    return () => {
      window.removeEventListener("scroll", dismiss, true);
      document.removeEventListener("pointerdown", dismiss, true);
    };
  }, [showSnap]);

  useEffect(() => {
    if (!isFadingOut) return;

    const fadeTimer = window.setTimeout(() => {
      setSnap(null);
    }, FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
    };
  }, [isFadingOut]);

  useEffect(() => {
    return () => {
      clearHoldTimer();
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={`Snap a photo: ${alt}`}
      className={cn(
        "cursor-pointer motion-safe:transition-transform motion-safe:duration-300 motion-safe:pointer-fine:active:scale-[0.98] motion-safe:pointer-fine:active:duration-0",
        className,
      )}
      onClick={handleClick}
    >
      {children}
      {showSnap &&
        isClient &&
        createPortal(
          <span
            aria-hidden
            className="pointer-events-none fixed z-50 motion-safe:transition-opacity motion-safe:duration-500"
            style={snapStyle(snap.placed, snap.tilt, snap.phase)}
          >
            <span
              className="relative block shadow-xl"
              style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT }}
            >
              <span className="bg-brand-foreground absolute inset-[5%_4.8%_19.1%_4.6%] overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes={`${FRAME_WIDTH * 2}px`}
                  quality={92}
                  className="object-cover"
                  style={{
                    filter: "sepia(0.12) contrast(1.04) saturate(0.95)",
                  }}
                />
              </span>
              <Image
                src="/click-reveal/frame.png"
                alt=""
                width={FRAME_WIDTH * 2}
                height={FRAME_HEIGHT * 2}
                quality={92}
                className="relative z-10 block h-full w-full"
              />
              <span className="font-label text-brand absolute inset-x-[8%] bottom-[5%] z-20 text-center text-xs font-medium tracking-widest">
                {caption}
              </span>
            </span>
          </span>,
          document.body,
        )}
    </button>
  );
}
