import React from 'react';
import UserService from '../services/UserService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'
import {Button, Grid} from '@material-ui/core';
import FormDialog from './DialogComponent';
import '../App.css';

class UserComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            defaultColDef: {
                width: 324,
                sortable: true,
                filter: true,
                resizeable: true
            },
            columnDefs: [
                { headerName: 'Name', field: 'name'},
                { headerName: 'Email', field: 'email'},
                { headerName: 'Phone', field: 'phone'},
                { headerName: 'Actions', field: 'id', cellRenderer: (params) => 
                    <div>
                        <Button variant='outlined' color='primary' onClick={()=> this.getUserById(params.value)}>Update</Button>
                        &nbsp;
                        <Button variant='outlined' color='secondary' onClick={()=> this.deleteUserById(params.value)}>Delete</Button>
                    </div>    
                }
            ],
            rowData: [],
            modalOpen: false,
            isUpdate: false,
            formData: {
                id: "", name: "", email: "", phone: ""
            }
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    handleClickOpen = () => {
        console.log("Add User");
        this.setState({modalOpen: true})
      };

    handleClose = () => {
        this.setState(
            {
                modalOpen: false,
                isUpdate: false, 
                formData: { id: "", name: "", email: "", phone: ""}
            }
        )
    };  

    onChange = (e) => {
        const {id, value} = e.target;
        const updatedState = {[id]: value};
        this.setState({formData: {...this.state.formData, ...updatedState}});
    }

    handleSubmit = () => {
        if(this.state.isUpdate) {
            UserService.updateUserById(this.state.formData)
            .then(() => {
                this.handleClose();
                this.fetchUsers();
            })
        }
        else {
            UserService.addUser(this.state.formData)
            .then(() => {
                this.handleClose();
                this.fetchUsers();
            })
        }
        
    }

    fetchUsers() {
        UserService.getUsers()
            .then(res => {
                this.setState({
                    users: res.data,
                    rowData: res.data
                })
            })
            .catch(err => console.err(err));
    }

    getUserById(id) {
        console.log("Update User: ", id)
        this.setState({isUpdate: true});
        UserService.getUserById(id)
            .then(res => {
                console.log(res);
                this.setState({
                    formData: res.data
                })
                console.log(this.state.formData)
                this.handleClickOpen()
            })
            .catch(err => console.err(err));
    }

    deleteUserById(id) {
        console.log("Delete User: ", id)
        UserService.deleteUserById(id)
            .then(() => {
                this.fetchUsers();
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div
                        className='ag-theme-alpine mx-auto'
                        style={{
                            width: 1300,
                            height: 600
                        }}
                    >
                        <Grid align="left">
                            <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>Add User</Button>
                        </Grid>
                        <FormDialog
                            open={this.state.modalOpen}
                            handleClose={this.handleClose}
                            data={this.state.formData} 
                            onChange={this.onChange}
                            handleSubmit={this.handleSubmit}
                            isUpdate={this.state.isUpdate}
                        />
                        <AgGridReact
                            className='mt-3'
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            editType={'fullRow'}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserComponent;