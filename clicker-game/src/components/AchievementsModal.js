import React from "react";
import { Modal, Button, ListGroup, Badge } from "react-bootstrap";

function AchievementsModal({ show, onHide, achievements }) {
  // Lista completa de logros con nombres y descripciones
  const allAchievements = [
    { name: "¡10 Diamantes!", desc: "Consigue 10 diamantes." },
    { name: "¡100 Diamantes!", desc: "Consigue 100 diamantes." },
    { name: "¡1000 Diamantes!", desc: "Consigue 1000 diamantes." },
    { name: "¡Millonario!", desc: "Consigue 10,000 diamantes." },
    { name: "Espada de Hierro", desc: "Mejora la espada a nivel +5." },
    { name: "Espada de Acero", desc: "Mejora la espada a nivel +10." },
    { name: "Espada Legendaria", desc: "Mejora la espada a nivel +20." },
    { name: "Autoclicker", desc: "Compra tu primer punto por segundo." },
    { name: "Productor", desc: "Llega a 5 puntos por segundo." },
    { name: "Fábrica de diamantes", desc: "Llega a 10 puntos por segundo." },
    { name: "Pico mejorado", desc: "Mejora el pico 3 veces." },
    { name: "Pico maestro", desc: "Mejora el pico 10 veces." },
    { name: "Primer enemigo", desc: "Derrota tu primer enemigo." },
    { name: "Cazador", desc: "Derrota 5 enemigos." },
    { name: "Destructor de mundos", desc: "Derrota 20 enemigos." },
    { name: "Curioso...", desc: "Clickeaste un botón rojo por error." },
    { name: "Maestro del progreso", desc: "Desbloquea todos los logros." },
  ];

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>🏆 Logros del Jugador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup variant="flush">
          {allAchievements.map((a, i) => {
            const unlocked = achievements.some((ach) => ach.name === a.name);
            return (
              <ListGroup.Item
                key={i}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{a.name}</strong>
                  <br />
                  <small className="text-muted">{a.desc}</small>
                </div>
                <Badge bg={unlocked ? "success" : "secondary"} pill>
                  {unlocked ? "Obtenido" : "Bloqueado"}
                </Badge>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AchievementsModal;
