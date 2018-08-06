import React from 'react'
import * as BooksAPI from './BooksAPI'
import MainPage from './MainPage'
import {Route} from 'react-router-dom'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state={
    book:[]
  }
  componentDidMount(){
    BooksAPI.getAll().then((book)=>{
      this.setState({book:book})
    })
  }
  moveShelf=(book,shelf)=>{
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((book) => {
      this.setState({ book: book})
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<MainPage
          book={this.state.book}
          moveShelf={this.moveShelf}
          />
        )}
          />

        <Route path="/search" render={() => (
        <Search
          book={this.state.book}
          moveShelf={this.moveShelf}
        />
      )}
      />
     
      </div>
    )
  }
}

export default BooksApp
