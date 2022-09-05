import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './InboxButton.css';
import InboxData from "./InboxData";




const Inbox = () => {
 const email = useSelector(state => state.auth.email);
 console.log(email);
 const [inboxData, setInboxData] = useState([]);
 
useEffect(() => {
    fetch(
    `https://react-http-61cce-default-rtdb.firebaseio.com/${email}/inbox.json`
 ).then((res) => {
    if(res.ok){

        res.json().then((res) => {
            const data = res;
            console.log(data);
            const loadedData = [];
            for(const key in data){
                loadedData.push({
                    id: key,
                    key: key,
                    sub: data[key].sub,
                    text: data[key].text,
                    email: data[key].email,
                    date: data[key].date,
                    seen: data[key].seen,
                    from: data[key].from
                })
            }
            setInboxData(loadedData);

            // console.log(inboxData);
            // console.log(response);
            //console.log(loadedData);
        })
       }
       
       
 })},[email]); 
 
 
    
    const display = inboxData.map((inbox) => (
            
           <InboxData from={inbox.from}
                     sub={inbox.sub}
                     date={inbox.date}
                     seen={inbox.seen}
                     text={inbox.text}
                     id={inbox.key}
                     />
                    
      
       
    ))
      console.log(inboxData);

 return (
    <div>
        
       <li>{display}</li> 
        
    </div>
    
 )
};

export default Inbox;