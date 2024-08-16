import { useParams } from "react-router-dom";

const Department = () => {
    const { category } = useParams();

    return (
        <div>
            <h2>Department: {category}</h2>
        </div>
    );
}

export default Department;