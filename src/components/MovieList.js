/**
 * Created by Lixing on 16/1/17.
 */
import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import '../App.css';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  onAddMovie(movie) {
    this.props.onAddMovie(movie);
  }

  onRemoveMovie(movie) {
    this.props.onRemoveMovie(movie);
  }

  renderButton(movie) {
    if (_.some(this.props.movies, ['imdbID', movie.imdbID])) {
      return (
        <button
          className="btn btn-success"
          onClick={this.onAddMovie.bind(this, movie)}
        >Add</button>
      );
    } else {
      return (
        <button
          className="btn btn-success"
          onClick={this.onRemoveMovie.bind(this, movie)}
        >Remove</button>
      );
    }
  }

  render() {
    return (
      <ul style={style.container} className="ul">
        {this.props.movies.map(movie => {
          return (
            <li key={movie.imdbID} style={style.list}>
              {movie.Title}
              {this.renderButton(movie)}
            </li>
          );
        })}
      </ul>
    );
  }
}

const style = {
  container: {
    // width: 600,
    // position: 'absolute',
    // paddingLeft: 0,
    // backgroundColor: 'white',
    // marginTop: 300
    //top: 30

  },
  list: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc'
  }
};
MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired
};

MovieList.defaultProps = {
  movies: []
};

export default MovieList;
