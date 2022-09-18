import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log("notification", notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification.length === 0) {
    return;
  }

  if (notification[0].type === "vote") {
    return <div style={style}>{`You upvoted '${notification[0].title}'`}</div>;
  }

  if (notification[0].type === "create") {
    return <div style={style}>{`You created '${notification[0].title}'`}</div>;
  }
};

export default Notification;
