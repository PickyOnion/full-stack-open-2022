const Notification = ({ message, notificationType }) => {
  if (message === null) {
    return null;
  }
// classname should be either confirmation or error
  return <div className={notificationType}>{message}</div>;
};

export default Notification;
