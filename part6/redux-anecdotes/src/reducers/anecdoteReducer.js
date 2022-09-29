import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const votedAnecdote = state.find(
        (anecdote) => anecdote.id === action.payload.id
      );

      const newState = state.map((anecdote) => {
        return anecdote.id === action.payload.id
          ? {
              ...votedAnecdote,
              votes: votedAnecdote.votes + 1,
            }
          : anecdote;
      });
      return newState.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newNote));
  };
};

export const upvoteAnecdote = (anecdote) => {
  console.log("anecdote", anecdote);
  return async (dispatch) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.update(anecdote.id, votedAnecdote);
    dispatch(voteAnecdote(anecdote));
  };
};

export default anecdoteSlice.reducer;
