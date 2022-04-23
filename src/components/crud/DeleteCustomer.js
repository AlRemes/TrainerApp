import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


function DeleteCustomer({ params, fetchCustomer, setOpen, setMessage }) {


  const deleteThis = (link) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(link.value[0].href, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            alert("Something wrong with deletion");
          } else {
            setMessage('Customer deleted')
            setOpen(true);
            fetchCustomer();
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
  )
}
export default DeleteCustomer;
