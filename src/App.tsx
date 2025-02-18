import { useEffect } from "react";
import { Outlet } from "react-router-dom"; // Importamos Outlet para renderizar las páginas hijas
import Nav from "./components/Nav";
import { searchGithub, searchGithubUser } from "./api/API";

function App() {
  useEffect(() => {
    // Verificar si el token está cargado correctamente
    console.log("🔍 Token cargado en Vite:", import.meta.env.VITE_GITHUB_TOKEN);

    if (!import.meta.env.VITE_GITHUB_TOKEN) {
      console.error("❌ ERROR: El token de GitHub no está cargado. Revisa el archivo .env.");
      return;
    }

    // Solo realizar pruebas en desarrollo
    if (import.meta.env.DEV) {
      searchGithub()
        .then((data) => console.log("✅ Usuarios aleatorios:", data))
        .catch((error) => console.error("❌ Error en searchGithub:", error));

      searchGithubUser("octocat")
        .then((user) => console.log("✅ Usuario octocat:", user))
        .catch((error) => console.error("❌ Error en searchGithubUser:", error));
    }
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Outlet /> {/* 🔥 Aquí se renderizarán las páginas hijas desde `main.tsx` */}
      </main>
    </>
  );
}

export default App;
