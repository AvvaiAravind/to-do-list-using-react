import { useState, useRef } from "react";

export function TaskInput({ handleSave }) {
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const dialog = useRef(null);
  const form = useRef(null);

  const openDialog = () => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  };
  const handleCloseDialog = (e) => {
    e.preventDefault();
    if (dialog.current) {
      dialog.current.close();
    }
    console.log("clicked");
    // setIsDialogOpen((prev) => !prev);
    setTaskName("");
    setDescription("");
    setPriority("");
    setStatus("");
  };

  const handleTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handledescriptionInput = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    if (value === "Default") {
      setPriority("");
    } else {
      setPriority(value);
    }
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    if (value === "Default") {
      setStatus("");
    } else {
      setStatus(value);
    }
  };

  return (
    <>
      <button type="button" id="addTask" onClick={openDialog}>
        Add Task
      </button>
      {/* {isDialogOpen && ( */}
      <dialog ref={dialog}>
        <form
          onSubmit={(e) => {
            handleSave(taskName, description, priority, status, e, form);
            handleCloseDialog(e);
          }}
          ref={form}
        >
          <Input
            id="taskName"
            placeholder="Enter Your Name"
            onChange={handleTaskName}
            input={taskName}
          />
          <Input
            id="description"
            placeholder="description"
            onChange={handledescriptionInput}
            input={description}
          />
          <div className="select-container">
            <Select
              id="priority"
              option1="High"
              option2="Low"
              onChange={handlePriorityChange}
              input={priority}
            />
            <Select
              id="status"
              option1="Completed"
              option2="Pending"
              onChange={handleStatusChange}
              input={status}
            />
          </div>
          <button type="submit" id="saveTask">
            Add
          </button>
          <button type="button" onClick={handleCloseDialog} id="closeDialog">
            Close
          </button>
        </form>
      </dialog>
      {/* )} */}
    </>
  );
}

function Input({ placeholder, id, onChange, input }) {
  return (
    <label htmlFor={id}>
      <input
        type="text"
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={input}
        required
      />
    </label>
  );
}

function Select({ id, option1, option2, onChange, input }) {
  return (
    <label htmlFor={id}>
      <select name={id} id={id} onChange={onChange} value={input} required>
        <option value="Default">Default</option>
        <option value={option1}>{option1}</option>
        <option value={option2}>{option2}</option>
      </select>
    </label>
  );
}