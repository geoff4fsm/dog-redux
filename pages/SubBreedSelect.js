import React from "react"


const SubBreedSelect = (props) => {

    const handleChange = (event) => {  // function to assign selected breed
        props.onSelect(event.target.value) // event is change, target is breeds, value is selected breed
    }

    const getLoadingView = () => {  // view while breedsList is loading
        return <div>Loading...</div>
    }

    const getErrorView = () => {
        return alert('Sorry, data unavailable')
    }

    const getSelectView = () => {
        return (
            <select onChange={handleChange}> {/* drop down breed selector calls function handleChange */}
                {props.subBreedsList.map((subBreed, index) => { // iterates through all breeds with index number
                    return (
                        <option value={subBreed} key={index}>{subBreed}</option> // assign selected breed 
                    )
                })}
            </select>
        )
    }

    return (
        <div id='breedselect'>
            Select Your SubBreed
            <br></br>
            {/** if breedsList available return breedsList (getSelectView) else return (getLoadingView) */}
            {props.subBreedsList ? getSelectView() : getLoadingView()}
            {/** if error loading return getErrorView else show nothing */}
            {props.isError ? getErrorView : null}
        </div>
    )
}
export default SubBreedSelect