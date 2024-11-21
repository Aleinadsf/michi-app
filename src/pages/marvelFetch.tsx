import { useEffect, useState } from "react";
import md5 from "md5";

const publicKey = "1b180a1e09dbebe98a8210ff2afe36f4";
const privateKey = "047fe1db6fe20facc9d98570385ee50c82e425a5";

const MarvelFetch = () => {
    const [characters, setCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");  // Estado para la búsqueda

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);  // Actualizar la búsqueda
    };

    useEffect(() => {
        const fetchData = async () => {
            const ts = new Date().getTime();  // Timestamp actual
            const hash = md5(ts + privateKey + publicKey); 

            const url = searchQuery
                ? `https://gateway.marvel.com/v1/public/characters?name=${searchQuery}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
                : `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                setCharacters(data.data.results);  // Guardar los personajes en el estado
            } catch (error) {
                setError("Error al cargar los datos.");
                console.error("Error:", error);
            } finally {
                setLoading(false);  // Terminar la carga
            }
        };

        fetchData();
    }, [searchQuery]);  // Ejecutar cada vez que cambie la búsqueda

    return (
        <div className="contenedor">
            <h4>Personajes de Marvel</h4>
            <hr />
            <input
                type="text"
                placeholder="Buscar un héroe"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map((character, index) => (
                            <tr key={index}>
                                <td>{character.name}</td>
                                <td>
                                    <img
                                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                        alt={character.name}
                                        width="100"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MarvelFetch;
