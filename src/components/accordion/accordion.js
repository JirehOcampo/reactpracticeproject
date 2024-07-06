import React from "react"
import './accordion.css'
import datum from "./accordion-data.js"

export default function Accordion() {

    const [selection, setSelection] = React.useState(null);
    const [multipleSelection, setMultipleSelection] = React.useState([])
    const [isSelected, setIsSelected] = React.useState(false);

    function handleSingleSelection(getCurrentId) {
        setSelection(prevSelection => prevSelection === getCurrentId ? null : getCurrentId)
    }

    function handleChangeSelection() {
        setIsSelected(prevIsSelected => !prevIsSelected)
        setSelection(null)
    }

    function handleMultipleSelection(getCurrentId) {
         let cpyMultiple = [...multipleSelection];
         const indexOfCurrentId = cpyMultiple.indexOf(getCurrentId);


         if(indexOfCurrentId === -1) {
            cpyMultiple.push(getCurrentId)
         } else cpyMultiple.splice(indexOfCurrentId, 1)

         setMultipleSelection(cpyMultiple)
    }

    console.log(multipleSelection)

    const accordions = datum.map((accordionsData) => (
            <div className="accordions">
                <div className="accordion-title" onClick={isSelected ? ()=>handleMultipleSelection(accordionsData.id) : ()=>handleSingleSelection(accordionsData.id)}>
                    <div>{accordionsData.question}</div>
                    <span className="expand-btn">{selection === accordionsData.id ? "-" : "+"}</span>
                </div>
                {selection === accordionsData.id || multipleSelection.indexOf(accordionsData.id) !== -1 ? <div className="accordion-description">{accordionsData.answer}</div> : null}
            </div> 
    ))

    return (
       <div className="container">
            <button onClick={handleChangeSelection} className="btn-enable-selection">{isSelected ? "Enable Single Selection" : "Enable Multiple Selection"}</button>
            {datum && datum.length > 0 ? accordions : <div>No record found</div>}
       </div>
    )
}