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
import Spinner from "../components/spinner";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [content, setContent] = useState("");
  const [headline, setHeadline] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showNotification, setShowNotification] = useState(false);
  const authorId = localStorage.getItem("userId");
  const authorName = localStorage.getItem("username");

  const blogCtx = useContext(BlogContext);
  const upload = () => {
    blogCtx.postBlog(title, content, authorId, authorName);
    setShowNotification(() => setShowNotification(true));
  };
  const userCtx = useContext(UserContext);

  return (
    <>
      {blogCtx.state.saving ? (
        <Spinner />
      ) : (
        <>
          {showNotification && <Notification />}
          <div className="flex items-center justify-center px-5 py-5 bg-white">
            {!localStorage.getItem("token") && <Redirect to="/" />}
            {!userCtx.state.token && <Redirect to="/" />}
            <div className="w-full xl:max-w-5xl lg:max-w-3xl md:max-w-xl">
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
                      setShowNotification(false);
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
        </>
      )}
    </>
  );
};

export default EditPage;

const Notification = () => {
  return (
    <div
      className="flex items-center justify-center w-full px-4 py-3 mt-2 text-sm font-bold text-white bg-green-500"
      role="alert"
    >
      <svg
        className="w-4 h-4 mr-2 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
      </svg>
      <p>The blog is successfully published.</p>
    </div>
  );
};
