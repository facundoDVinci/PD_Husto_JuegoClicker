import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 text-light">💎 Clicker Game 💎</h1>
      <p className="text-light mb-4">¡Consigue diamantes y mejora tu pico!</p>
      <button className="btn btn-success btn-lg" onClick={() => navigate("/game")}>
        Jugar
      </button>
      <button className="btn btn-success btn-lg" onClick={() => navigate("/about")}>
        Acerca del Proyecto
      </button>
      <button className="btn btn-success btn-lg" onClick={() => navigate("/about")}>
        Contacto
      </button>
    </div>
  );
}

export default Home;
