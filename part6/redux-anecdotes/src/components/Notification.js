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
  } else {
    return <div style={style}>{notification[0]}</div>;
  }
};

export default Notification;
