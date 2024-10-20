import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function LoginInput({ onAuthLogin }) {
  // Menggunakan custom hook untuk menangani state email dan password
  const [email, onEmailChange] = useInput(""); // State dan handler untuk email
  const [password, onPasswordChange] = useInput(""); // State dan handler untuk password

  // Fungsi yang dijalankan ketika form disubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman ketika form disubmit
    onAuthLogin({ email, password }); // Mengirimkan data email dan password ke fungsi onAuthLogin
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form px-4">
        {/* Input untuk email */}
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="inputEmail"
            value={email} // Nilai input diambil dari state email
            onChange={onEmailChange} // Ketika input berubah, handler onEmailChange dipanggil
            className="form-control"
            placeholder="email@example.com"
            required // Membuat input ini menjadi required
          />
        </div>
        {/* Input untuk password */}
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            value={password} // Nilai input diambil dari state password
            onChange={onPasswordChange} // Ketika input berubah, handler onPasswordChange dipanggil
            className="form-control"
            required // Membuat input ini menjadi required
          />
        </div>
        {/* Tombol submit untuk login */}
        <div className="mb-4 text-end">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  onAuthLogin: PropTypes.func.isRequired, // onAuthLogin adalah fungsi yang wajib diberikan sebagai props
};

export default LoginInput;
