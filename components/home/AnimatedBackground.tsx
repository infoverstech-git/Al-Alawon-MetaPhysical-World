"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  gold: boolean;
}

interface Glow {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  hue: "gold" | "emerald";
}

interface DataGlyph {
  x: number;
  y: number;
  label: string;
  opacity: number;
  phase: number;
}

const GLYPH_LABELS = ["0.4", "1.0", "0.7", "0.2", "0.9", "0.3"];

/** Normalized (0–1) skeletal joint layout for the holographic figure. */
const JOINTS = {
  head: [0.5, 0.1],
  neck: [0.5, 0.18],
  chest: [0.5, 0.29],
  waist: [0.5, 0.43],
  leftShoulder: [0.37, 0.2],
  rightShoulder: [0.63, 0.2],
  leftElbow: [0.3, 0.34],
  rightElbow: [0.7, 0.34],
  leftWrist: [0.26, 0.47],
  rightWrist: [0.74, 0.47],
  leftHip: [0.43, 0.44],
  rightHip: [0.57, 0.44],
  leftKnee: [0.4, 0.64],
  rightKnee: [0.6, 0.64],
  leftAnkle: [0.38, 0.84],
  rightAnkle: [0.62, 0.84],
} as const;

const BONES: [keyof typeof JOINTS, keyof typeof JOINTS][] = [
  ["neck", "head"],
  ["neck", "chest"],
  ["chest", "leftShoulder"],
  ["chest", "rightShoulder"],
  ["leftShoulder", "leftElbow"],
  ["leftElbow", "leftWrist"],
  ["rightShoulder", "rightElbow"],
  ["rightElbow", "rightWrist"],
  ["chest", "waist"],
  ["waist", "leftHip"],
  ["waist", "rightHip"],
  ["leftHip", "leftKnee"],
  ["leftKnee", "leftAnkle"],
  ["rightHip", "rightKnee"],
  ["rightKnee", "rightAnkle"],
];

/**
 * Original canvas animation: a holographic, constellation-style figure
 * built from glowing nodes and connecting lines, drifting amid ambient
 * particles — evoking a "data body" aesthetic in the site's own
 * emerald/gold palette. No external assets, images or video are used.
 * Freezes on a single static frame when reduced motion is requested.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let glows: Glow[] = [];
    let dataGlyphs: DataGlyph[] = [];
    let animationFrame: number;
    let t = 0;

    function resize() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      width = canvasEl.clientWidth;
      height = canvasEl.clientHeight;
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((width * height) / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.5,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08,
        opacity: Math.random() * 0.45 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.2,
      }));

      glows = [
        { x: width * 0.5, y: height * 0.35, radius: Math.max(width, height) * 0.4, speedX: 0.04, speedY: 0.02, hue: "emerald" },
      ];

      const glyphCount = Math.min(14, Math.floor((width * height) / 55000));
      dataGlyphs = Array.from({ length: glyphCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        label: GLYPH_LABELS[Math.floor(Math.random() * GLYPH_LABELS.length)],
        opacity: Math.random() * 0.15 + 0.08,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function drawGlow(g: Glow) {
      const color = g.hue === "gold" ? "201, 162, 39" : "30, 100, 78";
      const gradient = ctx!.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.radius);
      gradient.addColorStop(0, `rgba(${color}, 0.18)`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, width, height);
    }

    function drawFigure(time: number) {
      const figH = height * 0.62;
      const figW = figH * 0.55;
      const originX = width / 2;
      const originY = height * 0.14;
      const sway = Math.sin(time * 0.0006) * 6;
      const breathe = 1 + Math.sin(time * 0.0012) * 0.01;

      const points: Record<string, [number, number]> = {};
      for (const key of Object.keys(JOINTS) as (keyof typeof JOINTS)[]) {
        const [nx, ny] = JOINTS[key];
        points[key] = [
          originX + (nx - 0.5) * figW * breathe + sway,
          originY + ny * figH,
        ];
      }

      // Soft silhouette glow behind the figure — gives it "body" presence
      const bodyGradient = ctx!.createRadialGradient(
        originX + sway,
        originY + figH * 0.4,
        0,
        originX + sway,
        originY + figH * 0.4,
        figH * 0.42
      );
      bodyGradient.addColorStop(0, "rgba(30, 100, 78, 0.28)");
      bodyGradient.addColorStop(1, "rgba(30, 100, 78, 0)");
      ctx!.fillStyle = bodyGradient;
      ctx!.fillRect(0, 0, width, height);

      // Horizontal hologram scan line, sweeping through the figure
      const scanY = originY + ((Math.sin(time * 0.0009) + 1) / 2) * figH;
      const scanGradient = ctx!.createLinearGradient(originX - figW, scanY, originX + figW, scanY);
      scanGradient.addColorStop(0, "rgba(201, 162, 39, 0)");
      scanGradient.addColorStop(0.5, "rgba(201, 162, 39, 0.35)");
      scanGradient.addColorStop(1, "rgba(201, 162, 39, 0)");
      ctx!.fillStyle = scanGradient;
      ctx!.fillRect(originX - figW, scanY - 1, figW * 2, 2);

      // Bones — thin glowing gold lines
      ctx!.lineWidth = 1.4;
      ctx!.strokeStyle = "rgba(201, 162, 39, 0.55)";
      ctx!.shadowColor = "rgba(201, 162, 39, 0.6)";
      ctx!.shadowBlur = 7;
      for (const [a, b] of BONES) {
        ctx!.beginPath();
        ctx!.moveTo(points[a][0], points[a][1]);
        ctx!.lineTo(points[b][0], points[b][1]);
        ctx!.stroke();
      }
      ctx!.shadowBlur = 0;

      // Joints — pulsing ivory nodes
      for (const key of Object.keys(points)) {
        const [px, py] = points[key];
        const pulse = 0.6 + 0.4 * Math.sin(time * 0.003 + px * 0.05);
        ctx!.beginPath();
        ctx!.arc(px, py, key === "head" ? 6 : 2.8, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(241, 247, 244, ${0.55 + pulse * 0.4})`;
        ctx!.fill();
      }

      // Head — soft glowing ring
      const [hx, hy] = points.head;
      ctx!.beginPath();
      ctx!.arc(hx, hy, 11, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(201, 162, 39, 0.5)";
      ctx!.lineWidth = 1.5;
      ctx!.stroke();
    }

    function drawDataGlyphs(time: number) {
      ctx!.font = "10px monospace";
      for (const g of dataGlyphs) {
        const drift = Math.sin(time * 0.0004 + g.phase) * 6;
        ctx!.fillStyle = `rgba(199, 214, 207, ${g.opacity})`;
        ctx!.fillText(g.label, g.x, g.y + drift);
      }
    }

    function drawParticle(p: Particle, alpha: number) {
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = p.gold ? `rgba(221, 192, 106, ${alpha})` : `rgba(241, 247, 244, ${alpha})`;
      ctx!.fill();
    }

    function drawConstellationLines() {
      ctx!.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx!.strokeStyle = `rgba(199, 214, 207, ${0.12 * (1 - dist / 110)})`;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const g of glows) drawGlow(g);
      drawConstellationLines();
      for (const p of particles) drawParticle(p, p.opacity);
      drawFigure(0);
      drawDataGlyphs(0);
    }

    function tick(time: number) {
      ctx!.clearRect(0, 0, width, height);
      t = time;

      for (const g of glows) {
        g.x += g.speedX;
        g.y += g.speedY;
        if (g.x < -g.radius * 0.3 || g.x > width + g.radius * 0.3) g.speedX *= -1;
        if (g.y < -g.radius * 0.3 || g.y > height + g.radius * 0.3) g.speedY *= -1;
        drawGlow(g);
      }

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.twinklePhase += p.twinkleSpeed;
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;
      }

      drawConstellationLines();
      for (const p of particles) {
        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        drawParticle(p, p.opacity * (0.55 + twinkle * 0.45));
      }

      drawFigure(t);
      drawDataGlyphs(t);
      animationFrame = requestAnimationFrame(tick);
    }

    resize();
    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animationFrame = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
