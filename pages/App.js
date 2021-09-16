import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../App.css'
import BreedImage from './BreedImage'
import BreedSelect from './BreedSelect'
import SubBreedSelect from './SubBreedSelect'
import SubBreedImage from './SubBreedImage'
import Home from './Home'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

class App extends Component {
  state = {  // define state
    breedsList: [],
    subBreedsList: [],
    subBreedsLength: 0,
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
          breedsList: Object.keys(data.message), // data.message is object of all breeds
          // if key length > 0 create sub Breeds list
          subBreedsLength : Object.values(data.message).length,
          subBreedsList : Object.values(data.message)
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
  // fetchAllSubBreeds = async () => {  // function to get all subBreeds must wait for response so can do other things while waiting
  //   try { //try to get data for suBreeds
  //     const response = await fetch(`https://dog.ceo/api/breeds/${this.state.selectedBreed}/list`); {/* promise breeds list */ }
  //     if (response.ok) { // ckeck if status code is 200 in dev tools network or error present
  //       const data = await response.json();  // convert response to readable format
  //       this.setState({  // change state of subBreedsList from null to all breeds
  //         subBreedsList: Object.values(data.message) // data.message is object of all breeds
  //       })
  //     } else {
  //       this.setState({
  //         isError: true  // change error state if unable to get data
  //       })
  //       alert('Sorry, data unavailable')
  //     }
  //   } catch (e) { // code will jump here if there is a network problem
  //     this.setState({
  //       isError: true
  //     })
  //     alert('Sorry, data unavailable')
  //   }
  // }
  selectHandler = (breed) => { // assigns selected breed to state
    this.setState({
      selectedBreed: breed
    })
  }
  selectSubHandler = (subBreed) => {
    this.setState({
      selectedSubBreed: subBreed
    })
  }
  render() {
    // console.log(this.state.breedsList)
    // console.log(this.state.selectedBreed)
     console.log(this.state)
    return (
      <div className='App'>
        <NavBar />
        <Switch>
          <Route exact path='/breedselect'>
            {/* send breedsList and errror state to component BreedSelect, call function to send selected breed as onSelect */}
            <BreedSelect breedsList={this.state.breedsList} subBreedsList={this.state.subBreedsList} onSelect={this.selectHandler} isError={this.state.isError} />
            {/* send selectedBreed to component BreedImage */}
            <BreedImage breed={this.state.selectedBreed} />
            
            <SubBreedSelect subBreedsList={this.state.subBreedsList} onSubSelect={this.selectSubHandler} isError={this.state.isError} />
            <SubBreedImage subBreed={this.state.selectedSubBreed} />
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