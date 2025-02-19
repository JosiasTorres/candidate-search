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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Cargar candidatos guardados desde localStorage
  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Eliminar candidato
  const handleRemove = (username: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== username
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  // Filtrar candidatos por nombre, usuario o empresa
  const filteredCandidates = savedCandidates.filter((candidate) =>
    `${candidate.name} ${candidate.login} ${candidate.company}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Ordenar candidatos alfabéticamente
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    const nameA = a.name?.toLowerCase() || a.login.toLowerCase();
    const nameB = b.name?.toLowerCase() || b.login.toLowerCase();
    return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  return (
    <div className="container">
      <h1>Candidatos Guardados</h1>

      {/* Barra de búsqueda y ordenamiento */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Buscar candidato..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
          <option value="asc">🔼 A - Z</option>
          <option value="desc">🔽 Z - A</option>
        </select>
      </div>

      {/* Lista de candidatos */}
      {sortedCandidates.length === 0 ? (
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
            <button onClick={() => handleRemove(candidate.login)} className="remove-btn">
              ❌ Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;