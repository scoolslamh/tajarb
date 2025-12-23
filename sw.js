function showInstallGuide() {
    // 1. التحقق ما إذا كان المستخدم يفتح الموقع كـ "تطبيق مثبت" فعلياً
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    // 2. التحقق ما إذا كان المستخدم قد أغلق الإرشاد سابقاً في هذه "الجلسة المسجلة"
    const hasSeenGuide = localStorage.getItem("guideShownAfterLogin");

    // إذا كان تطبيقاً مثبتاً أو رأى الإرشاد سابقاً، لا تظهر شيئاً
    if (isStandalone || hasSeenGuide === "true") return;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    const guide = document.getElementById("installGuide");
    const text = document.getElementById("guideText");

    if (isIOS) {
        text.innerHTML = "لآيفون: اضغط على زر <b>المشاركة</b> في الأسفل ثم اختر <b>'إضافة إلى الشاشة الرئيسية'</b>.";
        guide.style.display = "block";
    } else if (isAndroid) {
        text.innerHTML = "للأندرويد: اضغط على <b>نقاط القائمة</b> علوياً واختر <b>'تثبيت التطبيق'</b>.";
        guide.style.display = "block";
    }
}

// تعديل دالة الإغلاق لتخزن الحالة في LocalStorage (للمرة الأولى فقط)
function closeGuide() {
    document.getElementById("installGuide").style.display = "none";
    localStorage.setItem("guideShownAfterLogin", "true");
}
