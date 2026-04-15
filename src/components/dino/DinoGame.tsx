import { useEffect, useRef } from "react";
import { Runner } from "./offline";
import "./runner.css";

const CONTAINER_ID = "dino-container";

function ensureDom() {
  // 스프라이트 리소스 (Runner.loadImages가 id로 찾음)
  if (!document.getElementById("offline-resources")) {
    const resDiv = document.createElement("div");
    resDiv.id = "offline-resources";
    resDiv.style.display = "none";

    const img1x = document.createElement("img");
    img1x.id = "offline-resources-1x";
    img1x.src = "/100-offline-sprite.png";
    resDiv.appendChild(img1x);

    const img2x = document.createElement("img");
    img2x.id = "offline-resources-2x";
    img2x.src = "/200-offline-sprite.png";
    resDiv.appendChild(img2x);

    document.body.appendChild(resDiv);
  }

  // Runner.init()가 .icon-offline 엘리먼트를 assert로 요구
  if (!document.querySelector(".icon-offline")) {
    const icon = document.createElement("div");
    icon.className = "icon icon-offline";
    icon.style.display = "none";
    document.body.appendChild(icon);
  }
}

interface DinoGameProps {
  /** Safari 창이 활성 상태인가 — false면 게임 일시정지 */
  isActive: boolean;
}

export function DinoGame({ isActive }: DinoGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Runner 초기화 (mount 시 1회)
  useEffect(() => {
    ensureDom();
    try {
      Runner.getInstance();
    } catch {
      Runner.initializeInstance(`#${CONTAINER_ID}`);
    }
  }, []);

  // 활성/비활성 상태에 따라 pause/resume
  useEffect(() => {
    let runner: Runner;
    try {
      runner = Runner.getInstance();
    } catch {
      return;
    }
    if (isActive) {
      runner.play();
    } else {
      runner.stop();
    }
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      id={CONTAINER_ID}
      className="relative mx-auto h-[150px] w-full max-w-[600px]"
    />
  );
}
