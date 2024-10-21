import { useState } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

function TodoInput({ onAddTodo }) {
  const [cover, setCover] = useState(null);
  const [description, setDescription] = useState("");

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setCover(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    },
    maxFiles: 1
  });

  function handleOnAddTodo(e) {
    e.preventDefault();
    
    if (cover && description.trim()) {
      const formData = new FormData();
      formData.append('cover', cover);
      formData.append('description', description);
      
      onAddTodo(formData);
      setCover(null);
      setDescription("");
    } else {
      console.error("Cover or description is missing!");
    }
  }

  function handleDescription({ target }) {
    if (target.value.length <= 1000) {
      setDescription(target.value);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Buat Post</h3>
        <hr />
        <form onSubmit={handleOnAddTodo}>
          <div className="mb-3">
            <div
              {...getRootProps()}
              className={`border border-dashed rounded p-4 text-center cursor-pointer ${
                isDragActive ? "border-primary" : "border-secondary"
              }`}
            >
              <input {...getInputProps()} id="cover" />
              {cover ? (
                <div className="relative h-40 w-full mb-2">
                  <img
                    src={URL.createObjectURL(cover)}
                    alt="Cover preview"
                    className="img-fluid rounded"
                  />
                </div>
              ) : (
                <p className="text-muted">
                  {isDragActive
                    ? "Drop the image here"
                    : "Drag 'n' drop a cover image here, or click to select one"}
                </p>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputBody" className="form-label">
              Deskripsi
            </label>
            <textarea
              rows="5"
              id="inputBody"
              onChange={handleDescription}
              className="form-control"
              required
            ></textarea>
            <div className="text-end">
              <span>{description.length}/1000</span>
            </div>
          </div>
          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

TodoInput.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoInput;
