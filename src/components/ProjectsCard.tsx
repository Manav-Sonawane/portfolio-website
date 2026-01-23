"use client";

import { useState } from "react";
import styled from "styled-components";

type Project = {
  title: string;
  tagline: string;
  tech: string[];
  role: string;
  highlights: string[];
  github: string;
  live?: string;
};

export default function ProjectCard({
  title,
  tagline,
  tech,
  role,
  highlights,
  github,
  live,
}: Project) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <StyledWrapper>
      <div className="card" onClick={handleCardClick}>
        <div className={`content ${isFlipped ? "flipped" : ""}`}>
          <div
            className="back"
            style={{ pointerEvents: isFlipped ? "none" : "auto" }}
          >
            <div className="img">
              <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>
            <div className="back-content">
              <small className="badge">{role}</small>
              <div className="description">
                <div className="title">
                  <p className="title">
                    <strong>{title}</strong>
                  </p>
                </div>
                <p className="tagline">{tagline}</p>
                <ul className="tech-stack">
                  {tech.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div
            className="front"
            style={{ pointerEvents: isFlipped ? "auto" : "none" }}
          >
            <div className="front-content">
              <div className="front-header">
                <strong>What I Built</strong>
              </div>
              <div className="highlights">
                <ul>
                  {highlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="links">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn"
                  onClick={handleLinkClick}
                >
                  GitHub →
                </a>
                {live && (
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn"
                    onClick={handleLinkClick}
                  >
                    Live →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 320px;
    height: 420px;
    cursor: pointer;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
  }

  .content.flipped {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }

  .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .back .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .back .back-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }

  .back .badge {
    background-color: #22c55e22;
    padding: 6px 16px;
    border-radius: 4px;
    backdrop-filter: blur(2px);
    width: fit-content;
    font-size: 12px;
    color: #22c55e;
    border: 1px solid #22c55e44;
  }

  .back .description {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 16px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
  }

  .back .title {
    font-size: 24px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .back .title p {
    width: 100%;
    color: #fff;
    font-weight: 700;
  }

  .back .tagline {
    color: #d1d5db;
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.6;
  }

  .back .tech-stack {
    color: #22c55e;
    margin-top: 12px;
    font-size: 14px;
    font-family: monospace;
    line-height: 1.8;
    list-style: none;
    padding: 0;
  }

  .back .tech-stack li {
    margin-bottom: 6px;
    padding-left: 16px;
    position: relative;
  }

  .back .tech-stack li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #22c55e;
    font-weight: bold;
    font-size: 16px;
  }

  .front {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
    transform: rotateY(180deg);
    color: white;
  }

  .front::before {
    position: absolute;
    content: " ";
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      #22c55e,
      #22c55e,
      #22c55e,
      #22c55e,
      transparent
    );
    animation: rotation_481 5000ms infinite linear;
    pointer-events: none;
  }

  .front .front-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
    z-index: 1;
  }

  .front-header {
    font-size: 16px;
    color: #22c55e;
    font-weight: 600;
    border-bottom: 1px solid #22c55e33;
    width: 100%;
    padding-bottom: 10px;
  }

  .highlights {
    flex: 1;
    overflow-y: auto;
    width: 100%;
  }

  .highlights ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    color: #d1d5db;
  }

  .highlights li {
    margin-bottom: 10px;
    padding-left: 16px;
    position: relative;
  }

  .highlights li::before {
    content: "›";
    position: absolute;
    left: 0;
    color: #22c55e;
    font-weight: bold;
  }

  .links {
    display: flex;
    gap: 8px;
    width: 100%;
    position: relative;
    z-index: 100;
  }

  .link-btn {
    flex: 1;
    padding: 8px 16px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #22c55e;
    border-radius: 4px;
    color: #22c55e;
    text-decoration: none;
    transition: all 0.2s;
    background-color: transparent;
    cursor: pointer;
    position: relative;
    z-index: 10;
  }

  .link-btn:hover {
    background-color: #22c55e;
    color: #151515;
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #22c55e;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
    opacity: 0.3;
  }

  #bottom {
    background-color: #16a34a;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
    opacity: 0.2;
  }

  #right {
    background-color: #15803d;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
    opacity: 0.4;
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(10px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`;
