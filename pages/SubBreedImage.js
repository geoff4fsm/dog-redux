import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBreedImages } from '../actions'

class SubBreedImage extends Component {
    state = {  // define state
        imageUrl: 'https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/120270528_103560821516638_6538623092715204827_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=174925&_nc_ohc=eueN4GDUYrcAX8sMlP5&_nc_ht=scontent-ort2-2.xx&oh=b7b9d49dbe9ff4a75fc812f91aa52c32&oe=616C4F7B',
        selectedSubBreed: null,
        selectedBreed: this.props.breed
    }

    componentDidUpdate() {  // used to be able to change breeds multiple times
        if (this.props.subBreed !== this.state.selectedSubBreed) {
            this.setState({
                selectedSubBreed: this.props.subBreed,
                selectedBreed: this.props.breed
            })
            this.fetchImage()
        }
    }

    fetchImage = async () => {  //  function to get random pic of selected breed from api
        const response = await fetch(
            `https://dog.ceo/api/breed/${this.props.breed}/${this.props.subBreed}/images/random` // must use `` instead of '' to be read properly
        )
        const data = await response.json()
        const imageUrl = data.message
        this.setState({
            imageUrl: imageUrl
        })
    }

    render() {
        return (
            <div className='breed-image'>
                <br></br>
                <img src={this.state.imageUrl} alt='dog' />
                <br></br>
            </div>
        )
    }
}

export default connect(null, {fetchBreedImages: fetchBreedImages}) ( SubBreedImage )