import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  deleteNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const activeFilter = useSelector((state) => state.filter.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(activeFilter)
    )
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
