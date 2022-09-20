import { createSlice } from "@reduxjs/toolkit";

export const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        id: getId(),
        votes: 0,
      });
    },
    voteAnecdote(state, action) {
      console.log("action", action);
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
export default anecdoteSlice.reducer;
