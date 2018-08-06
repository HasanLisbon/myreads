import React, { Component } from 'react'
import *as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book';
class Search extends Component {
    state={
        query:'',
        searchedBook:[]
    }
    updateQuery=(query)=>{
        this.setState({query:query})
        this.updateSearchedBooks(query)
    }

    updateSearchedBooks=(query)=>{
        if (query) {
            BooksAPI.search(query).then(searchedBook=> {
                if(searchedBook.error){
                    this.setState({ searchedBook: [] })
                }else{
                    this.setState({
                      searchedBook: searchedBook
                    });
                }
            })
        } else {
            this.setState({searchedBook:[]})
        }
        
    }
    render() {
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e)=>this.updateQuery(e.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    
                    {
                    this.state.searchedBook.map(searchedBook=>{
                        let shelf="none";
                        this.props.book.map(book=>(
                            book.id===searchedBook.id?
                            shelf=book.shelf:''
                    ))
                    return (
                            <li key={searchedBook.id}> 
                                <Book
                                    book={searchedBook}
                                    moveShelf={this.props.moveShelf}
                                    currentShelf={shelf}
                                />
                            </li>
                        )
                    
                    })
                }
                    </ol>
                </div>
            </div>  
        );
    }
}
export default Search