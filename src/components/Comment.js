export default function Comment(props) {
    return (
        <div className="review-comment">
            <img className="review-comment-user-photo" src={props.photo}></img>
            <div className="review-comment-content">
                <p className="review-comment-username">{props.username}</p>
                <div className="review-comment-rating">

                </div>
                <p className="review-comment-text">{props.comment}</p>
            </div>
        </div>
    );
}