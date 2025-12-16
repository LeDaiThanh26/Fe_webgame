import React from 'react';
import { ArrowUp } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  time: string;
  text: string;
  likes: number;
  avatarText: string;
  avatarBg: string;
}

const CommentsSection = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="card left-column">
      <div className="section-title" style={{ marginTop: 0 }}>Bình luận</div>

      <div className="comment-header">
        <span style={{ fontSize: '14px', fontWeight: 'normal' }}>2.022 bình luận</span>
        <div className="sort-btn">
          Sắp xếp theo thời gian <ArrowUp size={14} />
        </div>
      </div>

      <div className="input-comment">
        <div className="avatar-circle">
          <img src="https://placehold.co/30" alt="me" />
        </div>
        <input
          type="text"
          className="input-field"
          placeholder="Viết bình luận..."
        />
      </div>

      {comments.map(comment => (
        <div key={comment.id} className="comment-item">
          <div className="avatar-circle">
            <img
              src={`https://placehold.co/30/${comment.avatarBg.replace('#', '')}/fff?text=${comment.avatarText}`}
              alt="user"
            />
          </div>

          <div className="comment-content">
            <div className="user-name">
              {comment.user}
              <span className="comment-time">{comment.time}</span>
            </div>

            <div
              className="comment-text"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
