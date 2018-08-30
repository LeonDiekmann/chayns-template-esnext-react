import React from 'react';
import { Accordion, Button } from 'chayns-components/lib';
import SearchBar from 'C:/Dev/Projects/chayns-template-esnext-react/src/components/searchContainer/searchBar/searchBar.jsx';
import listItem from './listItem';

export default class SearchContainer extends React.Component {  
    constructor () {
        super();
        this.state = {
            listItems: []
        }
        let resultNr = null;
        let fetchString = 'Tobit';
        let fetchLink = 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=' + fetchString + '&Skip=0&Take=' + resultNr;
        // this.fetchData(fetchLink)

        let search = new SearchBar();

        search.onChange = (value) => {
            console.log("container" + value);
            resultNr = 5;
            fetchString = value;
            fetchLink = 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=' + fetchString + '&Skip=0&Take=' + resultNr;
            console.log(fetchString);
            if (fetchString !== "") {
                fetch.fetchData(fetchLink,$listContainer);
            }
        }
        
    }

    fetchData(fetchLink,listContainer) {
        chayns.showWaitCursor()
        this.fetchDataPromise(fetchLink).then((result) => {
            chayns.hideWaitCursor()
            listContainer.innerHTML = "";
            console.log("data", result);
            for (let index = 0; index < result.Data.length; index++) {
                const element = result.Data[index];
                // create(element, listContainer);
                this.setState({[this.state.listItems]: element})
                console.log("data", element.siteId);
                console.log("element",element);
            }            
        }).catch(function(){
            console.log("failed");
        });
    }

    
    fetchDataPromise(fetchLink) {
        return new Promise(function(resolve,reject){
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
            <Accordion head="Sites" defaultOpened right={<SearchBar/>}>
                
                <div className="accordion__content">
                {this.state.listItems.map((element) => {return <listItem key={element.siteId}/>})}
                    <div className="right">
                        <a href="#">Mehr anzeigen</a>
                    </div>
                </div>
            </Accordion>
        );
    }
}