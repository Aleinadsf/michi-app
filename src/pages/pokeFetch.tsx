import { useEffect, useState } from "react";

// Definir una interfaz para los objetos Pokémon
interface Pokemon {
    name: string;
    url: string;
}

interface PokemonDetalles {
    id: number;
    name: string;
    types: string[];
    url: string;
    imagen: string;
}

const PokeFetch = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonDetalles, setPokemonDetalles] = useState<PokemonDetalles[]>([]);  // Para guardar los detalles

    // Obtener la lista de Pokémon
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            .then(response => response.json())
            .then(data => {
                setPokemons(data.results);  // Guardamos los resultados de los Pokémon
            })
            .catch(error => console.error('Error:', error));
    }, [pokemons]);  // Solo ejecutamos el efecto una vez, cuando el componente se monta

    // Obtener los detalles de cada Pokémon (id y tipos)
    useEffect(() => {
        if (pokemons.length > 0) {
            const fetchDetails = async () => {
                const details = await Promise.all(
                    pokemons.map(poke =>
                        fetch(poke.url)
                            .then(response => response.json())
                            .then(data => ({
                                id: data.id,
                                name: data.name,
                                types: data.types.map((type: any) => type.type.name),
                                url: poke.url,
                                imageUrl: data.sprites.front_default,
                            }))
                            .catch(error => console.error('Error al obtener detalles:', error))
                    )
                );
                setPokemonDetalles(details);  // Actualizamos los detalles con la nueva información
            };

            fetchDetails();
        }
    }, [pokemons]);  // Este efecto se ejecuta cuando se actualiza el estado de pokemons

    return (
        <>
            <div className="contenedor">
                <h4>Consumiendo la poke API con Fetch</h4>
                <hr />
                {pokemonDetalles.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Tipos</th>
                                <th>Imagen</th>
                                <th>Enlace</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemonDetalles.map((poke, i) => (
                                <tr key={i}>
                                    <td>{poke.id}</td>  {/* Mostrar ID */}
                                    <td>{poke.name}</td>  {/* Mostrar Nombre */}
                                    <td>
                                        {poke.types.join(', ')}  {/* Mostrar los Tipos */}
                                    </td>
                                    <td><img src={poke.imageUrl} alt={poke.name} width="50" /></td>
                                    <td>
                                        <a href={poke.url} target="_blank" rel="noopener noreferrer">
                                            Más información
                                        </a>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p><i>Cargando datos ...</i></p>
                )}
            </div>
        </>
    );
};

export default PokeFetch;
// import { useEffect, useState } from "react";

// const PokeFetch = () => {
//     const [pokemons, setPokemons] = useState(null);

//     useEffect(() => {
//         fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
//             .then(response => response.json())
//             .then(data => {
//                 setPokemons(data.results);
//                 console.log(pokemons);
//             })
//             .catch(error => console.error('Error:', error))
//     }, []); 
//     // [pokemon] si deseamos constantemente conocer el estado - tiempo real
//     // [] si deseamos una sola carga

//     return (<>
//         <div className="contenedor">
//             <h4>Consumiendo la Pokeapi con Fetch</h4>
//             <hr />
//             {
//                 pokemons
//                     ? <ul>
//                         {pokemons.map((poke, i) => (
//                             <li key={i}> {/* Para el WARNING colocar el contador como clave */}
//                                 {poke.name} -
//                                 <a href={poke.url} target="_blank">Más información</a>
//                             </li>
//                         ))}
//                     </ul>
//                     : <p><i>Cargando datos</i></p>
//             }
//             {/*
//                 pokemons 
//                 ? <pre>{JSON.stringify(pokemons,null,2)}</pre>
//                 : <p>Cargando datos... </p>
//             */}
//         </div>
//     </>);
// };

// export default PokeFetch;