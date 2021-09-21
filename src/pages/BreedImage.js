import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBreedImages } from '../actions'

class BreedImage extends Component {
    state = {  // define state
        imageUrl: 'https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/p843x403/138050205_191281166077936_2144616844481955967_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=ivNcPKJJ4CgAX_i2y2n&_nc_ht=scontent-ort2-2.xx&oh=68890c3319d48d489423e1f1449c1377&oe=6164D0EB',
        selectedBreed: null
    }

    componentDidUpdate() {  // used to be able to change breeds multiple times
        if (this.props.breed !== this.state.selectedBreed) {
            this.setState({
                selectedBreed: this.props.breed
            })
            this.fetchImage()  // call fetch image function
        }
    }

    fetchImage = async () => {  //  function to get random pic of selected breed from api
        const response = await fetch(
            `https://dog.ceo/api/breed/${this.props.breed}/images/random`, // must use `` instead of '' to be read properly
        )
        const data = await response.json()
        const imageUrl = data.message
        this.setState({
            imageUrl: imageUrl
        })
    }

    render() {
        // console.log(this.props)
        return (
            <div className='breed-image'>
                <br></br>
                <img src={this.state.imageUrl} alt='dog' />
                <br></br>
            </div>
        )
    }
}

export default connect(null, { fetchBreedImages: fetchBreedImages })(BreedImage)