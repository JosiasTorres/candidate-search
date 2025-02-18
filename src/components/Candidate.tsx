import React from "react";

interface CandidateProps {
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string | null;
  html_url: string;
  company: string | null;
  onAccept: () => void;
  onReject: () => void;
}

const Candidate: React.FC<CandidateProps> = ({
  name,
  username,
  location,
  avatar,
  email,
  html_url,
  company,
  onAccept,
  onReject,
}) => {
  return (
    <div className="candidate-card">
      <img src={avatar} alt={name} className="avatar" />
      <h2>{name}</h2>
      <p><strong>Usuario:</strong> {username}</p>
      <p><strong>Ubicación:</strong> {location || "No especificado"}</p>
      <p><strong>Email:</strong> {email || "No disponible"}</p>
      <p><strong>Empresa:</strong> {company || "No especificado"}</p>
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        Ver perfil en GitHub
      </a>
      <div className="buttons">
        <button onClick={onAccept} className="accept">➕ Aceptar</button>
        <button onClick={onReject} className="reject">➖ Rechazar</button>
      </div>
    </div>
  );
};

export default Candidate;