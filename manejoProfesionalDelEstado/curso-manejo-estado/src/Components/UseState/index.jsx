import { useEffect, useState } from "react";

const SECURITY_CODE = "paradigma";

function UseState(props){


    const [codeValue, setCodeValue] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {

        if(!!loading){
            setTimeout(() => {
                if(codeValue !== SECURITY_CODE){
                    setError(true);
                }else{
                    setCompleted(true);
                }
                setLoading(false)
            },3000)
        }
    }, [loading]);


    if(!completed && !deleted){
        return (
            <div>
                <h2>Eliminar {props.name}</h2>

                <p>Por favor, escribe el codigo de seguridad para comprobar que quieres eliminar</p>

                {error && <p>Error: el codigo es incorrecto</p>}

                {loading && <p>Cargando...</p>}

                <form>
                    <input
                    type="text"
                    readOnly={loading}//se usa para no se pueda escribir mientras loading sea true
                    value={codeValue}
                    onChange={(event) => {
                        setCodeValue(event.target.value);
                        if(error) { setError(false)};//cada vez que se cambie el input va a eliminar el mensaje de error. pero con el if es para que esto ocurra una sola vez y no cada vez que se escriba una letra actualice el estado de error o prodriamos usar onFocus={() => setError(false)}
                    }}
                    placeholder="Codigo de Seguridad" />
                    <button
                        type="button"
                        onClick={() => {
                            setLoading(true);
                            setError(false)
                        }}
                    >Comprobar</button>
                </form>
            </div>
        )
    }else if(completed && !deleted){
        return(
            <>
                <h2>¿Seguro desea eliminar el archivo?</h2>

                <button
                    onClick={() => {
                        setDeleted(true);
                    }}
                >Si, confirmar</button>
                <button
                    onClick={() => {
                        setCompleted(false);
                        setCodeValue("");
                    }}
                >No, volver atras</button>
            </>
        )
    }else if(completed && deleted){
        return(
            <>
                <h2>El archivo ha sido eliminado</h2>

                <button
                    onClick={() => {
                        setDeleted(false);
                        setCompleted(false);
                        setCodeValue("");
                    }}
                >Recuperar archivo</button>
            </>
        )
    }
}

export {UseState};