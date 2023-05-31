import {useNavigate} from "react-router-dom";
import {Button} from "reactstrap";

const BackButton = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    return (
        <Button
            className="button icon-left"
            onClick={goBack}>
            Back
        </Button>
    )
}

export default BackButton;