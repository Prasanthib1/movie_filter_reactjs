import React, { Component } from "react";
import data from "./data.json";

class SearchFilter extends Component {
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
    genres: []
  };

  optionSelected = () => {
    var e = document.getElementById("genre-filter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose Any")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(item =>
        item["Genre"].toLowerCase().includes(selected.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  };

  sortBy = () => {
    var e = document.getElementById("genre-sort");
    var selected = e.options[e.selectedIndex].value;

    if (selected === "ranking")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else if (selected === "asc") {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function(a, b) {
        return a["Rating"] - b["Rating"];
      });
      this.setState({ itemsToDisplay });
    } else {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function(a, b) {
        return b["Rating"] - a["Rating"];
      });
      this.setState({ itemsToDisplay });
    }
  };

  render() {
    return (
      <div>
        <div className="header">
          <h1>MovieFilter</h1>
        </div>
        <div className="genrefilter">
          <div>
            Choose a genre : 
            &nbsp;
            <select id="genre-filter" onChange={this.optionSelected}>
              <option value="any">Choose Any</option>
              {this.state.genres.map(genre => {
                return <option value={genre}>{genre}</option>;
              })}
            </select>
          </div>
          <div>
            Sort by : &nbsp;
            <select id="genre-sort" onChange={this.sortBy}>
              <option value="ranking">Ranking</option>
              <option value="asc">Rating (Low to High)</option>
              <option value="des">Rating (High to Low)</option>
            </select>
          </div>
        </div>
        <div className="container">
          {this.state.itemsToDisplay.map(rest => {
            let genres = rest["Genre"].substring(1, rest["Genre"].length - 2).split(",");
            return (
              <div className="movie">
                <div className="movie-info">
                  <span className="movie-name">{rest["Name"]}</span>
                  <div className="movie-genres">
                    {genres.map(genre => {
                      let genreToShow = genre.substring(1,genre.length - 1);

                      genreToShow = genreToShow.includes("'")
                        ? genreToShow.substring(1, genreToShow.length)
                        : genreToShow;
                      return (
                        <div pill className="movie-genre">
                          {genreToShow}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="movie-stats">
                  <div className="movie-stats-sub">
                  <p> Number of reviews :  &nbsp; </p>
                  <p>{rest["Number of Reviews"]}</p>
                  </div>
                  <div className="movie-stats-sub">
                  <p> Rating : &nbsp; </p>
                  <p>
                   {rest["Rating"]}
                  </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }



  componentDidMount() {
    this.reRenderList();
  }

  reRenderList() {
    var genres = [];
    var itemsToDisplay = [];
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);
      data[i]["Genre"].substring(1, data[i]["Genre"].length - 2).split(",")
        .forEach(genre => {
          let c = genre.substring(1, genre.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;
          if (genres.indexOf(c) < 0) {
            genres.push(c);
          }
        });
    }

    this.setState({ genres });

    this.setState({ itemsToDisplay }, () => {
      this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
    });
  }
}

export default SearchFilter;