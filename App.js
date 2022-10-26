import React, { Component } from "react";
import "./index.css";
import { TextEditor } from "./components/min/text-editor";
import { CommentEditorRed } from "./components/min/comment-editor/red";
import { CommentEditorYellow } from "./components/min/comment-editor/yellow";
import { CommentEditorBlue } from "./components/min/comment-editor/blue";
import Header from "./components/Header";
import userIMG from "./img/user.png";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <p className="page-title">John Doe Interview</p>
          <div className="App">
            <TextEditor />
          </div>
          <div className="wrapper">
            <div className="comments-block">
              <div className="comment-red">
                <div className="avatar">
                  <img src={userIMG} />
                </div>
                <div className="editor">
                  <div className="avatar-info">
                    <p>
                      Speaker 1 <span>09:45</span>
                    </p>
                  </div>
                  <div className="speaker-comment">
                    <CommentEditorRed />
                  </div>
                </div>
              </div>
              <div className="comment-red">
                <div className="avatar">
                  <img src={userIMG} />
                </div>
                <div className="editor">
                  <div className="avatar-info">
                    <p>
                      Speaker 2 <span>07:45</span>
                    </p>
                  </div>
                  <div className="speaker-comment">
                    <CommentEditorBlue />
                  </div>
                </div>
              </div>
              <div className="comment-red">
                <div className="avatar">
                  <img src={userIMG} />
                </div>
                <div className="editor">
                  <div className="avatar-info">
                    <p className="speaker">
                      Speaker 3<span>04:45</span>
                    </p>
                  </div>
                  <div className="speaker-comment">
                    <CommentEditorYellow />
                  </div>
                </div>
              </div>
            </div>

            <div className="buttons">
              <button className="red-btn">Lot of Calls...</button>
              <button className="blue-btn">Frequency of use...</button>
              <button className="yellow-btn">Lot of Calls...</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
