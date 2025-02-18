import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { searchGithub, searchGithubUser } from "./api/API";

function App() {
  useEffect(() => {
    // Verificar si el token está cargando correctamente
    console.log("🔍 Token cargado en Vite:", import.meta.env.VITE_GITHUB_TOKEN);

    // Si el token no está definido, mostrar un mensaje de error y no llamar la API
    if (!import.meta.env.VITE_GITHUB_TOKEN) {
      console.error("❌ ERROR: El token de GitHub no está cargado. Revisa el archivo .env.");
      return;
    }

    // Probar búsqueda de usuarios aleatorios
    searchGithub()
      .then((data) => console.log("✅ Usuarios aleatorios:", data))
      .catch((error) => console.error("❌ Error en searchGithub:", error));

    // Probar búsqueda de un usuario específico
    searchGithubUser("octocat")
      .then((user) => console.log("✅ Usuario octocat:", user))
      .catch((error) => console.error("❌ Error en searchGithubUser:", error));
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
