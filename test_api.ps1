# 1. API Ayarları
$baseUrl = "http://localhost:5000/api"
$username = "admin"
$password = "admin123"

Write-Host "`n=== 1. TEST: Giriş Yapılıyor (Login) ===" -ForegroundColor Yellow
try {
    $loginBody = @{
        username = $username
        password = $password
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.token
    Write-Host "Giriş Başarılı! Token alındı." -ForegroundColor Green
    # Write-Host "Token: $token" 
}
catch {
    Write-Host "Giriş Başarısız: $_" -ForegroundColor Red
    exit
}

Write-Host "`n=== 2. TEST: Kategorileri Listele (Kategori Listesi) ===" -ForegroundColor Yellow
try {
    $categories = Invoke-RestMethod -Uri "$baseUrl/categories" -Method Get
    Write-Host "Kategoriler: $(($categories | Measure-Object).Count) adet bulundu." -ForegroundColor Green
    $categories | Select-Object -First 3 | Format-Table id, name -AutoSize
}
catch {
    Write-Host "Kategori Listeleme Hatası: $_" -ForegroundColor Red
}

Write-Host "`n=== 3. TEST: Yeni Kategori Ekle (Admin Yetkisi ile) ===" -ForegroundColor Yellow
try {
    $newCategoryName = "Test Kategori " + (Get-Random -Minimum 1000 -Maximum 9999)
    $catBody = @{ name = $newCategoryName } | ConvertTo-Json
    
    $headers = @{ Authorization = "Bearer $token" }

    $newCat = Invoke-RestMethod -Uri "$baseUrl/categories" -Method Post -Body $catBody -Headers $headers -ContentType "application/json"
    Write-Host "Yeni Kategori Eklendi: $($newCat.name) (ID: $($newCat.id))" -ForegroundColor Green
}
catch {
    Write-Host "Kategori Ekleme Hatası: $_" -ForegroundColor Red
}

Write-Host "`n=== 4. TEST: İlanları Listele (Public) ===" -ForegroundColor Yellow
try {
    $properties = Invoke-RestMethod -Uri "$baseUrl/properties" -Method Get
    Write-Host "İlanlar: $(($properties | Measure-Object).Count) adet bulundu." -ForegroundColor Green
    if ($properties.Count -gt 0) {
        $firstProp = $properties[0]
        Write-Host "İlk İlan: $($firstProp.title) - $($firstProp.price) TL"
    }
}
catch {
    Write-Host "İlan Listeleme Hatası: $_" -ForegroundColor Red
}

Write-Host "`n=== TESTLER TAMAMLANDI ===" -ForegroundColor Cyan
