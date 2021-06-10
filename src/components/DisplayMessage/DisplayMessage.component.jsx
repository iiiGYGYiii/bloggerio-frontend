// MODULES
import { useSelector } from "react-redux";
//STYLES
import "./DisplayMessage.style.css";

const messageSelector = state=>state.notification;

const DisplayMessage = () =>{
  const {message, isBad} = useSelector(messageSelector);
  return message&&(<div className={isBad ? "bad-msg" : "good-msg"}>
    <h2>{message}</h2>
  </div>
)};

export default DisplayMessage;
