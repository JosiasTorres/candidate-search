import React, { useEffect, useState } from "react";

interface GithubUser {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
  email: string | null;
  html_url: string;
  company: string | null;
}

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<GithubUser[]>([]);
  const [sortOption, setSortOption] = useState<string>("name");

  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleRemove = (username: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== username);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  // 📌 Función para ordenar los candidatos según la opción seleccionada
  const sortedCandidates = [...savedCandidates].sort((a, b) => {
    if (sortOption === "name") {
      return (a.name || "").localeCompare(b.name || "");
    } else if (sortOption === "username") {
      return a.login.localeCompare(b.login);
    } else if (sortOption === "company") {
      return (a.company || "").localeCompare(b.company || "");
    }
    return 0;
  });

  return (
    <div>
      <h1>Candidatos Guardados</h1>

      {/* 📌 Selector de ordenamiento */}
      <label htmlFor="sort">Ordenar por: </label>
      <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="name">Nombre</option>
        <option value="username">Usuario</option>
        <option value="company">Empresa</option>
      </select>

      {savedCandidates.length === 0 ? (
        <p>No hay candidatos guardados.</p>
      ) : (
        sortedCandidates.map((candidate) => (
          <div key={candidate.login} className="candidate-card">
            <img src={candidate.avatar_url} alt={candidate.name} className="avatar" />
            <h2>{candidate.name || candidate.login}</h2>
            <p><strong>Usuario:</strong> {candidate.login}</p>
            <p><strong>Ubicación:</strong> {candidate.location || "No especificado"}</p>
            <p><strong>Email:</strong> {candidate.email || "No disponible"}</p>
            <p><strong>Empresa:</strong> {candidate.company || "No especificado"}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              Ver perfil en GitHub
            </a>
            <button onClick={() => handleRemove(candidate.login)} className="remove-btn">❌ Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;