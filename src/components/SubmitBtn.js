import { Button } from "react-bootstrap";
import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Button
      type="submit"
      className="mx-auto p-3"
      style={{ maxWidth: "80px", backgroundColor: "#D277FC" }}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className=""></span>
          sending...
        </>
      ) : (
        text || "submit"
      )}
    </Button>
  );
};
export default SubmitBtn;
