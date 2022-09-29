import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        votes: 0,
      });
    },
    voteAnecdote(state, action) {
      const votedAnecdote = state.find(
        (anecdote) => anecdote.id === action.payload
      );

      const newState = state.map((anecdote) => {
        return anecdote.id === action.payload
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

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newNote));
  };
};

export default anecdoteSlice.reducer;
