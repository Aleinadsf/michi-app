import { useRequest } from 'alova/client'
import { alovaInstance } from '../utils/alovaInstance';

const AlovaPage = () => {
    const { data, loading, error } = useRequest(
        alovaInstance.Get('/users'),
        {
            initialData: []
        }
    );

    if (loading) return(<p>Cargando...</p>);
    if (error) return(<p>Error: {error.message}</p>);

    return (<>
        <div className="contenedor">
            <h4>Consumiendo con Alova</h4>
            <hr />
            <table border={1} width={'100%'}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            {
                data
                ? <pre>{JSON.stringify(data,null,2)}</pre>
                : <p>Sin datos</p>
            }
        </div>
    </>);
};

export default AlovaPage;