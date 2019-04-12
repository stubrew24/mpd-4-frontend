import React, { Component } from 'react';
import Content from './containers/Content'
import SearchBar from './components/SearchBar'
import Navbar from './containers/Navbar'
import { Grid, Container, Sidebar } from 'semantic-ui-react'
import './App.css';
import {URL, PRODUCTS_URL, CATEGORIES_URL, LOGIN_URL, SIGNUP_URL} from './constants.js'

class App extends Component {

  state = {
    listings: [],
    searchTerm: "",
    categoryId: null, 
    categories: []
  }

  componentDidMount() {
    this.getListings()
    this.getCategories()
  }

  getListings = () => {
    fetch(PRODUCTS_URL)
      .then(resp => resp.json())
      .then(products => {
        this.setState({
          listings: products
        })
      })
  }

  getCategories = () => {
    fetch(CATEGORIES_URL)
      .then(resp => resp.json())
      .then(categories => {
        this.setState({
          categories
        })
      })
  }

  onSearch = (e) => {
    this.setState({
      searchTerm: e.target.value.toLowerCase()
    })
  }

  categoriesClick = id => this.setState({ categoryId: id })

  listings = () => {
    if (this.state.searchTerm) {
      return this.state.listings.filter(listing => {
        return listing.title.toLowerCase().includes(this.state.searchTerm) ||
          listing.description.toLowerCase().includes(this.state.searchTerm)
      })
    } else if (this.state.categoryId) {
      return this.state.listings.filter(listing => listing.category.id === this.state.categoryId)
    } else {
      return this.state.listings
    }
  }

  render() {
    return (
      <Container className="container-box">
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Navbar categories={this.state.categories} categoriesClick={this.categoriesClick} />
            </Grid.Column>
            <Grid.Column width={12}>
              <SearchBar onSearch={this.onSearch} searchTerm={this.state.searchTerm} />
              <Content listings={this.listings()} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
