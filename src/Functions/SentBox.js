import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './InboxButton.css';
import SentBoxData from "./SentBoxData";





const SentBox = () => {
 const email = useSelector(state => state.auth.email);
 console.log(email);
 const [sentBoxData, setSentBoxData] = useState([]);
useEffect(() => {
    fetch(
    `https://react-http-61cce-default-rtdb.firebaseio.com/${email}/sent.json`
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
                    to: data[key].to,
                    
                })
            }
            setSentBoxData(loadedData);

            // console.log(inboxData);
            // console.log(response);
            //console.log(loadedData);
        })
       }
       
       
 })},[email]); 
 
 
    
    const display = sentBoxData.map((sent) => (
            
           <SentBoxData to={sent.to}
                     email={sent.email}
                     sub={sent.sub}
                     date={sent.date}
                     seen={sent.seen}
                     text={sent.text}
                     id={sent.key}/>
                    
      
       
    ))
      console.log(sentBoxData);

 return (
    <div>
        
       <li>{display}</li> 
        
    </div>
    
 )
};

export default SentBox;