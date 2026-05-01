# E-Commerce Order & Checkout System Context (Backend)

Dokumen ini berisi penjelasan teknis mengenai sistem pemesanan (Order) dan pembayaran (Checkout) pada backend untuk digunakan sebagai referensi pengembangan frontend.

## 1. Alur Checkout (Checkout Flow)

Sistem mendukung dua cara untuk membuat pesanan (`POST /api/orders`):

### A. Checkout via Keranjang (Cart Checkout)
Ini adalah alur di mana user sudah memiliki item di keranjang dan ingin memproses semuanya menjadi pesanan.
*   **Trigger**: Kirim request tanpa property `orderItems`.
*   **Logic Backend**: Backend akan mengambil semua data dari tabel `Cart` user yang sedang login, menghitung total harga, membuat record `Order` & `OrderItem`, lalu **mengosongkan keranjang** secara otomatis dalam satu transaksi database.

### B. Pesanan Langsung (Direct Order)
User memesan langsung dari halaman produk (misal: tombol "Beli Sekarang").
*   **Trigger**: Kirim request dengan property `orderItems` berisi array produk.
*   **Logic Backend**: Backend akan menggunakan data yang dikirim di body request (mengabaikan isi keranjang), menghitung harga berdasarkan database, dan membuat pesanan.

---

## 2. Struktur Data API

### Endpoint: `POST /api/orders`
*   **Akses**: Terautentikasi (User)
*   **Request Body**:
    ```json
    {
      "username": "Nama Penerima",
      "no_wa": "08123456789",
      "address": "Alamat Lengkap Pengiriman",
      "orderItems": [ 
        {
          "productId": 1,
          "quantity": 2,
          "spice_level": 3
        }
      ] // Opsional. Jika kosong/tidak dikirim, sistem akan mengambil dari Cart.
    }
    ```

### Endpoint: `GET /api/orders`
*   **Akses**: Terautentikasi (User)
*   **Tujuan**: Mengambil riwayat pesanan milik user yang sedang login.
*   **Urutan**: Berdasarkan waktu terbaru (`createdAt DESC`).

### Endpoint: `GET /api/admin/orders`
*   **Akses**: Admin Only
*   **Tujuan**: Monitoring semua pesanan masuk untuk diproses.

---

## 3. Sistem Status Pesanan

Pesanan memiliki field `status` dengan alur sebagai berikut:
1.  `Menunggu` (Default saat pesanan dibuat)
2.  `Sedang Dimasak` (Admin memproses pesanan)
3.  `Dikirim` (Pesanan dalam perjalanan)
4.  `Selesai` (Pesanan telah diterima)
5.  `Dibatalkan` (Pesanan dibatalkan oleh admin)

Update status dilakukan melalui endpoint: `PUT /api/admin/orders/:id/status`.

---

## 4. Integrasi Real-Time (WebSocket)

Sistem backend menggunakan WebSocket untuk memberitahu Admin secara instan setiap kali ada pesanan baru masuk.
*   **Event**: Saat `createOrder` berhasil, backend akan memanggil `broadcastOrderToAdmin(newOrder)`.
*   **Frontend Admin**: Harus mendengarkan (listen) pada koneksi WebSocket untuk memperbarui daftar pesanan tanpa perlu refresh halaman.

---

## 5. Validasi & Keamanan

*   **Rate Limiter**: Endpoint pembuatan pesanan dilindungi oleh `ordersLimiter` untuk mencegah spam order.
*   **Stok/Availability**: Backend mengecek ketersediaan produk (`is_available`). Jika ada produk yang stoknya habis atau tidak ditemukan, pesanan akan gagal (400 Bad Request).
*   **Price Protection**: Harga total dihitung ulang di backend berdasarkan harga terbaru di database, bukan berdasarkan harga yang dikirim dari frontend (mencegah manipulasi harga).

---

## 6. Schema Database (Prisma)

Dua model utama yang terlibat:
*   **Order**: Menyimpan informasi pengiriman, total harga, status, dan ID user.
*   **OrderItem**: Menyimpan detail produk dalam satu pesanan (snapshot harga saat dibeli, jumlah, dan tingkat kepedasan).

> [!TIP]
> Saat menampilkan detail pesanan di frontend, pastikan untuk menampilkan `price_at_purchase` dari `OrderItem` sebagai harga produk saat dipesan, bukan harga produk saat ini dari tabel `Product` (karena harga bisa berubah di masa depan).
