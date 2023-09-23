import { useEffect, useReducer } from "react";

const SECURITY_CODE = "paradigma";

const initialState = {
    codeValue: "",
    error : false,
    loading: false,
    completed: false,
    deleted: false,
}

function reducer( state, action){
    switch (action.type) {
        case "CONFIRM":
            return{
                ...state,
                completed: true,
                loading: false,
                error: false
            }
        case "ERROR":
            return{
                ...state,
                error: true,
                loading: false
            }
        case "CHECK":
            return{
                ...state,
                error: false,
                loading: true,
            }
        case "WRITE":
            return{
                ...state,
                codeValue : action.payload
            }
        case "DELETE":
            return{
                ...state,
                deleted: true,
            }
        case "RESET":
            return{
                ...state,
                deleted: false,
                completed:false,
                codeValue: "",
            }
        default:
            return {
                ...state
            };
    }
}

function UseReducer(props){

    const [state, dispatch] = useReducer(reducer, initialState);

    // const [codeValue, setCodeValue] = useState("");
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [completed, setCompleted] = useState(false);
    // const [deleted, setDeleted] = useState(false);

    useEffect(() => {

        if(!!state.loading){
            setTimeout(() => {
                if(state.codeValue !== SECURITY_CODE){
                    dispatch({type: "ERROR"})
                    // setError(true);
                }else{
                    dispatch({type: "CONFIRM"})
                    // setCompleted(true);
                }
            },3000)
        }
    }, [state.loading]);


    if(!state.completed && !state.deleted){
        return (
            <div>
                <h2>Eliminar {props.name}</h2>

                <p>Por favor, escribe el codigo de seguridad para comprobar que quieres eliminar</p>

                {state.error && <p>Error: el codigo es incorrecto</p>}

                {state.loading && <p>Cargando...</p>}

                <form>
                    <input
                    type="text"
                    readOnly={state.loading}//se usa para no se pueda escribir mientras loading sea true
                    value={state.codeValue}
                    onChange={(event) => {
                        dispatch({type: "WRITE", payload: event.target.value})
                    }}
                    placeholder="Codigo de Seguridad" />
                    <button
                        type="button"
                        onClick={() => {
                            dispatch({type: "CHECK"})
                            // setLoading(true);
                            // setError(false)
                        }}
                    >Comprobar</button>
                </form>
            </div>
        )
    }else if(state.completed && !state.deleted){
        return(
            <>
                <h2>¿Seguro desea eliminar el archivo?</h2>

                <button
                    onClick={() => {
                        dispatch({type: "DELETE"})
                        // setDeleted(true);
                    }}
                >Si, confirmar</button>
                <button
                    onClick={() => {
                        dispatch({type: "RESET"})
                        // setCompleted(false);
                        // setCodeValue("");
                    }}
                >No, volver atras</button>
            </>
        )
    }else if(state.completed && state.deleted){
        return(
            <>
                <h2>El archivo ha sido eliminado</h2>

                <button
                    onClick={() => {
                        dispatch({type: "RESET"})
                        // setDeleted(false);
                        // setCompleted(false);
                        // setCodeValue("");
                    }}
                >Recuperar archivo</button>
            </>
        )
    }
}

export {UseReducer};