import { useEffect, useRef, useState } from "react";
import axios from 'axios';

const AxiosPage = () => {
    const paisRef = useRef(null);
    const [pais, setPais] = useState('PERU');
    const [paises, setPaises] = useState(null);


    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${pais}`)
            .then(resp => setPaises(resp.data))
            .catch(err => console.error("Error: ", err));
    }, [pais]);

    const buscarPais = () => {
        setPais(paisRef.current.value);
    }

    return (<>
        <div className="contenedor">
            <h4>Consumiendo con Axios</h4>
            <hr />
            <input ref={paisRef} placeholder="Ingresa el nombre de un país"/>
            <button onClick={buscarPais}>Buscar</button>
            <hr />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '10px' }}>
                {
                    paises
                        ? <>
                            {paises.map((p, i) => (
                                <div key={i} style={{ width: '33%', textAlign: 'center', backgroundColor:'#ededed'}}>
                                    <h3>{p.translations.spa.common}</h3>
                                    <img src={p.flags.png} style={{ maxWidth: '100px', width: '100%' }} />
                                    <p>{p.translations.spa.official}</p>
                                </div>
                            ))}
                        </>
                        : <p><i>Cargando datos</i></p>
                }
            </div>

            {/*
                paises
                ? <pre>{JSON.stringify(paises,null,2)}</pre>
                : <p>cargando...</p>
            */}
        </div>
    </>);
}

export default AxiosPage;