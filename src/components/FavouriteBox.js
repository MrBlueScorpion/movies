/**
 * Created by Lixing on 17/1/17.
 */
import React, { Component } from 'react';

class FavouriteBox extends Component {
  constructor(props) {
    super(props);
    this.onRemoveMovie = this.onRemoveMovie.bind(this);
    this.sortListByType = this.sortListByType.bind(this);
    this.onRemoveAll = this.onRemoveAll.bind(this);
  }

  onRemoveMovie(movie) {
    this.props.onRemoveMovie(movie);
  }

  renderList() {
    return this.props.movies.map(movie => (
      <div key={movie.imdbID} style={style.list}>
        <span style={style.movie}>{movie.Title}({movie.Year})</span>
        <button
          className="btn btn-warning"
          onClick={this.onRemoveMovie.bind(this, movie)}>Remove</button>
      </div>
    ));
  }

  sortListByType(e) {
    this.props.sortListByType(e.target.value);
  }

  onRemoveAll() {
    this.props.onRemoveAll();
  }

  render() {
    return (
      <div>
        <div style={style.container}>
          <div style={style.header}>
            <span><strong>Favourite</strong></span>
            <span>
              <strong>Sort:</strong>
              <select style={style.select} onChange={this.sortListByType}>
                <option value="Title">Alphabetically</option>
                <option value="Rating">Rating</option>
                <option value="Year">Year</option>
              </select>
            </span>
          </div>
          {this.renderList()}
        </div>
        <div style={style.clear}>
          <button className="btn btn-info" onClick={this.onRemoveAll}>Clear</button>
        </div>
      </div>
    );
  }
}

const style = {
  container: {
    width: 600,
    minHeight: 500
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.2em'
  },
  select: {
    marginLeft: 10,
    fontSize: '1em'
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: '1.2em'
  },
  clear: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  movie: {
    display: 'inline-block',
    verticalAlign: 'middle'
  }

};

export default FavouriteBox;

