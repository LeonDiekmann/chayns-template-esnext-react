import React from 'react';
import { Accordion, Button } from 'chayns-components/lib';



export default class SearchBar extends React.Component {  
    constructor() {
        super();
        this.timer = null;
        this.state = {
            searchString: ''
        }
        this.inputHandler = this.inputHandler.bind(this);
        
    }

    inputHandler(event) {
        const index = event;
        console.log(index)
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.searchText = index;
            this.onChange(this.searchText);
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