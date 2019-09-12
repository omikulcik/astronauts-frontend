import React, { useState } from "react"
import ReactModal from "react-modal"
import Datepicker from "react-datepicker"
import moment from "moment";
import cs from "date-fns/locale/cs"


ReactModal.setAppElement('#root');

const AstronautsForm = (props) => {
    const [name, setName] = useState(props.data.name ? props.data.name : "")
    const [surname, setSurname] = useState(props.data.surname ? props.data.surname : "")
    const [superPower, setSuperPower] = useState(props.data.superPower ? props.data.superPower : "")
    const [birthDate, setBirthDate] = useState(props.data.birthDate ? props.data.birthDate : null)
    const [error, setError] = useState("")


    const onSubmit = (e) => {
        e.preventDefault()
        if (!name || !surname || !superPower || !birthDate) {
            setError("Vyplňte prosím všechna pole")
        } else {
            props.onSubmit({
                id: props.data.id,
                name,
                surname,
                superPower,
                birthDate: moment(birthDate).unix()
            })
        }
    }

    return (
        <ReactModal
            isOpen={props.isOpen}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.25)"
                }
            }}
        >
            <button href="#" className="close" onClick={() => props.setModal({ isOpen: false, data: false })} />
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Jméno" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Příjmení" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <Datepicker
                    selected={birthDate}
                    locale={cs}
                    maxDate={new Date()}
                    showYearDropdown
                    placeholderText={"Datum narození"}
                    onChange={
                        date => setBirthDate(date)
                    }
                />
                <input type="text" placeholder="Superschopnost" value={superPower} onChange={(e) => setSuperPower(e.target.value)} />
                <button type="submit" className="btn send">Odeslat</button>
            </form>
            {error && <p className="error">{error}</p>}
        </ReactModal>
    )
}

export default AstronautsForm
