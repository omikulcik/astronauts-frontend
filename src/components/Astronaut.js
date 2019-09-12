import React from "react"
import moment from "moment"
import cs from "moment/locale/cs"
import edit from "../img/edit.png"
import clear from "../img/clear.png"


moment.updateLocale("cs", cs)

const Astronaut = (props) => {

    return (
        <tr className="astronaut-tab">
            <td>
                {props.name}
            </td>
            <td>
                {props.surname}
            </td>
            <td>
                {moment(props.birthDate).format("LL")}
            </td>
            <td>
                {props.superPower}
            </td>
            <td>
                <img src={edit} alt="" className="icon" onClick={() => props.onEdit({
                    id: props.id,
                    name: props.name,
                    surname: props.surname,
                    birthDate: props.birthDate,
                    superPower: props.superPower
                })} />
            </td>
            <td>
                <img src={clear} onClick={() => props.onDelete(props.id)} alt="" className="icon" />
            </td>
        </tr>
    )
}

export default Astronaut