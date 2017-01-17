/**
 * Created by Lixing on 16/1/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-refetch';
import MovieList from './MovieList';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onAddMovie = this.onAddMovie.bind(this);
    this.onRemoveMovie = this.onRemoveMovie.bind(this);
    this.state = { term: '', movies: [] };
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    });
    this.props.searchMovie(this.state.term);
  }

  onAddMovie(movie) {
    this.props.onAddMovie(movie);
    this.setState({
      term: ''
    });
  }

  onRemoveMovie(movie) {
    this.props.onRemoveMovie(movie);
  }


  renderMovieList() {
    const { movieFetch } = this.props;
    console.log(movieFetch);

    if (movieFetch && movieFetch.fulfilled && this.state.term) {
      return (
        <MovieList
          movies={movieFetch.value.Search}
          onAddMovie={this.onAddMovie}
          onRemoveMovie={this.onRemoveMovie}
        />
      );
    }
    return (<div />);
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()} style={style.container}>
        <input
          type="text"
          placeholder="Search for movies..."
          onChange={this.handleChange}
          style={style.input}
          className="form-control"
          value={this.state.term}
        />
        {this.renderMovieList()}
      </form>
    );
  }
}

const style = {
  container: {
    width: 600,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  input: {
    width: 600,
    height: 40,
    paddingLeft: 5,
    fontSize: '1.2em',
    marginBottom: 20,
    boxSizing: 'border-box'
  }
};

export default connect(() => {
  return {
    searchMovie: term => ({
      movieFetch: {
        url: `http://www.omdbapi.com/?s=${term}&type=movie&r=json`,
        headers: {
          'Content-Type': false
        }
      }
    })
  };
})(SearchBox);
