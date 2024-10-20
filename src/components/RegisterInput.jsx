import PropTypes from "prop-types"; // Mengimpor PropTypes untuk validasi prop
import useInput from "../hooks/useInput"; // Mengimpor custom hook untuk menangani input

function RegisterInput({ onAuthRegister }) {
  // Menggunakan custom hook useInput untuk mengelola state input
  const [name, onNameChange] = useInput(""); // State untuk nama
  const [email, onEmailChange] = useInput(""); // State untuk email
  const [password, onPasswordChange] = useInput(""); // State untuk password

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman saat form disubmit
    // Memanggil fungsi onAuthRegister dan mengirimkan data yang diperlukan
    onAuthRegister({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}> {/* Menghubungkan fungsi handleSubmit dengan form */}
      <div className="form px-4">
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Full Name {/* Label untuk input nama */}
          </label>
          <input
            type="text"
            id="inputName" // ID input nama
            value={name} // Menggunakan state name
            onChange={onNameChange} // Menghubungkan perubahan input dengan fungsi onNameChange
            className="form-control" // Kelas untuk styling input
            required // Menandai input sebagai wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email {/* Label untuk input email */}
          </label>
          <input
            type="email" // Tipe input untuk email
            id="inputEmail" // ID input email
            value={email} // Menggunakan state email
            onChange={onEmailChange} // Menghubungkan perubahan input dengan fungsi onEmailChange
            className="form-control" // Kelas untuk styling input
            placeholder="email@example.com" // Placeholder untuk input email
            required // Menandai input sebagai wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password {/* Label untuk input password */}
          </label>
          <input
            type="password" // Tipe input untuk password
            id="inputPassword" // ID input password
            value={password} // Menggunakan state password
            onChange={onPasswordChange} // Menghubungkan perubahan input dengan fungsi onPasswordChange
            className="form-control" // Kelas untuk styling input
            required // Menandai input sebagai wajib diisi
          />
        </div>
        <div className="mb-4 text-end">
          <button type="submit" className="btn btn-primary">
            Register {/* Tombol untuk mengirim form */}
          </button>
        </div>
      </div>
    </form>
  );
}

// Mendefinisikan tipe prop untuk komponen RegisterInput
RegisterInput.propTypes = {
  onAuthRegister: PropTypes.func.isRequired, // onAuthRegister harus berupa fungsi
};

export default RegisterInput; // Mengekspor komponen RegisterInput
