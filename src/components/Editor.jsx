import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css"; // Base CodeMirror CSS
import "codemirror/mode/javascript/javascript"; // JavaScript mode
import "codemirror/theme/dracula.css"; // Dracula theme (optional)
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

import { fromTextArea } from "codemirror"; // Import the CodeMirror initialization method
import { ACTIONS } from "../backend/actions";

const Editor = ({socketRef,roomId,onCodeChange}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function init(){
      editorRef.current = fromTextArea(document.getElementById('realTimeEditor'), {
        mode: "javascript", // JavaScript mode
        theme: "dracula", // Apply the Dracula theme
        lineNumbers: true, // Display line numbers
        autoCloseTags: true,
        autoCloseBrackets: true,
      });
      
      editorRef.current.on('change',(instance,changes) => {
        const {origin} = changes
        const code = instance.getValue()
        onCodeChange(code)
        if(origin !== 'setValue'){
          socketRef.current.emit(ACTIONS.CODE_CHANGE,{
            roomId,
            code
          })
        }
      })
    }

    init()
  }, []);

  useEffect(() => {
    socketRef.current?.on(ACTIONS.CODE_CHANGE,({code}) => {
      console.log("Received",code)
      if(code !== null){
        editorRef.current.setValue(code)
      }
    })

    return () => {
      socketRef.current?.off(ACTIONS.CODE_CHANGE)
    }
  },[socketRef.current])

  return <textarea id="realTimeEditor" ref={editorRef} className="editor-textarea"></textarea>; // Editor rendered as a textarea
};

export default Editor;
