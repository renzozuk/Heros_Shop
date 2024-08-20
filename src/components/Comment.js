import "./Comment.css";

export default function Comment(props) {
    const filledStarsQuantity = Math.floor(props.stars);
    const unfilledStarsQuantity = 5 - Math.floor(props.stars);

    return (
        <div className="review-comment">
            <div className="outer-review-comment-user-photo">
                <img className="review-comment-user-photo" src={props.photo}></img>
            </div>
            <div className="review-comment-content">
                <p className="review-comment-username">{props.username}</p>
                <div className="review-comment-rating">
                    {Array(filledStarsQuantity).fill().map((_, index) => (
                        <img key={`filled-${index}`} src="./star_filled.png" alt=""></img>
                    ))}
                    {Array(unfilledStarsQuantity).fill().map((_, index) => (
                        <img key={`unfilled-${index}`} src="./star_unfilled.png" alt=""></img>
                    ))}
                </div>
                <p className="review-comment-text">{props.comment}</p>
            </div>
        </div>
    );
}