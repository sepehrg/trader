import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = (props) => {
  return (
    <Editor {...props} loading={<p> ...درحال بارگزاری</p>}>
      {props.children}
    </Editor>
  );
};

export default CodeEditor;
