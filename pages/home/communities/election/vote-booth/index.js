import React from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';
import Election from '@/ethereum/election';
import web3 from '@/ethereum/web3';
import { Router } from '@/routes';
import Layout from '@/components/Layout/Layout';
import VoteCard from '@/components/VoteCard/VoteCard';
import { fetchElection } from '@/store/actions/election/electionActions';
import { toast } from 'react-toastify';

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

      const accounts = await web3.eth.getAccounts();
      const ethElection = await Election(this.props.election.blockchainAddress);
      await ethElection.methods.submitVote(this.props.selectedCandidate).send({
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

      Router.pushRoute('electionPage', {
        communityid: this.props.election.CommunityId,
        electionid: this.props.election.id
      });
    } catch (err) {
      console.log(err);
      toast.dismiss(toastId);
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

  render() {
    return (
      <Layout>
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
    selectedCandidate: state.vote.selectedCandidate
  };
};

const mapDispatchToProps = state => {};

export default connect(
  mapStateToProps,
  null
)(ElectionPage);
