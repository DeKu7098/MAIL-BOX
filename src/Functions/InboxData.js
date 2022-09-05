import axios from 'axios';
import './DeleteButton.css';
const InboxData = (props) => {
    const id = props.id;
    console.log(id);  
    const deleteHandler = () => {
       const email1 = localStorage.getItem('email');
       console.log(email1);
      axios.delete(`https://react-http-61cce-default-rtdb.firebaseio.com/${email1}/inbox/${id}.json`);
    }
    console.log(props.data);
    return ( <div>
       <span>From</span> <li>{props.from}</li>
       <span>Subject</span> <li>{props.sub}</li>
       <li>{props.text}</li>
    <li>{props.seen}</li>
    <li>{props.date}</li>
    
    {/* <button onClick={deleteHandler}>Delete</button> */}
    <button className="bn54" onClick={deleteHandler}>
    <span className="bn54span">Delete</span>
  </button>
    </div>
    
   
  )
};

export default InboxData;