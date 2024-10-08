import { useState, useEffect, useContext } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { UserContext } from "../AuthProvider";
import app from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  publishStory,
  unpublishStory,
  fetchPublishedStories,
} from "../publishedStoriesSlice";

function StoryList() {
  const currentUser = useContext(UserContext);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [published, setPublished] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  // const publishedStories = useSelector(state => state.publishedStories);

  useEffect(() => {
    if (currentUser) {
      const fetchUserBlogPosts = async () => {
        try {
          const userPostRef = collection(
            db,
            "userPosts",
            currentUser.uid,
            "posts",
          );
          const snapshot = await getDocs(userPostRef);

          const postList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserPosts(postList);
        } catch (error) {
          console.error("Error fetching user blog posts: ", error);
        }
      };

      fetchUserBlogPosts();
      dispatch(fetchPublishedStories());
    }
  }, [currentUser, db, dispatch]);

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "userPosts", currentUser.uid, "posts", postId));
      setUserPosts(userPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/editStory/${postId}`);
  };

  const handlePublish = (story) => {
    dispatch(publishStory(story));
  };

  const handleUnpublish = async (storyId) => {
    await dispatch(unpublishStory(storyId));
    dispatch(fetchPublishedStories());
  };

  // Inside your component
  return (
    <div className="container">
      <h2 className="my-4">
        <img
          src={`${import.meta.env.BASE_URL}StoryList.png`}
          alt="Story List"
          height="100"
        />
        Your Stories
      </h2>
      <div className="row">
        {userPosts.map((post) => {
          return (
            <div key={post.id} className="col-md-4 mb-4">
              <div
                className="card bg-light mb-3 shadow-sm"
                style={{ maxWidth: "18rem" }}
              >
                <Link
                  to={`/story/${post.id}`}
                  className="text-decoration-none text-body"
                >
                  <div className="card-header">
                    <h5>{post.title}</h5>
                  </div>
                </Link>
                <div className="card-body">
                  <Link
                    to={`/story/${post.id}`}
                    className="text-decoration-none text-body"
                  >
                    <p className="card-text">
                      {post.content.substring(0, 100)}...
                    </p>
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handlePublish(post)}
                  >
                    Publish
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUnpublish(post.id)}
                  >
                    Unpublish
                  </button>
                </div>
                {post.author && (
                  <div className="card-footer">Author: {post.author}</div>
                )}
                <div className="card-footer">
                  {post.createdAt.isEqual(post.updatedAt)
                    ? `Created on: ${post.createdAt.toDate().toLocaleString()}`
                    : `Updated on: ${post.updatedAt.toDate().toLocaleString()}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StoryList;
