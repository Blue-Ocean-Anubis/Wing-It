import React from 'react';




//this is just a simple search bar I made before
//implementing the autocomplete search, left it in just in case,
//but we probably won't need it




export default class SimpleSearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      query:''
    };
  }

handleSubmit(e){
  e.preventDefault();
  this.props.handleSearch(this.state.query);
}
handleQueryChange(e){
  this.setState({
    query: e.target.value
  });
}
  render(){
    return(
      <form className='submission-form-container' onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search by city</span>
        </label>
        <input
            className='search-bar'
            type="text"
            id="header-search"
            placeholder="What city would you like to visit?"
            name="s"
            onChange={this.handleQueryChange.bind(this)}
        />
        <button className='search-button' type="submit">Search</button>
    </form>
    );
  }
}