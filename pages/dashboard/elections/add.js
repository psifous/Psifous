import React, { Component } from 'react';
import {
  Form,
  Header,
  Input,
  TextArea,
  Button,
  Message,
  Segment
} from 'semantic-ui-react';
import axios from '@/axios';
import { Router } from '@/routes';
import electionFactory from '@/ethereum/electionFactory';
import web3 from '@/ethereum/web3';
import Layout from '@/components/Layout/Layout';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { toast } from 'react-toastify';

moment.locale('en');
momentLocalizer();

class ElectionNew extends Component {
  static async getInitialProps(ctx) {
    return { communityId: ctx.userData.communityId };
  }

  state = {
    controls: {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(new Date().setHours(new Date().getHours() + 1))
    },
    errorMessage: '',
    loading: false,
    isValid: false
  };

  checkValidity = () => {
    const controls = { ...this.state.controls };
    let isValid = true;
    isValid =
      controls.name.trim() !== '' &&
      controls.description.trim() !== '' &&
      isValid;

    isValid =
      moment(controls.startDate).isBefore(moment(controls.endDate)) && isValid;

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

  onElectionSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    const toastId = toast('Deployed election to blockchain ....', {
      position: toast.POSITION.TOP_RIGHT,
      closeOnClick: false,
      autoClose: false,
      closeButton: false,
      draggable: false,
      draggablePercent: 80
    });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await electionFactory.methods.createElection().send({
        from: accounts[0]
      });

      const elections = await electionFactory.methods
        .getDeployedElections()
        .call();
      const electionAddress = elections[elections.length - 1];

      const electionData = {
        name: this.state.controls.name,
        description: this.state.controls.description,
        startDate: this.state.controls.startDate,
        endDate: this.state.controls.endDate,
        blockchainAddress: electionAddress,
        CommunityId: this.props.communityId
      };

      const { data } = await axios.post('/api/elections', electionData);

      toast.update(toastId, {
        render: 'Election deployed to blockchain successfully',
        type: toast.TYPE.INFO,
        closeOnClick: true,
        autoClose: 3000,
        closeButton: true,
        draggable: true,
        draggablePercent: 80
      });
      Router.pushRoute('/dashboard');
    } catch (err) {
      toast.update(toastId, {
        render: 'Failed to deploying election to blockchain',
        type: toast.TYPE.ERROR,
        closeOnClick: true,
        autoClose: 3000,
        closeButton: true,
        draggable: true,
        draggablePercent: 80
      });
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
    return (
      <Layout>
        <Header as="h2" inverted>
          Create a Election
        </Header>
        <Segment>
          <Form
            onSubmit={this.onElectionSubmit}
            error={!!this.state.errorMessage}
          >
            <Form.Field>
              <label>Name</label>
              <Input
                value={this.state.controls.name}
                onChange={e => this.handleChange('name', e.target.value)}
                placeholder="Election Name"
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <TextArea
                autoHeight
                value={this.state.controls.description}
                onChange={e => this.handleChange('description', e.target.value)}
                rows={2}
                placeholder="Election Description"
              />
            </Form.Field>
            <Form.Field>
              <label>Start Date</label>
              <DateTimePicker
                id="start-date"
                value={this.state.controls.startDate}
                onChange={value => this.handleChange('startDate', value)}
              />
            </Form.Field>
            <Form.Field>
              <label>End Date</label>
              <DateTimePicker
                id="end-date"
                value={this.state.controls.endDate}
                onChange={value => this.handleChange('endDate', value)}
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button
              loading={this.state.loading}
              fluid
              primary
              disabled={!this.state.isValid}
            >
              Create!
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default ElectionNew;
