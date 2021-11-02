import React, { useState, useContext } from "react";
import { EditorState, convertToRaw } from "draft-js";
// import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { Redirect } from "react-router-dom";
import BlogContext from "../contexts/BlogContext";
import UserContext from "../contexts/UserContext";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [content, setContent] = useState("");
  const [headline, setHeadline] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const userCtx = useContext(UserContext);
  const authorId = userCtx.state.userId;
  const authorName = userCtx.state.username;

  const blogCtx = useContext(BlogContext);
  const upload = () => {
    blogCtx.createBlog(title, content, authorId, authorName);
  };
  console.log(blogCtx);
  return (
    <div className="flex items-center justify-center px-5 py-5 bg-white">
      {blogCtx.state.saving && <Redirect to="/" />}
      {!userCtx.state.userId && <Redirect to="/" />}
      <div className="w-full xl:max-w-5xl lg:max-w-3xl md:max-w-xl">
        {/* <div>
          <label>Preview</label>
          <div className="p-2 border ql-container">
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </div>
        </div> */}
        <div className="flex flex-col w-full mt-5 ">
          <label>Title</label>
          <input
            className="rounded"
            type="text"
            placeholder="enter a title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label>Picture URL</label>
          <input
            className="rounded"
            type="text"
            placeholder="enter a title"
            onChange={(event) => setPicture(picture)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label> Headline</label>
          <input
            className="rounded"
            type="text"
            placeholder="enter a title"
            onChange={(event) => setHeadline(headline)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label> Content</label>
          <div className="h-full border rounded">
            <Editor
              editorState={editorState}
              wrapperClassName="card"
              editorClassName="card-body"
              onEditorStateChange={(newState) => {
                setEditorState(newState);
                setContent(
                  draftToHtml(convertToRaw(newState.getCurrentContent()))
                );
              }}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "history",
                  "embedded",
                  "emoji",
                  "image",
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </div>
        </div>
        <div
          className="flex items-center justify-center w-full mt-5 bg-gray-200 rounded-full cursor-pointer hover:bg-green-600 "
          onClick={upload}
        >
          <button className="inline-flex items-center text-4xl text-gray-900">
            {<HiOutlineCloudUpload className="mr-2" />} Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
