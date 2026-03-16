import React, { useState } from "react";
import "./App.css";

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const images = [
  "/imagen1.jpeg", "/imagen2.jpeg", "/imagen3.jpeg",
  "/imagen4.jpeg", "/imagen5.jpeg", "/imagen6.jpeg",
  "/imagen7.jpeg", "/imagen8.jpeg",
];

function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  // Navegación con teclado dentro del modal
  const handleKey = (e) => {
    if (!modalOpen) return;
    if (e.key === "ArrowLeft")  prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape")     setModalOpen(false);
  };

  return (
    <>
      <div className="carousel-card">
        <h2 className="carousel-title">📸 Fotos del Curso</h2>
        <div className="carousel-wrapper">
          <button className="carousel-btn left" onClick={prev}>&#8592;</button>
          <img
            src={images[current]}
            alt={`Foto ${current + 1}`}
            className="carousel-img"
            onClick={() => setModalOpen(true)}
            title="Clic para ampliar"
          />
          <button className="carousel-btn right" onClick={next}>&#8594;</button>
        </div>
        <p className="carousel-counter">{current + 1} / {images.length}</p>
        <div className="carousel-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setModalOpen(false)}
          onKeyDown={handleKey}
          tabIndex={0}
          autoFocus
        >
          {/* Evita que los botones cierren el modal */}
          <button
            className="modal-btn left"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >&#8592;</button>

          <img
            src={images[current]}
            alt={`Foto ${current + 1}`}
            className="modal-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="modal-btn right"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >&#8594;</button>

          {/* Botón cerrar */}
          <button
            className="modal-close"
            onClick={() => setModalOpen(false)}
          >✕</button>

          <p className="modal-counter">{current + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <div className="page-bg">
      <div className="two-col">

        {/* ── Columna izquierda: tarjeta + carrusel ── */}
        <div className="col-left">
          <div className="cert-card">
            <div className="top-row">
              <div className="badge-circle">
                <svg viewBox="0 0 36 36" fill="none" className="badge-svg">
                  <circle cx="18" cy="14" r="7" stroke="#c8a84b" strokeWidth="1.5"/>
                  <path d="M11 22 L7 32 L18 27 L29 32 L25 22" stroke="#c8a84b" strokeWidth="1.5"/>
                  <path d="M15 14 L17 16 L21 12" stroke="#c8a84b" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="info-block">
                <p className="completed-by">En curso </p>
                <h1 className="name">RIVAS BETANCOURT<br />CRISTIAN PAUL</h1>
                <p className="meta">Fecha: 28-02-2026</p>
                <p className="meta bold">Con una duración de 90 horas</p>
                <p className="desc">
                  Participación de Rivas Betancourt Cristian Paul
                  en el curso de <strong>Ensamblaje y mantenimiento de equipos de
                  computación</strong>, iniciado el 28 de febrero de 2026.
                </p>
              </div>
            </div>
            <div className="ministry-row">
              <img
                src="/alcaldia-lago-agrio.png"
                alt="Alcaldía Lago Agrio"
                className="ministry-logo"
              />
              <span className="ministry-label">Alcaldía Lago Agrio — SECAP</span>
            </div>
          </div>

          {/* ── Carrusel de fotos ── */}
          <ImageCarousel />
        </div>

        {/* ── Columna derecha: PDF ── */}
        <div className="col-right">
          <h2 className="pdf-title">Ficha de Inscripción</h2>
          {isIOS ? (
            <div className="ios-fallback">
              <p>Tu navegador no soporta la previsualización del PDF.</p>
              <a href="/gestion-talento-humano.pdf" target="_blank" rel="noreferrer">
                Abrir PDF
              </a>
            </div>
          ) : (
            <iframe
              src="/EMECNL_Rivas_Cristian.pdf"
              title="Certificado de Participación"
              className="pdf-frame"
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;