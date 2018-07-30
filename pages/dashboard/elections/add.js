import React, { Component } from 'react';
import {
  Form,
  Header,
  Input,
  TextArea,
  Button,
  Message
} from 'semantic-ui-react';
import axios from '@/axios';
import { Router } from '@/routes';
import electionFactory from '@/ethereum/electionFactory';
import web3 from '@/ethereum/web3';
import Layout from '@/components/Layout/Layout';
import '@/static/css/react-widgets.css';
import '@/styles/index.css';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

Moment.locale('en');
momentLocalizer();

class ElectionNew extends Component {
  static async getInitialProps(ctx) {
    const { data: info } = await axios.get('/api/users/me', {
      headers: {
        Authorization: ctx.authtoken
      }
    });

    const { communityId } = info.user;

    return { communityId };
  }

  state = {
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    errorMessage: '',
    loading: false
  };

  onElectionSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

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
        name: this.state.name,
        description: this.state.description,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        blockchainAddress: electionAddress,
        CommunityId: this.props.communityId
      };

      const { data } = await axios.post('/api/elections', electionData);
      console.log(data);
      Router.pushRoute('/dashboard');
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Header as="h2">Create a Election</Header>
        <Form
          onSubmit={this.onElectionSubmit}
          error={!!this.state.errorMessage}
        >
          <Form.Field>
            <label>Name</label>
            <Input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Election Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea
              autoHeight
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              rows={2}
              placeholder="Election Description"
            />
          </Form.Field>
          <Form.Field>
            <label>Start Date</label>
            <DateTimePicker
              value={this.state.startDate}
              onChange={value => this.setState({ startDate: value })}
            />
          </Form.Field>
          <Form.Field>
            <label>End Date</label>
            <DateTimePicker
              value={this.state.endDate}
              onChange={value => this.setState({ endDate: value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} fluid primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default ElectionNew;
