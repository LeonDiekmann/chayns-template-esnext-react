import React from 'react';
import { Accordion, Button } from 'chayns-components/lib';
import SearchBar from 'C:/Dev/Projects/chayns-template-esnext-react/src/components/searchContainer/searchBar/searchBar.jsx';
import ListItem from './listItem';
import './listItem.css';

export default class SearchContainer extends React.Component {  
    constructor () {
        super();
        this.state = {
            listItems: [],
            resultNr: 5,
            fetchString: 'Tobit',
            fetchLink: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showMore = this.showMore.bind(this);
    
        // this.fetchData(fetchLink)
    }

    handleChange(value) {
        this.setState({resultNr: 5});
        this.setState({fetchString: value});
        let fetchLinkTemp = 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=' + this.state.fetchString + '&Skip=0&Take=' + this.state.resultNr;
        this.setState({fetchLink: fetchLinkTemp});
        if (this.state.fetchString !== "") {
            this.fetchData(this.state.fetchLink);
        }

    }


    componentDidMount() {
        let fetchLinkLoad = 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=' + this.state.fetchString + '&Skip=0&Take=' + this.state.resultNr;
        this.setState({fetchLink: fetchLinkLoad});
        this.fetchData(fetchLinkLoad);
        console.log('mounted');
    }


    fetchData(fetchLink) {
        chayns.showWaitCursor()
        this.fetchDataPromise(fetchLink).then((result) => {
            chayns.hideWaitCursor()
            this.setState({listItems: []});
            console.log("data", result);
            for (let index = 0; index < result.Data.length; index++) {
                const element = result.Data[index];
                // create(element, listContainer);
                this.setState({listItems: this.state.listItems.concat([element])})
                // console.log("data", element.siteId);
                // console.log("element",element);
                console.log("listitem: ", this.state.listItems)
            }            
        }).catch(() => {
            console.log("failed");
        });
    }

    showMore() {
        let fetchLinkMore = null;
        this.setState({resultNr: this.state.resultNr + 5}, () => { 
            console.log(this.state.resultNr); 
            fetchLinkMore = 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=' + this.state.fetchString + '&Skip=0&Take=' + this.state.resultNr;
            this.fetchData(fetchLinkMore) 
        });
        
    }
    
    fetchDataPromise(fetchLink) {
        return new Promise((resolve,reject) => {
            try{
            fetch(fetchLink)
            .then((response) => {
                return response.json()
            }).then((json) => {
                resolve(json);
                console.log('parsed json', json)
            }).catch( (ex) => {
                console.log('parsing failed', ex)
                reject(ex);
            })
            }
            catch (ex){
                reject(ex);
            }
        });
    }

    
    render() {
        return(
            <Accordion head="Sites" defaultOpened right={<SearchBar callback={this.handleChange}/>}>
                
                <div className="accordion__content">
                {this.state.listItems.map((element) => {return <ListItem key={element.siteId} {...element} />})}
                    <div className="right" style= {{textAlign: "right"}} onClick={(event) => {this.showMore()}}>
                        <a href="#">Mehr anzeigen</a>
                    </div>
                </div>
            </Accordion>
        );
    }
}