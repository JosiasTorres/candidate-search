import React, { useEffect, useState } from "react";
import { searchGithub } from "../api/API";
import Candidate from "../components/Candidate";

interface GithubUser {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
  email: string | null;
  html_url: string;
  company: string | null;
}

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<GithubUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<GithubUser[]>([]);

  // 📌 Cargar candidatos guardados al inicio
  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }

    // 🔍 Buscar candidatos de GitHub
    searchGithub().then((data) => {
      console.log("Candidatos obtenidos:", data);
      setCandidates(data);
    });
  }, []);

  // ✅ Guardar un candidato en localStorage evitando duplicados
  const handleAccept = () => {
    const acceptedCandidate = candidates[currentIndex];

    if (acceptedCandidate) {
      // ⚡ Verificar si ya está guardado
      if (!savedCandidates.some((c) => c.login === acceptedCandidate.login)) {
        const updatedSavedCandidates = [...savedCandidates, acceptedCandidate];

        // 🔥 Actualizar estado y localStorage
        setSavedCandidates(updatedSavedCandidates);
        localStorage.setItem("savedCandidates", JSON.stringify(updatedSavedCandidates));

        console.log("✅ Candidato guardado:", acceptedCandidate);
      } else {
        console.warn("⚠️ Candidato ya guardado:", acceptedCandidate.login);
      }
    }

    setCurrentIndex((prev) => prev + 1);
  };

  // ❌ Rechazar candidato (solo avanza al siguiente)
  const handleReject = () => {
    console.log("❌ Candidato rechazado:", candidates[currentIndex]);
    setCurrentIndex((prev) => prev + 1);
  };

  if (candidates.length === 0) {
    return <h2>Cargando candidatos...</h2>;
  }

  if (currentIndex >= candidates.length) {
    return <h2>No hay más candidatos disponibles.</h2>;
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      <Candidate
        name={currentCandidate.name || currentCandidate.login}
        username={currentCandidate.login}
        location={currentCandidate.location}
        avatar={currentCandidate.avatar_url}
        email={currentCandidate.email}
        html_url={currentCandidate.html_url}
        company={currentCandidate.company}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      <h3>✅ Candidatos Guardados: {savedCandidates.length}</h3>
    </div>
  );
};

export default CandidateSearch;
