import React from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';
import Election from '@/ethereum/election';
import web3 from '@/ethereum/web3';
import { Router } from '@/routes';
import Layout from '@/components/Layout/Layout';
import VoteCard from '@/components/VoteCard/VoteCard';
import { fetchElection } from '@/store/actions/election/electionActions';
import {
  startLoading,
  stopLoading
} from '../../../../../store/actions/ui/uiActions';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

class ElectionPage extends React.Component {
  static async getInitialProps(ctx) {
    const { electionid } = ctx.query;

    await ctx.reduxStore.dispatch(
      fetchElection({
        communityId: ctx.query.communityid,
        electionId: electionid
      })
    );

    return {};
  }

  socket = null;

  componentDidMount() {
    this.socket = io('https://socket.dwikyerl.me');
  }

  onVoteCandidate = async () => {
    let toastId;
    try {
      toastId = toast('Submitting your vote to blockchain ....', {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        autoClose: false,
        closeButton: false,
        draggable: false,
        draggablePercent: 80
      });
      this.props.startLoading();

      const accounts = await web3.eth.getAccounts();
      const ethElection = await Election(this.props.election.blockchainAddress);
      await ethElection.methods
        .submitVote(this.props.selectedCandidate, this.props.userData.id)
        .send({
          from: accounts[0]
        });

      toast.update(toastId, {
        render: 'Vote added to blockchain successfully',
        type: toast.TYPE.INFO,
        closeOnClick: true,
        autoClose: 3000,
        closeButton: true,
        draggable: true,
        draggablePercent: 80
      });

      this.props.stopLoading();

      this.socket.emit('newVote', 'voting');

      Router.pushRoute('electionPage', {
        communityid: this.props.election.CommunityId,
        electionid: this.props.election.id
      });
    } catch (err) {
      console.log(err);
      toast.dismiss(toastId);
      this.props.stopLoading();
      if (err.message.includes('address')) {
        toast.error('Failed to vote, please make sure metamask is installed', {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.error('Failed to vote, you rejected the vote', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  };

  onClick = () => {
    this.socket.emit('newVote', 'voting');
  };

  render() {
    return (
      <Layout>
        {/* <Button onClick={this.onClick} content="Click me" /> */}
        <VoteCard
          election={this.props.election}
          candidates={this.props.candidates}
          onVoteCandidate={this.onVoteCandidate}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    election: state.election.election,
    candidates: state.election.candidates,
    isLogin: state.auth.isLogin,
    selectedCandidate: state.vote.selectedCandidate,
    userData: state.auth.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startLoading: () => dispatch(startLoading()),
    stopLoading: () => dispatch(stopLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectionPage);
