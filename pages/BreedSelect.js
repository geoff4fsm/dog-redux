import React, { useState } from "react"

const BreedSelect = (props) => {
    const [breeds, setBreeds] = useState([])
    const [selectedBreed, setSelectedBreed] = useState('')
    const [selectedSubBreed, setSelectedSubBreed] = useState('')

    const handleChange = (event) => {  // function to assign selected breed
        props.onSelect(event.target.value) // event is change, target is breeds, value is selected breed
        const breedSelect = event.target.value
        const subBreedSelect = breedSelect !== '' ? breeds[breedSelect] : ''
        setSelectedBreed(breedSelect)
        setBreeds(subBreedSelect)
        setSelectedSubBreed('')
    }

    const handleSubBreedSelect = (e) => {
        const subBreedSelect = e.target.value
        setSelectedSubBreed(subBreedSelect)
    }

    const getLoadingView = () => {  // view while breedsList is loading
        return <div>Loading...</div>
    }

    const getErrorView = () => {
        return alert('Sorry, data unavailable')
    }

    const getSelectView = () => {
        return (
            <div>
                <select
                    breed='breeds'
                    onChange={event => handleChange(event)}
                    value = {selectedBreed}>
                    {props.breedsList.map((breed, index) => {
                        return (
                            <option value={breed} key={index}>{breed}</option>
                        )

                    })}
                </select>
                <select
                    subBreed='subBreed'
                    onChange={handleSubBreedSelect}
                    value={setSelectedSubBreed}
                >
                    <option value=''>Select your sub breed</option>
                    {props.subBreedsList.map((subBreed, index) => (
                        <option key={index} value={subBreed}>
                            {subBreed}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    return (
        <div id='breedselect'>
            Select Your Breed
            <br></br>
            {/** if breedsList available return breedsList (getSelectView) else return (getLoadingView) */}
            {props.breedsList ? getSelectView() : getLoadingView()}
            {/** if error loading return getErrorView else show nothing */}
            {props.isError ? getErrorView : null}
        </div>
    )
}
export default BreedSelect