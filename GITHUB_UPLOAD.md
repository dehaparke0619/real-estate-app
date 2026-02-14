# GitHub'a Yükleme Adımları

Bu dosya, projenizi GitHub'a nasıl yükleyeceğinizi adım adım açıklar.

## Ön Hazırlık

1. **GitHub hesabınızda yeni bir repository oluşturun:**
   - https://github.com/new adresine gidin
   - Repository adı: `real-estate-app` (veya istediğiniz bir isim)
   - Public veya Private seçin
   - **"Initialize this repository with a README" seçeneğini işaretlemeyin!**
   - "Create repository" butonuna tıklayın

## Git Kurulumu

Eğer Git yüklü değilse:
- https://git-scm.com/download/win adresinden indirin ve kurun
- Kurulum sonrası PowerShell'i yeniden başlatın

## Komutlar

Aşağıdaki komutları sırasıyla PowerShell'de çalıştırın:

### 1. Proje klasörüne gidin
```powershell
cd C:\Users\winpc\.gemini\antigravity\scratch\real-estate-app
```

### 2. Git'i başlatın
```powershell
git init
```

### 3. Kullanıcı bilgilerinizi ayarlayın (ilk kez kullanıyorsanız)
```powershell
git config --global user.name "GitHub Kullanıcı Adınız"
git config --global user.email "github-email@example.com"
```

### 4. Tüm dosyaları ekleyin
```powershell
git add .
```

### 5. İlk commit'i yapın
```powershell
git commit -m "Initial commit: Real estate portfolio application"
```

### 6. GitHub repository'nizi bağlayın
```powershell
# KULLANICI_ADINIZ yerine kendi GitHub kullanıcı adınızı yazın
git remote add origin https://github.com/KULLANICI_ADINIZ/real-estate-app.git
```

### 7. Ana branch'i main olarak ayarlayın
```powershell
git branch -M main
```

### 8. GitHub'a yükleyin
```powershell
git push -u origin main
```

## Şifre İsterse

GitHub artık şifre yerine **Personal Access Token** kullanıyor:

1. GitHub'da Settings > Developer settings > Personal access tokens > Tokens (classic)
2. "Generate new token (classic)" butonuna tıklayın
3. "repo" yetkisini seçin
4. Token'ı oluşturun ve kopyalayın
5. Git push yaparken şifre yerine bu token'ı kullanın

## Sonraki Güncellemeler İçin

Değişiklik yaptıktan sonra:

```powershell
git add .
git commit -m "Değişiklik açıklaması"
git push
```

## Sorun Yaşarsanız

- Git yüklü mü kontrol edin: `git --version`
- Repository URL'ini kontrol edin: `git remote -v`
- Branch'i kontrol edin: `git branch`

## .gitignore Dosyası

`.gitignore` dosyası zaten oluşturuldu. Bu dosya şunları Git'e eklemez:
- node_modules/
- .env dosyaları
- Veritabanı dosyaları
- Yüklenen resimler (uploads/)
- Log dosyaları
