import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


function DeleteTraining({ params, fetchTraining, setOpen, setMessage }) {


  const deleteThis = (link) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(link.value[0].href, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            alert("Something wrong with deletion");
          } else {
            setMessage('Training deleted')
            setOpen(true);
            fetchTraining();
          }
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <>
      <IconButton color="error" onClick={() => deleteThis(params)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}
export default DeleteTraining;
