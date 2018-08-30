import React from 'react';
import { Accordion, Button } from 'chayns-components/lib';
import './registerFormular.scss';

let commentStyles = {
    width: "100%"
}

export default class Formular extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            address: '',
            mail: '',
            comment:'',
            disabled: true
        };
        console.log(this.state);
        this.checkText = this.checkText.bind(this);    
        this.sendIntercom = this.checkText.bind(this);
    }
    

    checkText() {
        if (this.state.name !== '' && this.state.address !== '' && this.state.mail !== '') {
            this.setState({disabled: false})
        }
        else
        {
            this.setState({disabled: true})
        }
    }

    sendIntercom() {
        console.log('sending')
        chayns.intercom.sendMessageToPage({ 
            text: "Name: " + this.state.name + "\nAdresse: " + this.state.address + 
            "\nE-Mail: " + this.state.mail + "\nKommentar: " + this.state.comment
        }).then(function(data){
            // console.log(this.state);
            // this.setState({name: ''});
            // this.setState({address: ''});
            // this.setState({mail: ''});
            // this.setState({comment: ''});
            // this.setState({disabled: true});
            // console.log(name)
            if(data.status == 200)
                chayns.dialog.alert('','Vielen Dank, ihre Site wurde hinzugefügt.');
        });
    }

    render() {
        return (
            <Accordion head="Site hinzufügen" badge="+">
                    <div className="accordion__intro">Hier kannst Du deine eigene Chayns Site hinzufügen.</div>
                    <div className="accordion__content">
                        <div className="input-group">
                            <input name="formName" className="input" value={this.state.name} type="text" required onChange = {(text) => {this.setState({name: text.target.value});this.checkText();}}/>
                            <label>Name*</label>
                        </div>
                        <div className="input-group">
                            <input name="formAddress" className="input" value={this.state.address} type="text" required onChange = {(text) => {this.setState({address: text.target.value});this.checkText();}}/>
                            <label>Adresse*</label>
                        </div>
                        <div className="input-group">
                            <input name="formMail" className="input" value={this.state.mail} type="text" required onChange = {(text) => {this.setState({mail: text.target.value});this.checkText();}}/>
                            <label>E-Mail*</label>
                        </div>
                        
                        <textarea name="inputComment" className="input" value={this.state.comment} style={commentStyles}   placeholder="Kommentar" onChange = {(text) => {this.setState({comment: text.target.value});this.checkText()}}></textarea>
                        
                        <Button disabled={this.state.disabled} onClick={() => {this.sendIntercom()}}>hinzufügen</Button>
                    </div>      
            </Accordion>
        );
    }
}

