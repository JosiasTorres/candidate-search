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

  // ✅ Guardar un candidato en localStorage
  const handleAccept = () => {
    const acceptedCandidate = candidates[currentIndex];

    if (acceptedCandidate) {
      // 🛠 Recuperar los candidatos guardados antes de actualizar
      const storedCandidates = localStorage.getItem("savedCandidates");
      const previousCandidates = storedCandidates ? JSON.parse(storedCandidates) : [];

      // ⚡ Agregar el nuevo candidato a la lista y actualizar el estado
      const updatedSavedCandidates = [...previousCandidates, acceptedCandidate];
      setSavedCandidates(updatedSavedCandidates);

      // 🔥 Guardar en localStorage
      localStorage.setItem("savedCandidates", JSON.stringify(updatedSavedCandidates));

      console.log("✅ Candidato guardado:", acceptedCandidate);
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
  );
};

export default CandidateSearch;
