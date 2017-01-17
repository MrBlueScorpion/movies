import React, { Component } from 'react';
import * as _ from 'lodash';
import './App.css';
import SearchBox from './components/SearchBox';
import FavouriteBox from './components/FavouriteBox';

class App extends Component {
  constructor() {
    super();
    this.onAddMovie = this.onAddMovie.bind(this);
    this.onRemoveMovie = this.onRemoveMovie.bind(this);
    this.sortListByType = this.sortListByType.bind(this);
    this.onRemoveAll = this.onRemoveAll.bind(this);
  }

  componentWillMount() {
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (movies) {
      this.setState({ movies });
    } else {
      this.state = { movies: [] };
    }
  }

  onAddMovie(movie) {
    this.setState({
      movies: _.uniqBy(this.state.movies.concat(movie), 'imdbID')
    });
  }

  onRemoveMovie(movie) {
    this.setState({
      movies: _.remove(this.state.movies, m => m.imdbID !== movie.imdbID)
    });
  }

  componentDidUpdate() {
    localStorage.setItem('movies', JSON.stringify(this.state.movies));
  }

  sortListByType(type) {
    this.setState({
      movies: _.sortBy(this.state.movies, movie => movie[type])
    });
  }

  onRemoveAll() {
    this.setState({
      movies: []
    });
  }

  render() {
    return (
      <div className="container">
        <SearchBox onAddMovie={this.onAddMovie} onRemoveMovie={this.onRemoveMovie} />
        <FavouriteBox
          movies={this.state.movies}
          onRemoveMovie={this.onRemoveMovie}
          sortListByType={this.sortListByType}
          onRemoveAll={this.onRemoveAll}
        />
      </div>
    );
  }
}

export default App;
