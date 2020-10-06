import React from 'react'
import Main from '../Templates/Main'
import axios from 'axios'


const headerProps = {
    icon: 'user',
    title: 'Usuario',
    subtitle: 'Cadastro de usuario: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3002/user'

const initialState = {
    user: {name: '', email:''},
    list: []
}


export default  class UserCrud extends React.Component{

    state = { ...initialState}  
      
    componentWillMount(){
        axios.get(baseUrl).then(res => {
            this.setState({list: res.data})   
               
        })
    }

    clean(){
        this.setState({user:initialState.user})        
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put':'post'
        const url = user.id ? `${baseUrl}/${user.id}`: baseUrl
        axios[method](url,user).
        then(resp =>{
            const list = this.getUpdatedList(resp.data)
            this.setState({user: initialState.user, list})
        })        
    }

    getUpdatedList(user){
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value

        this.setState({user})
    }

    load(user){
        this.setState({user})
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list = this.state.list.filter(d => d !== user)
            this.setState({list})
        })
    }
    //
    
    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>                
            </table>
        )
    }   

    renderRows(){
        return(
            this.state.list.map(user => {return(

                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><button className="btn btn-warning" 
                    onClick={()=>this.load(user)}>
                     <i className="fa fa-pencil"></i></button>
                    </td>

                    <td><button className="btn btn-danger ml-2" 
                    onClick={()=> this.remove(user)} ><i
                    className="fa fa-trash" ></i>
                    </button></td>
                </tr>
            )})            
            )
    }

    renderForm(){
       return ( 
        <div className="form">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input name="name" type="text" placeholder="dig seu nome" 
                        value={this.state.user.name} onChange={e=>this.updateField(e)} />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="text" placeholder="dig seu email"
                        value={this.state.user.email} onChange={e=>this.updateField(e)} />
                    </div>
                </div>
            </div>
            <hr/>

            <div className="row">
                <div className="col-12 col-md-6 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={()=>this.save()}
                    >Salvar</button>

                    <button className="btn btn-primary ml-2" onClick={()=>this.clean()} 
                    >Cancelar</button>
                </div>
            </div>
        </div>

        )

    }

    render(){
        
        return(
            <Main {...headerProps}>
               {this.renderForm()}
               {this.renderTable()}
            </Main>
        )
    }
}