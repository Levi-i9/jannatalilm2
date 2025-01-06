<?php
// بيانات الاتصال بقاعدة البيانات
$host = "localhost";
$dbname = "users_db";
$username = "root";
$password = "";

// الاتصال بقاعدة البيانات
$conn = new mysqli($host, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

// استلام البيانات من النموذج
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT); // تشفير كلمة المرور

    // إدخال البيانات في قاعدة البيانات
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $user, $pass);

    if ($stmt->execute()) {
        echo "مرحبًا بك، " . htmlspecialchars($user) . "! تم تسجيلك بنجاح.";
    } else {
        echo "حدث خطأ أثناء التسجيل: " . $conn->error;
    }

    $stmt->close();
}

// إغلاق الاتصال
$conn->close();
?>
