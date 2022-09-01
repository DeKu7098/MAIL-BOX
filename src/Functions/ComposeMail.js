import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useState } from "react";
import swal from "sweetalert";
import { sendActions } from "../Store";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

const ComposeMail = () => {
    const dispatch = useDispatch();
    const send = useSelector((state) => state.send.items);
    const email = useSelector((state) => state.auth.email);
    const enteredEmailRef = useRef();
    const enteredSubRef = useRef();
    console.log(send);
const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });



const editorChangeHandler = (state) => {
    setEditorState(state);
 };
  
const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = enteredEmailRef.current.value;
    const enteredSub = enteredSubRef.current.value;
    const toUser = enteredEmail.replace(/[^a-zA-Z]/g, "");
    const item = editorState.getCurrentContent().getPlainText();

    const input = {
        email: enteredEmail,
        sub: enteredSub,
        from: email,
        text: item,
        date: new Date().toString(),
        seen: false,
    };
    fetch(
        `https://react-http-61cce-default-rtdb.firebaseio.com/${toUser}/inbox.json`,
        {
            method:"POST",
            body: JSON.stringify(input),
        }
    ).then((res) => {
        if(res.ok){
            swal("Mail Sent","Successfully!");
            dispatch(sendActions.addSend(input));
            fetch(
                `https://react-http-61cce-default-rtdb.firebaseio.com/${email}/sent.json`,
                {
                    method:"POST",
                    body:JSON.stringify(input),
                }
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    console.log(input);
}
  
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
            <h2>New Email</h2>
        </div>
        <div>
            <label>To</label>
            <input type='email' id='mailId' ref={enteredEmailRef} required/>
        </div>
        <div>
            <label>Subject</label>
            <input type='text' ref={enteredSubRef}/>
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={editorChangeHandler}
        />
        <button>Send Mail</button>
      </form>
    </div>
  );
};

export default ComposeMail;
