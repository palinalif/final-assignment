import "./style.css";

const UserItem = (props) => {
  return (
    <div>
        <p>{props.data}</p>
        <button>Kick</button>
        <button>Ban</button>
        <button>OP</button>
    </div>
  );
};

export default UserItem;
