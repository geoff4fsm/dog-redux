import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../App.css'
import BreedImage from './BreedImage'
import BreedSelect from './BreedSelect'
import SubBreedImage from './SubBreedImage'
import Home from './Home'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import About from './About'

class App extends Component {
  state = {  // define state
    breedsList: [],
    subBreedsList: [],
    selectedBreed: null,
    selectedSubBreed: null,
    isError: false
  }
  componentDidMount() {  // after page loads call fetchAllBreeds function
    this.fetchAllBreeds()
  }
  fetchAllBreeds = async () => {  // function to get all breeds must wait for response so can do other things while waiting
    try { //try to get data for breeds
      const response = await fetch('https://dog.ceo/api/breeds/list/all'); {/* promise breeds list */ }
      if (response.ok) { // ckeck if status code is 200 in dev tools network or error present
        const data = await response.json();  // convert response to readable format
        this.setState({  // change state of breedsList from null to all breeds
          breedsList: Object.keys(data.message), // data.message is object keys of all breeds
          subBreedsList: Object.values(data.message) // data.message is object values of all breeds
        })

      } else {
        this.setState({
          isError: true  // change error state if unable to get data
        })
        alert('Sorry, data unavailable')
      }
    } catch (e) { // code will jump here if there is a network problem
      this.setState({
        isError: true
      })
      alert('Sorry, data unavailable')
    }
  }

  selectHandler = (breed) => { // assigns selected breed to state
    this.setState({
      selectedBreed: breed
    })
  }
  selectSubHandler = (subBreed) => { // assigns selected sub breed to state
    this.setState({
      selectedSubBreed: subBreed
    })
  }
  render() {
    // console.log(this.state.breedsList)
    // console.log(this.state.selectedBreed)
    // console.log(this.state.selectedSubBreed)
    return (
      <div className='App'>
        <NavBar />
        <Switch>
          <Route exact path='/breedselect'>
            {/* send breedsList and errror state to component BreedSelect and subs, call function to send selected breed as onSelect and onSubSelect */}
            <BreedSelect breedsList={this.state.breedsList} subBreedsList={this.state.subBreedsList} onSelect={this.selectHandler} onSubSelect={this.selectSubHandler} isError={this.state.isError} />
            {/* send selectedBreed to component BreedImage */}
            <div className='images'>
              <BreedImage breed={this.state.selectedBreed} />
               {/* send selected sub breed to SubBreedImage */}
              <SubBreedImage subBreed={this.state.selectedSubBreed} breed={this.state.selectedBreed} />
            </div>
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    )
  }
}
export default App