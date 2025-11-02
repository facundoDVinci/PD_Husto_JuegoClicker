import React from "react";
import { Modal, Button, ListGroup, Badge } from "react-bootstrap";

function AchievementsModal({ show, onHide, achievements }) {
  const allAchievements = [
    "¡10 Diamantes!",
    "¡100 Diamantes!",
    "¡1000 Diamantes!",
    "¡Mejorador!",
    "¡AutoClicker!",
  ];

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logros</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {allAchievements.map((a, i) => {
            const unlocked = achievements.some((ach) => ach.name === a);
            return (
              <ListGroup.Item
                key={i}
                className="d-flex justify-content-between align-items-center"
              >
                {a}
                <Badge bg={unlocked ? "success" : "secondary"}>
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
