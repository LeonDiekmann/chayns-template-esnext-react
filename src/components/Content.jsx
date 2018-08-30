import React from 'react';

import { Mode } from 'chayns-components/lib';
import Formular from './registerFormular/registerFormular';
import SearchContainer from './searchContainer/searchContainer';



export default class Content extends React.Component {
    constructor(props) {
        super(props);
        /**
         * Apply an array containing selected users to the content
         * It can be filled by using the PersonFinder-Component which is Visible in Adminmode
         */
        this.state = {
            users: []
        };
    }

    /**
     * Push´s an user object to the state 'users' and refresh's the react component 'UserList'
     * By Calling setState the renderfunction ist called automatically
     */
    addUser = (user) => {
        const { users } = this.state;
        if (users.find(u => u.userId === user.userId)) {
            return;
        }

        this.setState({
            users: [...users, user]
        });
    };

    /**
     *  locally save the state `users` and filter the array by a userId
     *  By Calling setState the renderfunction ist called automatically
     */
    removeUser = (userId) => {
        const { users } = this.state;
        this.setState({
            users: users.filter(u => u.userId !== userId)
        });
    };
    


    render() {
        const { users } = this.state;
        return (
            <div className="tapp__content content">
                {/**
                 * Everything defined as a child of Mode is only visible for users
                 * in the UAC-Group 1
                 *
                 * The UAC-Group 1 is defined for chayns-Manager
                 */}
                <Formular/>
                <SearchContainer/>
                
            </div>
        );
    }
}
