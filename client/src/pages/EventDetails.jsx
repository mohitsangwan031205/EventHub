import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

import {
  getEventById,
  deleteEvent,
  getEventMedia,
  uploadMedia,
  deleteMedia,
  bulkDeleteMedia,
} from "../services/eventService";

import { toggleLike, getMediaLikes } from "../services/likeService";

import { getComments, addComment } from "../services/commentService";

import { toggleFavorite, getFavoriteStatus } from "../services/favoriteService";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [likesData, setLikesData] = useState({});
  const [commentsData, setCommentsData] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [favoritesData, setFavoritesData] = useState({});
  const [selectedCommentMedia, setSelectedCommentMedia] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);

        setEvent(data);

        const mediaData = await getEventMedia(id);

        setMedia(mediaData);
        const likesMap = {};

        for (const item of mediaData) {
          const likeInfo = await getMediaLikes(item._id);

          likesMap[item._id] = likeInfo;
        }

        setLikesData(likesMap);
        const commentsMap = {};

        for (const item of mediaData) {
          const comments = await getComments(item._id);

          commentsMap[item._id] = comments;
        }

        setCommentsData(commentsMap);

        const favoritesMap = {};

        for (const item of mediaData) {
          const favoriteInfo = await getFavoriteStatus(item._id);

          favoritesMap[item._id] = favoriteInfo;
        }

        setFavoritesData(favoritesMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);

    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewUrls(previews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select images");

      return;
    }

    try {
      setUploading(true);

      await uploadMedia(id, selectedFiles, visibility);

      setUploading(false);

      alert("Images uploaded successfully");

      const mediaData = await getEventMedia(id);

      setMedia(mediaData);

      setSelectedFiles([]);
      setPreviewUrls([]);
      setVisibility("public");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploading(false);
      console.log(error);

      alert(error.response?.data?.message || "Upload failed");
    }
  };

  const toggleImageSelection = (mediaId) => {
    setSelectedImages((prev) => {
      if (prev.includes(mediaId)) {
        return prev.filter((id) => id !== mediaId);
      }

      return [...prev, mediaId];
    });
  };

  const handleLike = async (mediaId) => {
    try {
      await toggleLike(mediaId);

      const updated = await getMediaLikes(mediaId);

      setLikesData((prev) => ({
        ...prev,
        [mediaId]: updated,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) {
      alert("Select images first");

      return;
    }

    const confirmDelete = window.confirm(
      `Delete ${selectedImages.length} images?`,
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await bulkDeleteMedia(selectedImages);

      const mediaData = await getEventMedia(id);

      setMedia(mediaData);

      setSelectedImages([]);

      setDeleting(false);

      alert("Images deleted successfully");
    } catch (error) {
      setDeleting(false);

      console.log(error);

      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleComment = async (mediaId) => {
    const text = commentInputs[mediaId];

    if (!text?.trim()) {
      return;
    }

    try {
      await addComment(mediaId, text);

      const updated = await getComments(mediaId);

      setCommentsData((prev) => ({
        ...prev,
        [mediaId]: updated,
      }));

      if (selectedCommentMedia && selectedCommentMedia._id === mediaId) {
        setSelectedCommentMedia({
          ...selectedCommentMedia,
        });
      }
      setCommentInputs((prev) => ({
        ...prev,
        [mediaId]: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async (mediaId) => {
    try {
      await toggleFavorite(mediaId);

      const updated = await getFavoriteStatus(mediaId);

      setFavoritesData((prev) => ({
        ...prev,
        [mediaId]: updated,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (imageUrl, eventName, userName) => {
    try {
      const img = new Image();

      img.crossOrigin = "anonymous";

      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        canvas.width = img.width;

        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);

        ctx.font = "10px Arial";

        ctx.fillStyle = "rgba(255,255,255,0.7)";

        const watermarkText = `${eventName} | ${userName}`;
        ctx.drawImage(img, 0, 0);
        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);

        ctx.rotate(-Math.PI / 4);

        ctx.font = "bold 70px Arial";

        ctx.fillStyle = "rgba(0, 0, 0, 0.18)";

        ctx.textAlign = "center";

        for (let y = -800; y <= 800; y += 150) {
          ctx.fillText(`${eventName} | ${userName}`, 0, y);
        }

        ctx.restore();

        const link = document.createElement("a");

        link.download = "watermarked-image.jpg";

        link.href = canvas.toDataURL("image/jpeg");

        link.click();
      };
    } catch (error) {
      console.log(error);
    }
  };
  const handleShare = async (imageUrl) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "EventHub Image",

          url: imageUrl,
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);

        alert("Image link copied!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(event._id);

      alert("Event deleted successfully");

      navigate("/events");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (!event) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const isCreator = currentUser?._id === event?.createdBy?._id;

  const isAdmin = currentUser?.role === "admin";

  const canUploadMedia =
    isCreator ||
    ["admin", "photographer", "clubMember"].includes(currentUser?.role);

  // console.log("Current User:", currentUser);
  // console.log("Event Creator:", event?.createdBy);
  // console.log(
  //   "Comparison:",
  //   currentUser?._id,
  //   event?.createdBy?._id
  // );

  return (
    <Layout>
      <div className="event-details">
        <div className="event-info-card">
          <h1>{event.title}</h1>

          <p className="event-description">{event.description}</p>

          <div className="event-meta">
            <p>1. Location : {event.location}</p>

            <p>2. Category : {event.category}</p>

            <p>3. Date Created : {new Date(event.date).toLocaleDateString()}</p>

            <p>4. Created by : {event.createdBy?.name}</p>

            <p> 5. User Email : {event.createdBy?.email}</p>
          </div>
        </div>

        {canUploadMedia && (
          <div className="upload-section">
            <div
              className={dragActive ? "drag-area active" : "drag-area"}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="drag-content">
                <div className="drag-icon">📸</div>

                <h3>Drag Images Here</h3>

                <p>or click below to browse</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => {
                  const files = Array.from(e.target.files);

                  setSelectedFiles(files);

                  const previews = files.map((file) =>
                    URL.createObjectURL(file),
                  );

                  setPreviewUrls(previews);
                }}
              />

              <button
                type="button"
                className="browse-btn"
                onClick={() => fileInputRef.current.click()}
              >
                📂 Browse Images
              </button>
            </div>

            {previewUrls.length > 0 && (
              <div className="preview-grid">
                {previewUrls.map((url, index) => (
                  <div key={index} className="preview-wrapper">
                    <img src={url} alt="preview" className="preview-image" />

                    <button
                      className="remove-preview-btn"
                      onClick={() => {
                        const updatedFiles = selectedFiles.filter(
                          (_, i) => i !== index,
                        );

                        const updatedPreviews = previewUrls.filter(
                          (_, i) => i !== index,
                        );

                        setSelectedFiles(updatedFiles);

                        setPreviewUrls(updatedPreviews);

                        if (fileInputRef.current) {
                          const dataTransfer = new DataTransfer();

                          updatedFiles.forEach((file) =>
                            dataTransfer.items.add(file),
                          );

                          fileInputRef.current.files = dataTransfer.files;
                        }
                      }}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            )}

            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">🌍 Public (Everyone)</option>

              <option value="private">🔒 Private (Club Members Only)</option>
            </select>

            {selectedFiles.length > 0 && (
              <p className="selected-files">
                Selected: {selectedFiles.length} image(s)
              </p>
            )}

            <button className="upload-btn" onClick={handleUpload}>
              {uploading ? "Uploading..." : "Upload Images"}
            </button>
          </div>
        )}

        <h2 className="gallery-title">Event Gallery</h2>

        {(isCreator || isAdmin) && selectedImages.length > 0 && (
          <button
            className="bulk-delete-btn"
            onClick={handleBulkDelete}
            disabled={deleting}
          >
            {deleting
              ? `Deleting ${selectedImages.length} item(s)...`
              : `Delete Selected (${selectedImages.length})`}
          </button>
        )}

        <div className="gallery-grid">
          {media.length > 0 ? (
            media.map((item) => (
              <div key={item._id} className="gallery-item">
                <div className="image-container">
                  <span
                    className={
                      item.visibility === "private"
                        ? "private-badge"
                        : "public-badge"
                    }
                  >
                    {item.visibility === "private" ? "🔒 Private" : "🌍 Public"}
                  </span>

                  {(isCreator || isAdmin) && (
                    <input
                      type="checkbox"
                      className="image-checkbox"
                      checked={selectedImages.includes(item._id)}
                      onChange={() => toggleImageSelection(item._id)}
                    />
                  )}

                  <img
                    src={item.mediaUrl}
                    alt="event"
                    className="gallery-image"
                  />
                </div>

                <div className="action-row">
                  <button
                    className="action-btn"
                    onClick={() => handleLike(item._id)}
                  >
                    {likesData[item._id]?.likedByUser ? "❤️" : "🤍"}{" "}
                    {likesData[item._id]?.count || 0}
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => setSelectedCommentMedia(item)}
                  >
                    💬 {commentsData[item._id]?.length || 0}
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => handleFavorite(item._id)}
                  >
                    {favoritesData[item._id]?.favorited ? "⭐" : "🩶"}
                  </button>

                  <button
                    className="action-btn"
                    onClick={() =>
                      handleDownload(
                        item.mediaUrl,
                        event.title,
                        currentUser?.name,
                      )
                    }
                  >
                    ⬇️
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => handleShare(item.mediaUrl)}
                  >
                    🚀
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-gallery">
              <p>
                No images uploaded yet
                <br />
                (Browse/drag images to upload)
              </p>
            </div>
          )}
        </div>

        {selectedCommentMedia && (
          <div
            className="comment-modal-overlay"
            onClick={() => setSelectedCommentMedia(null)}
          >
            <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Comments</h3>

                <button
                  className="close-btn"
                  onClick={() => setSelectedCommentMedia(null)}
                >
                  ✖
                </button>
              </div>

              <img
                src={selectedCommentMedia.mediaUrl}
                alt="preview"
                className="comment-modal-image"
              />

              <div className="comment-input-row">
                <input
                  type="text"
                  placeholder="Add comment..."
                  value={commentInputs[selectedCommentMedia._id] || ""}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({
                      ...prev,
                      [selectedCommentMedia._id]: e.target.value,
                    }))
                  }
                />

                <button onClick={() => handleComment(selectedCommentMedia._id)}>
                  Post
                </button>
              </div>

              <div className="modal-comments-list">
                {commentsData[selectedCommentMedia._id]?.map((comment) => (
                  <div key={comment._id} className="comment-item">
                    <strong>{comment.user?.name}</strong>

                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(isCreator || isAdmin) && (
          <div className="event-actions">
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit-event/${event._id}`)}
            >
              Edit Event
            </button>

            <button className="delete-btn" onClick={handleDelete}>
              Delete Event
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default EventDetails;
