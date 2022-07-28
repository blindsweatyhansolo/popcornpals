// reusable back button
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} className='mb-4'>
      <i className='bi bi-arrow-left'></i> Back
    </Button>
  );
};

export default BackButton;