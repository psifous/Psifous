import React, { Component } from 'react';
import {
  Form,
  Header,
  Input,
  TextArea,
  Button,
  Message
} from 'semantic-ui-react';
import axios from 'axios';
import Election from '../../../../ethereum/election';
import web3 from '../../../../ethereum/web3';
import Layout from '../../../../components/Layout/Layout';

class CandidateAdd extends Component {
  state = {
    name: '',
    description: '',
    image: null,
    loading: false,
    errorMessage: ''
  };

  onAddCandidate = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('ElectionId', 1);
    formData.append('image', this.state.image);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const { data } = await axios.post('/api/candidates', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      } else {
        this.setState({ errorMessage: err.message });
      }
    }
    this.setState({ loading: false });
  };

  render() {
    let dropboxMessage = (
      <span>
        Drag your image here to begin<br /> or click to browse
      </span>
    );

    if (this.state.image) {
      dropboxMessage = <span>{this.state.image.name}</span>;
    }

    return (
      <Layout>
        <Header as="h2">Add a Candidate</Header>
        <Form onSubmit={this.onAddCandidate} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Name</label>
            <Input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Candidate Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea
              autoHeight
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              rows={2}
              placeholder="Candidate Description"
            />
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <div className="dropbox">
              <input
                className="input-file"
                type="file"
                onChange={e => this.setState({ image: e.target.files[0] })}
              />
              <p>{dropboxMessage}</p>
            </div>
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} fluid primary>
            Add Candidate
          </Button>
        </Form>
        <style jsx>{`
          .dropbox {
            outline: 2px dashed grey; /* the dash box */
            outline-offset: -10px;
            background: lightcyan;
            color: dimgray;
            padding: 10px 10px;
            min-height: 200px; /* minimum height */
            position: relative;
            cursor: pointer;
          }

          .input-file {
            opacity: 0; /* invisible but it's there! */
            width: 100%;
            height: 200px;
            position: absolute;
            cursor: pointer;
          }

          .dropbox:hover {
            background: lightblue; /* when mouse over to the drop zone, change color */
          }

          .dropbox p {
            font-size: 1.2em;
            text-align: center;
            padding: 50px 0;
          }
        `}</style>
      </Layout>
    );
  }
}

export default CandidateAdd;
