import React, { Component } from 'react'

class SubBreedImage extends Component {
    state = {  // define state
        imageUrl: 'https://scontent-ort2-2.xx.fbcdn.net/v/t39.30808-6/p843x403/241955680_346117227260995_8325057415375326634_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=9n5Ng6ZC4DEAX_S8iAi&_nc_oc=AQl1WtBJI_cplfKxDtLdc2x469Uq5RmxBACgxUVPlTxU1xS8svijgik5MpvNozZhnM0&_nc_ht=scontent-ort2-2.xx&oh=4fec1506373ca6b26ebf914d170110b0&oe=61497A2C',
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
            <div className='sub-breed-image'>
                <br></br>
                <img src={this.state.imageUrl} alt='dog' />
                <br></br>
            </div>
        )
    }
}

export default SubBreedImage