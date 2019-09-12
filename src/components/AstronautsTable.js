import React, { useState, useEffect } from "react"
import Astronaut from "./Astronaut";
import AstronautsForm from "./AstronautsForm";
import { useApolloClient } from "@apollo/react-hooks";
import { startDeleteAstronaut, startUpdateAstronaut, startCreateAstronaut } from "../actions/astronautsActions";



const AstronautsTable = (props) => {
    const client = useApolloClient()
    const [astronauts, setAstronauts] = useState([])
    const [modal, setModal] = useState({ isOpen: false, data: false })

    const onDelete = (id) => {
        startDeleteAstronaut(id, client, props.astronautsDispatch)
    }

    const onEdit = (data) => {
        setModal({
            isOpen: true,
            data
        })
    }

    const onCreate = () => {
        setModal({
            isOpen: true,
            data: false
        })
    }

    const onSubmit = (data) => {

        if (modal.data.id) {
            startUpdateAstronaut(data, client, props.astronautsDispatch)
        } else {
            startCreateAstronaut(data, client, props.astronautsDispatch)
        }
        setModal({
            isOpen: false,
            data: false
        })
    }

    useEffect(() => {
        setAstronauts(props.astronauts)
    }, [props])


    return (
        <div className="astronauts-table-layout">
            <div>
                <button className="btn add" type="button" onClick={() => onCreate()}>Přidat astronauta</button>
            </div>
            <table className="astronauts-table">
                <thead>
                    <tr>
                        <th>Jméno</th>
                        <th>Příjmení</th>
                        <th>Datum narození</th>
                        <th>Superschopnost</th>
                        <th>Upravit</th>
                        <th>Smazat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        astronauts.map(astronaut =>
                            <Astronaut
                                key={astronaut.id}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                {...astronaut}
                            />)
                    }
                </tbody>
            </table>
            {modal.isOpen &&
                <AstronautsForm
                    {...modal}
                    onSubmit={onSubmit}
                    setModal={setModal}
                />
            }
        </div>
    )
}

export default AstronautsTable