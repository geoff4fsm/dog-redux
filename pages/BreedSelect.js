import React, { useState } from "react"

const BreedSelect = (props) => {
    const [breeds, setBreeds] = useState([])
    const [selectedBreed, setSelectedBreed] = useState('')
    const [selectedSubBreed, setSelectedSubBreed] = useState('')
    const [subIndex, setSubIndex] = useState('')

    const handleChange = (event) => {  // function to assign selected breed
        props.onSelect(event.target.value) // event is change, target is breeds, value is selected breed
        const breedSelect = event.target.value
        // console.log(event.target.selectedIndex)
        const subBreedSelect = breedSelect !== '' ? breeds[breedSelect] : '' // if breed
        setSelectedBreed(breedSelect)
        setBreeds(subBreedSelect ? subBreedSelect : '')
        setSubIndex(event.target.selectedIndex)
        setSelectedSubBreed('')
    }

    const handleSubBreedSelect = (e) => {  // function to assign selected sub breed
        props.onSubSelect(e.target.value)
        // console.log(e.target.value)
        const subBreedSelect = e.target.value
        setSelectedSubBreed(subBreedSelect)
        console.log(subBreedSelect)
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
                    value={selectedBreed}>
                    {props.breedsList.map((breed, index) => {
                        return (
                            <option value={breed} key={index} id={index}>{breed}</option>
                        )
                    })}
                </select>
                <select
                    subBreed='subBreeds'
                    onChange={e => handleSubBreedSelect(e)}
                    value={selectedSubBreed}
                >
                    <option value=''>Select your sub breed</option>
                    {selectedBreed ? props.subBreedsList[subIndex].map((subBreed, index) => (
                        <option key={index} value={subBreed}>
                            {subBreed}
                        </option>
                    )) : null}
                </select>
            </div>
        )
    }

    return (
        <div id='breedselect'>
            <br></br>
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