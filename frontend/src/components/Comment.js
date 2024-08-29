import "./Comment.css";

export default function Comment(props) {
    return (
        <div className="review-comment">
            <div className="outer-review-comment-user-photo">
                <img className="review-comment-user-photo" src={props.photo}></img>
            </div>
            <div className="review-comment-content">
                <p className="review-comment-username">{props.username}</p>
                <div className="review-comment-rating">
                    <img className="rating-star" src={props.stars >= 1 ? `${process.env.PUBLIC_URL}/star_filled.png` : `${process.env.PUBLIC_URL}/star_unfilled.png`}></img>
                    <img className="rating-star" src={props.stars >= 2 ? `${process.env.PUBLIC_URL}/star_filled.png` : `${process.env.PUBLIC_URL}/star_unfilled.png`}></img>
                    <img className="rating-star" src={props.stars >= 3 ? `${process.env.PUBLIC_URL}/star_filled.png` : `${process.env.PUBLIC_URL}/star_unfilled.png`}></img>
                    <img className="rating-star" src={props.stars >= 4 ? `${process.env.PUBLIC_URL}/star_filled.png` : `${process.env.PUBLIC_URL}/star_unfilled.png`}></img>
                    <img className="rating-star" src={props.stars >= 5 ? `${process.env.PUBLIC_URL}/star_filled.png` : `${process.env.PUBLIC_URL}/star_unfilled.png`}></img>
                </div>
                <p className="review-comment-text">{props.comment}</p>
            </div>
        </div>
    );
}