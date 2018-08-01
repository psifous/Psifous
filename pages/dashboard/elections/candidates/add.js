import React, { Component } from 'react';
import {
  Form,
  Header,
  Input,
  TextArea,
  Button,
  Message,
  Segment,
  Icon
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import axios from '@/axios';
import { Router } from '@/routes';
import Election from '@/ethereum/election';
import web3 from '@/ethereum/web3';
import Layout from '@/components/Layout/Layout';

class CandidateAdd extends Component {
  static async getInitialProps(ctx) {
    const response = await axios.get(`/api/elections/${ctx.query.address}`);

    const { blockchainAddress } = response.data.value;

    return { blockchainAddress, address: ctx.query.address };
  }

  state = {
    controls: {
      name: '',
      description: '',
      image: null
    },
    isValid: false,
    loading: false,
    errorMessage: ''
  };

  checkValidity = () => {
    const controls = { ...this.state.controls };
    let isValid = true;
    const nameValue = controls.name.trim() !== '';
    const descriptionValue = controls.description.trim();

    isValid =
      nameValue !== '' &&
      descriptionValue !== '' &&
      descriptionValue.length <= 250 &&
      descriptionValue.length >= 30 &&
      isValid;

    console.log(typeof controls.description);

    isValid = controls.image !== null && isValid;

    this.setState({
      isValid
    });
  };

  handleChange = (prop, value) => {
    this.setState(
      prevState => {
        return {
          controls: {
            ...prevState.controls,
            [prop]: value
          }
        };
      },
      () => this.checkValidity()
    );
  };

  onAddCandidate = async e => {
    e.preventDefault();
    if (this.state.isValid) {
      const toasId = toast('Adding candidate to blockchain ....', {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        autoClose: false,
        closeButton: false,
        draggable: false
      });
      const formData = new FormData();
      formData.append('name', this.state.controls.name);
      formData.append('description', this.state.controls.description);
      formData.append('ElectionId', this.props.address);
      formData.append('image', this.state.controls.image);

      this.setState({ loading: true, errorMessage: '' });

      try {
        const { data } = await axios.post('/api/candidates', formData);

        console.log(data);

        const { id, name } = data.value;

        const accounts = await web3.eth.getAccounts();

        const ethElection = await Election(this.props.blockchainAddress);

        await ethElection.methods.addCandidate(id, name).send({
          from: accounts[0]
        });

        toast.update(toasId, {
          render: 'Candidate added to blockchain successfully',
          type: toast.TYPE.INFO,
          closeOnClick: true,
          autoClose: 3000,
          closeButton: true,
          draggable: true
        });

        Router.pushRoute(`/dashboard/elections/${this.props.address}`);
      } catch (err) {
        toast.update(toasId, {
          render: 'Failed to add candidate to blockchain',
          type: toast.TYPE.ERROR,
          closeOnClick: true,
          autoClose: 3000,
          closeButton: true,
          draggable: true
        });
        console.log(err);
        if (err.response) {
          console.log(err.response);
        } else {
          this.setState({ errorMessage: err.message });
        }
      }
      this.setState({ loading: false });
    }
  };

  render() {
    let dropboxMessage = (
      <React.Fragment>
        <span>
          <Icon name="images" size="big" />
        </span>
        <br />
        <span>
          Drag your image here to begin<br /> or click to browse
        </span>
      </React.Fragment>
    );

    if (this.state.controls.image) {
      dropboxMessage = <span>{this.state.controls.image.name}</span>;
    }

    return (
      <Layout>
        <Header as="h2" inverted>
          Add a Candidate
        </Header>
        <Segment>
          <Form
            onSubmit={this.onAddCandidate}
            error={!!this.state.errorMessage}
          >
            <Form.Field>
              <label>Name</label>
              <Input
                value={this.state.controls.name}
                onChange={e => this.handleChange('name', e.target.value)}
                placeholder="Candidate Name"
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <TextArea
                autoHeight
                value={this.state.controls.description}
                onChange={e => this.handleChange('description', e.target.value)}
                rows={2}
                placeholder="Candidate Description"
              />
              <p
                style={{
                  textAlign: 'right',
                  color: `${
                    this.state.controls.description.length > 250 ||
                    this.state.controls.description.length < 30
                      ? 'red'
                      : 'black'
                  }`
                }}
              >
                {this.state.controls.description.length} / 250
              </p>
            </Form.Field>
            <Form.Field>
              <label>Image</label>
              <div className="dropbox">
                <input
                  className="input-file"
                  type="file"
                  accept="image/*"
                  onChange={e => this.handleChange('image', e.target.files[0])}
                />
                <p>{dropboxMessage}</p>
              </div>
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button
              loading={this.state.loading}
              fluid
              primary
              disabled={!this.state.isValid}
            >
              Add Candidate
            </Button>
          </Form>
        </Segment>
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
