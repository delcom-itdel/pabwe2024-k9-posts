import PropTypes from "prop-types"; // Mengimpor PropTypes untuk validasi tipe data props
import { todoItemShape } from "./TodoItem"; // Mengimpor bentuk (shape) dari todo item yang telah didefinisikan di TodoItem
import { postedAt } from "../utils/tools"; // Mengimpor fungsi postedAt untuk memformat waktu posting todo
import { FaClock } from "react-icons/fa6"; // Mengimpor ikon jam dari react-icons (ikon FaClock)

function TodoDetail({ todo }) {
  let badgeStatus, badgeLabel; // Deklarasi variabel untuk status dan label badge
  
  // Menentukan status todo, apakah selesai atau belum selesai
  if (todo.is_finished) {
    badgeStatus = "badge bg-success text-white ms-3"; // Jika selesai, badge berwarna hijau
    badgeLabel = "Selesai"; // Label badge menunjukkan 'Selesai'
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3"; // Jika belum selesai, badge berwarna kuning
    badgeLabel = "Belum Selesai"; // Label badge menunjukkan 'Belum Selesai'
  }

  return (
    <div className="card mt-3"> {/* Membungkus konten dalam card Bootstrap */}
      <div className="card-body"> {/* Isi card */}
        <div className="row align-items-center"> {/* Membuat layout berbasis grid */}
          <div className="col-12 d-flex"> {/* Kolom pertama: Judul dan status badge */}
            <h5>{todo.title}</h5> {/* Menampilkan judul todo */}
            <div>
              <span className={badgeStatus}>{badgeLabel}</span> {/* Menampilkan status todo */}
            </div>
          </div>
          <div className="col-12"> {/* Kolom kedua: Waktu todo dibuat */}
            <div className="text-sm op-5"> {/* Gaya teks lebih kecil dan opasitas */}
              <FaClock /> {/* Ikon jam */}
              <span className="ps-2">{postedAt(todo.created_at)}</span> {/* Menampilkan waktu posting */}
            </div>
          </div>
          <div className="col-12"> {/* Kolom ketiga: Deskripsi todo */}
            <hr /> {/* Garis horizontal */}
            {todo.description} {/* Menampilkan deskripsi todo */}
          </div>
        </div>
      </div>
    </div>
  );
}

TodoDetail.propTypes = {
  todo: PropTypes.shape(todoItemShape).isRequired, // Memastikan prop todo berbentuk seperti todoItemShape dan wajib diisi
};

export default TodoDetail; // Mengekspor komponen TodoDetail sebagai default
