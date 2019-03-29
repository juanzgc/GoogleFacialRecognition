import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {Helmet } from 'react-helmet';
import {Image} from 'react-bootstrap'
import '../styles/Home.css'

import { Card, Image as Image2 } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';

import ImageGrid from '../components/ImageGrid'


// background color: #2695d5

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: undefined,
      data: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    // alert('Name: ' + this.state.name + ', submitted');
    event.preventDefault();

    fetch('/api/postName', {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      alert("Data returned from Google");
      this.setState({data: data});
    })
  }

  render() {

    return (
    <div className="App">
      <Helmet>
          <style>{'body { background-color: #f4fbff; }'}</style>
      </Helmet>
      <div style={{height: 400}}>
        <Image style={{maxHeight: '100%', width: '100%', objectPosition: 'center', objectFit: 'cover'}} src={process.env.PUBLIC_URL + '/images/home_background.jpg'} fluid alt="Background"/>
      </div>
      <div className="center" style={{marginTop: 20, marginBottom: 20}}>
      <Card>
        <Card.Content>
          <Image2 floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          <Card.Header>Google Face Detection API</Card.Header>
          <Card.Meta>Find yourself today!</Card.Meta>
          <Card.Description>
            Are you thinking of applying to jobs but worried about what potential employers may find after a Google search of your name?
          </Card.Description>
          <Card.Description>
            <strong>No need to worry!</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Description>Enter your name below to begin</Card.Description>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-name"
              label="Full Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
            />
          </form>
        </Card.Content>
      </Card>
      </div>

      {
        this.state.data ? <ImageGrid data={this.state.data} /> : null 
      }

    </div>
    );
  }
}
export default Home;