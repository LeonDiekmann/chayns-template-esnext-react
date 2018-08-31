import React from 'react';


export default class SearchBar extends React.Component {  
    constructor() {
        super();
        this.timer = null;
        this.state = {
            searchString: ''
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.searchText = null;
    }

    inputHandler(event) {
        this.searchText = event;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.callback(this.searchText);
        }, 500);
    }

    onChange() {
    }
    render() {
        return(
            <div className="Suche Suche--accordion">
                <input className="accSearch" type="text" placeholder="Suche" value={this.state.searchString} onInput={(event) => {this.setState({searchString: event.target.value}); this.inputHandler(event.target.value);}} />
                <label>
                    <i className="fa fa-search">
                    </i>
                </label>
            </div>
            
        );
    }
}