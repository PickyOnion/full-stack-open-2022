import { connect } from "react-redux";

const Notification = (props) => {
  console.log("props.notification", props.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (Object.keys(props.notification).length === 0) {
    return;
  } else {
    return <div style={style}>{props.notification.message}</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
