function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 text-red-600 p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-2">Página no encontrada.</p>
      <p className="text-lg mb-8">Lo sentimos, la URL que estás buscando no existe.</p>
      <p>
        <a 
          href="/" 
          className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200"
        >
          Volver a la página de inicio
        </a>
      </p>
    </div>
  );
}

export default NotFoundPage;