# Real Estate Portfolio Application

Modern, full-stack emlak portföy uygulaması. React + Node.js + Prisma ile geliştirilmiştir.

## 🚀 Özellikler

- ✨ Modern ve responsive tasarım
- 🏠 Mülk ekleme, düzenleme, silme (CRUD)
- 🏷️ Kategori yönetimi
- 🔍 Gelişmiş arama ve filtreleme
- 🖼️ Çoklu resim yükleme (30 resme kadar)
- 🔐 Admin paneli ve kimlik doğrulama
- 📱 Mobil uyumlu arayüz

## 🛠️ Teknolojiler

### Frontend
- React 18
- Vite
- TailwindCSS v4
- React Router
- Axios
- Lucide Icons
- Embla Carousel

### Backend
- Node.js
- Express.js
- Prisma ORM
- SQLite
- JWT Authentication
- Multer (dosya yükleme)

## 📦 Kurulum

### Gereksinimler
- Node.js 16+
- npm veya yarn

### Backend Kurulumu

```bash
cd server
npm install
npx prisma generate
npx prisma db push
node seed.js  # Örnek veri eklemek için (opsiyonel)
npm start
```

### Frontend Kurulumu

```bash
cd client
npm install
npm run dev
```

## 🔑 Varsayılan Admin Bilgileri

- **Kullanıcı Adı:** admin
- **Şifre:** admin123

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Giriş yap

### Properties
- `GET /api/properties` - Tüm ilanları listele
- `GET /api/properties/:id` - Tek ilan detayı
- `POST /api/properties` - Yeni ilan ekle (Auth gerekli)
- `PUT /api/properties/:id` - İlan güncelle (Auth gerekli)
- `DELETE /api/properties/:id` - İlan sil (Auth gerekli)

### Categories
- `GET /api/categories` - Tüm kategorileri listele
- `POST /api/categories` - Kategori ekle (Auth gerekli)
- `PUT /api/categories/:id` - Kategori güncelle (Auth gerekli)
- `DELETE /api/categories/:id` - Kategori sil (Auth gerekli)

## 📂 Proje Yapısı

```
real-estate-app/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── services/      # API services
│   └── package.json
├── server/                # Backend (Node.js)
│   ├── routes/           # API routes
│   ├── prisma/           # Database schema
│   ├── uploads/          # Uploaded images
│   └── package.json
└── README.md
```

## 🎨 Ekran Görüntüleri

(Buraya ekran görüntüleri ekleyebilirsiniz)

## 📄 Lisans

MIT

## 👨‍💻 Geliştirici

Projenizi geliştiren kişinin adı
