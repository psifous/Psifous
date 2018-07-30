import {
  CANDIDATE_CHECKED
} from './actionTypes';

export const checkCandidateSuccess = (payload) => {
  return {
    type: CANDIDATE_CHECKED,
    payload
  }
};

export const selectCandidate = (index) => {
  return (dispatch) => {
    dispatch(checkCandidateSuccess(index))    
  };
}