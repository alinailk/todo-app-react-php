🛠️ React + PHP Todo Uygulaması

Bu repo, PHP ile geliştirilmiş bir API'ye bağlanan React Todo uygulamasını içerir.

⚛️ Kullanılan Teknolojiler

• React (Hooks ile)
• Tailwind CSS
• Axios (API bağlantısı için)
• PHP API (ayrı repoda)

🚀 Özellikler

• Görev ekleme
• Görev silme (soft delete)
• Görev tamamlandı/aktif yapma
• Öncelik ve tarih gösterimi
• MySQL üzerinden canlı veri yönetimi

📁 Proje Yapısı

📁 todo-react/  
    📁 src/  
        📁 components/ → Uygulamanın görsel parçaları ve sayfa bileşenleri  
            📄 AddTodoForm.jsx → Yeni todo ekleme formu  
            📄 AddTodoModal.jsx → Todo ekleme popup/modal bileşeni  
            📄 Dashboard.jsx → İstatistik gösterimi  
            📄 DeleteConfirmationModal.jsx → Görev silme onay modal'ı  
            📄 EditTodoModal.jsx → Todo düzenleme popup bileşeni  
            📄 EmptyState.jsx → Liste boş olduğunda gösterilen bileşen  
            📄 FilterBar.jsx → Görev filtreleme bileşeni  
            📄 Header.jsx → Üst kısım  
            📄 Pagination.jsx → Sayfalama kontrolü  
            📄 PriorityIndicator.jsx → Todo önceliğini renk/simge ile gösterir  
            📄 StatusBadge.jsx → Todo durumuna göre rozet  
            📄 ThemeToggle.jsx → Açık/Koyu tema geçişi  
            📄 TodoItem.jsx → Tek bir todo kartı  
            📄 TodoList.jsx → Todo’ların listelendiği ana liste bileşeni  
        📁 components/Context/  
            📄 ThemeContext.jsx → Tema bilgisini global sağlayan Context  
        📄 App.js → Ana uygulama bileşeni, routing ve layout genelde burada  
        📄 App.css, index.css → Global stiller

🔗 API Entegrasyonu

API istekleri şu base URL'e yapılır:
"http://localhost/todo-api/api/todos/"

Kullanılan uç noktalar:

• "get.php" – Görevleri listeler
• "create.php" – Görev oluşturur
• "update.php" – Görevi günceller
• "delete.php" – Görevi siler
• "updateStatus.php" – Görev durumunu günceller

⚙️ Kurulum

🛠️ Bu repoyu klonlayın:

git clone https://github.com/alinailk/todo-app-react-php
cd todo-react

🔧 Bağımlılıkları yükleyin:

yarn install veya npm install

🚀 Uygulamayı başlatın:

yarn dev veya npm run dev

⚠️ Not: API'yi kullanabilmek için PHP dosyalarını ve veritabanı bağlantısını düzgün şekilde yapılandırarak todo-api klasörünü çalıştırmanız gerekmektedir. API, PHP backend üzerinden şu adreste kullanılabilir:
"http://localhost/todo-api/api/todos/..."