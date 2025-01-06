document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const surahList = document.getElementById('surahList');
    const surahDropdown = document.getElementById('surahDropdown');
    const surahContent = document.getElementById('surahContent');
    const surahTitle = document.getElementById('surahTitle');
    const surahText = document.getElementById('surahText');
    const prevSurah = document.getElementById('prevSurah');
    const nextSurah = document.getElementById('nextSurah');
    const fontSizeBtn = document.getElementById('fontSizeBtn');
    const fontSizePopup = document.getElementById('fontSizePopup');
    const saveProgressBtn = document.getElementById('saveProgress');
    const tafseerContent = document.getElementById('tafseerContent');
    const surahListBtn = document.getElementById('surahListBtn');
    const surahListContainer = document.getElementById('surahListContainer');
    const closeSurahList = document.getElementById('closeSurahList');
    const surahGrid = document.getElementById('surahGrid');
    const quranImagesBtn = document.getElementById('quranImagesBtn');
    const quranImagesContainer = document.getElementById('quranImagesContainer');
    const quranImageModal = document.getElementById('quranImageModal');
    const modalImage = document.getElementById('modalImage');
    const closeImagesContainer = document.getElementById('closeImagesContainer');
    const closeImageModal = document.getElementById('closeImageModal');
    const quranImagesList = document.getElementById('quranImagesList');

    let currentSurah = 1;
    const totalSurahs = 114;

    // قائمة السور
    const surahs = [
        { number: 1, name: "الفاتحة", verses: 7 },
        { number: 2, name: "البقرة", verses: 286 },
        { number: 3, name: "آل عمران", verses: 200 },
        { number: 4, name: "النساء", verses: 176 },
        { number: 5, name: "المائدة", verses: 120 },
        { number: 6, name: "الأنعام", verses: 165 },
        { number: 7, name: "الأعراف", verses: 206 },
        { number: 8, name: "الأنفال", verses: 75 },
        { number: 9, name: "التوبة", verses: 129 },
        { number: 10, name: "يونس", verses: 109 },
        { number: 11, name: "هود", verses: 123 },
        { number: 12, name: "يوسف", verses: 111 },
        { number: 13, name: "الرعد", verses: 43 },
        { number: 14, name: "إبراهيم", verses: 52 },
        { number: 15, name: "الحجر", verses: 99 },
        { number: 16, name: "النحل", verses: 128 },
        { number: 17, name: "الإسراء", verses: 111 },
        { number: 18, name: "الكهف", verses: 110 },
        { number: 19, name: "مريم", verses: 98 },
        { number: 20, name: "طه", verses: 135 },
        { number: 21, name: "الأنبياء", verses: 112 },
        { number: 22, name: "الحج", verses: 78 },
        { number: 23, name: "المؤمنون", verses: 118 },
        { number: 24, name: "النور", verses: 64 },
        { number: 25, name: "الفرقان", verses: 77 },
        { number: 26, name: "الشعراء", verses: 227 },
        { number: 27, name: "النمل", verses: 93 },
        { number: 28, name: "القصص", verses: 88 },
        { number: 29, name: "العنكبوت", verses: 69 },
        { number: 30, name: "الروم", verses: 60 },
        { number: 31, name: "لقمان", verses: 34 },
        { number: 32, name: "السجدة", verses: 30 },
        { number: 33, name: "الأحزاب", verses: 73 },
        { number: 34, name: "سبأ", verses: 54 },
        { number: 35, name: "فاطر", verses: 45 },
        { number: 36, name: "يس", verses: 83 },
        { number: 37, name: "الصافات", verses: 182 },
        { number: 38, name: "ص", verses: 88 },
        { number: 39, name: "الزمر", verses: 75 },
        { number: 40, name: "غافر", verses: 85 },
        { number: 41, name: "فصلت", verses: 54 },
        { number: 42, name: "الشورى", verses: 53 },
        { number: 43, name: "الزخرف", verses: 89 },
        { number: 44, name: "الدخان", verses: 59 },
        { number: 45, name: "الجاثية", verses: 37 },
        { number: 46, name: "الأحقاف", verses: 35 },
        { number: 47, name: "محمد", verses: 38 },
        { number: 48, name: "الفتح", verses: 29 },
        { number: 49, name: "الحجرات", verses: 18 },
        { number: 50, name: "ق", verses: 45 },
        { number: 51, name: "الذاريات", verses: 60 },
        { number: 52, name: "الطور", verses: 49 },
        { number: 53, name: "النجم", verses: 62 },
        { number: 54, name: "القمر", verses: 55 },
        { number: 55, name: "الرحمن", verses: 78 },
        { number: 56, name: "الواقعة", verses: 96 },
        { number: 57, name: "الحديد", verses: 29 },
        { number: 58, name: "المجادلة", verses: 22 },
        { number: 59, name: "الحشر", verses: 24 },
        { number: 60, name: "الممتحنة", verses: 13 },
        { number: 61, name: "الصف", verses: 14 },
        { number: 62, name: "الجمعة", verses: 11 },
        { number: 63, name: "المنافقون", verses: 11 },
        { number: 64, name: "التغابن", verses: 18 },
        { number: 65, name: "الطلاق", verses: 12 },
        { number: 66, name: "التحريم", verses: 12 },
        { number: 67, name: "الملك", verses: 30 },
        { number: 68, name: "القلم", verses: 52 },
        { number: 69, name: "الحاقة", verses: 52 },
        { number: 70, name: "المعارج", verses: 44 },
        { number: 71, name: "نوح", verses: 28 },
        { number: 72, name: "الجن", verses: 28 },
        { number: 73, name: "المزمل", verses: 20 },
        { number: 74, name: "المدثر", verses: 56 },
        { number: 75, name: "القيامة", verses: 40 },
        { number: 76, name: "الإنسان", verses: 31 },
        { number: 77, name: "المرسلات", verses: 50 },
        { number: 78, name: "النبأ", verses: 40 },
        { number: 79, name: "النازعات", verses: 46 },
        { number: 80, name: "عبس", verses: 42 },
        { number: 81, name: "التكوير", verses: 29 },
        { number: 82, name: "الانفطار", verses: 19 },
        { number: 83, name: "المطففين", verses: 36 },
        { number: 84, name: "الانشقاق", verses: 25 },
        { number: 85, name: "البروج", verses: 22 },
        { number: 86, name: "الطارق", verses: 17 },
        { number: 87, name: "الأعلى", verses: 19 },
        { number: 88, name: "الغاشية", verses: 26 },
        { number: 89, name: "الفجر", verses: 30 },
        { number: 90, name: "البلد", verses: 20 },
        { number: 91, name: "الشمس", verses: 15 },
        { number: 92, name: "الليل", verses: 21 },
        { number: 93, name: "الضحى", verses: 11 },
        { number: 94, name: "الشرح", verses: 8 },
        { number: 95, name: "التين", verses: 8 },
        { number: 96, name: "العلق", verses: 19 },
        { number: 97, name: "القدر", verses: 5 },
        { number: 98, name: "البينة", verses: 8 },
        { number: 99, name: "الزلزلة", verses: 8 },
        { number: 100, name: "العاديات", verses: 11 },
        { number: 101, name: "القارعة", verses: 11 },
        { number: 102, name: "التكاثر", verses: 8 },
        { number: 103, name: "العصر", verses: 3 },
        { number: 104, name: "الهمزة", verses: 9 },
        { number: 105, name: "الفيل", verses: 5 },
        { number: 106, name: "قريش", verses: 4 },
        { number: 107, name: "الماعون", verses: 7 },
        { number: 108, name: "الكوثر", verses: 3 },
        { number: 109, name: "الكافرون", verses: 6 },
        { number: 110, name: "النصر", verses: 3 },
        { number: 111, name: "المسد", verses: 5 },
        { number: 112, name: "الإخلاص", verses: 4 },
        { number: 113, name: "الفلق", verses: 5 },
        { number: 114, name: "الناس", verses: 6 }
    ];

    // عرض قائمة السور
    surahListBtn.addEventListener('click', () => {
        displaySurahList();
        surahListContainer.classList.add('active');
    });

    // إغلاق قائمة السور
    closeSurahList.addEventListener('click', () => {
        surahListContainer.classList.remove('active');
    });

    // عرض قائمة السور في الشبكة
    function displaySurahList() {
        surahGrid.innerHTML = surahs.map(surah => `
            <div class="surah-item" onclick="selectSurah(${surah.number})">
                <h3>${surah.name}</h3>
                <div class="surah-info">
                    سورة رقم ${surah.number}
                    <br>
                    عدد الآيات: ${surah.verses}
                </div>
            </div>
        `).join('');
    }

    // اختيار سورة
    window.selectSurah = function(number) {
        surahListContainer.classList.remove('active');
        displaySurah(number);
    };

    // Fetch Quran data
    async function fetchSurah(number) {
        try {
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${number}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching surah:', error);
            return null;
        }
    }

    // Display Surah
    async function displaySurah(number) {
        const surah = await fetchSurah(number);
        if (!surah) return;

        currentSurah = number;
        surahTitle.textContent = `سورة ${surah.name}`;
        
        const verses = surah.ayahs.map(ayah => 
            `<span class="verse" data-verse="${ayah.numberInSurah}">
                ${ayah.text} ﴿${ayah.numberInSurah}﴾
            </span>`
        ).join(' ');
        
        surahText.innerHTML = verses;
        updateNavigationButtons();
        saveLastRead();
    }

    // Navigation
    function updateNavigationButtons() {
        prevSurah.disabled = currentSurah === 1;
        nextSurah.disabled = currentSurah === totalSurahs;
    }

    prevSurah.addEventListener('click', () => {
        if (currentSurah > 1) {
            displaySurah(currentSurah - 1);
        }
    });

    nextSurah.addEventListener('click', () => {
        if (currentSurah < totalSurahs) {
            displaySurah(currentSurah + 1);
        }
    });

    // Search functionality
    searchInput.addEventListener('input', async function() {
        const query = this.value.trim();
        if (query.length < 1) {
            searchResults.style.display = 'none';
            return;
        }

        try {
            // البحث في السور
            const surahMatches = surahs.filter(surah => 
                surah.name.includes(query) || 
                surah.number.toString() === query ||
                removeArabicDiacritics(surah.name).includes(removeArabicDiacritics(query))
            );

            // البحث في الآيات
            const surah = await fetchSurah(currentSurah);
            let verseMatches = [];
            if (surah && surah.ayahs) {
                verseMatches = surah.ayahs.filter(ayah => 
                    removeArabicDiacritics(ayah.text).includes(removeArabicDiacritics(query))
                ).map(ayah => ({
                    surahNumber: currentSurah,
                    surahName: surah.name,
                    verseNumber: ayah.numberInSurah,
                    text: ayah.text
                }));
            }

            displaySearchResults(surahMatches, verseMatches);
        } catch (error) {
            console.error('Error searching:', error);
        }
    });

    // إزالة التشكيل من النص العربي للبحث
    function removeArabicDiacritics(text) {
        return text.normalize('NFD')
                  .replace(/[\u064B-\u065F]/g, '')
                  .normalize('NFC');
    }

    // عرض نتائج البحث
    function displaySearchResults(surahMatches, verseMatches) {
        if (surahMatches.length === 0 && verseMatches.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">لا توجد نتائج</div>';
            searchResults.style.display = 'block';
            return;
        }

        let resultsHTML = '';

        // عرض نتائج السور
        if (surahMatches.length > 0) {
            surahMatches.forEach(surah => {
                resultsHTML += `
                    <div class="search-result-item" onclick="selectSurah(${surah.number})">
                        <div class="search-result-info">
                            <span class="search-result-name">${surah.name}</span>
                            <span class="search-result-details">سورة رقم ${surah.number} - ${surah.verses} آية</span>
                        </div>
                        <span class="search-result-type">سورة</span>
                    </div>
                `;
            });
        }

        // عرض نتائج الآيات
        if (verseMatches.length > 0) {
            verseMatches.forEach(verse => {
                resultsHTML += `
                    <div class="search-result-item" onclick="goToVerse(${verse.surahNumber}, ${verse.verseNumber})">
                        <div class="search-result-info">
                            <span class="search-result-name">الآية ${verse.verseNumber} - ${verse.surahName}</span>
                            <span class="search-result-details">${truncateText(verse.text, 100)}</span>
                        </div>
                        <span class="search-result-type">آية</span>
                    </div>
                `;
            });
        }

        searchResults.innerHTML = resultsHTML;
        searchResults.style.display = 'block';
    }

    // اختصار النص إذا كان طويلاً
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    // الانتقال إلى آية محددة
    window.goToVerse = function(surahNumber, verseNumber) {
        displaySurah(surahNumber).then(() => {
            const verseElement = document.querySelector(`[data-verse="${verseNumber}"]`);
            if (verseElement) {
                verseElement.scrollIntoView({ behavior: 'smooth' });
                verseElement.classList.add('highlighted');
                setTimeout(() => verseElement.classList.remove('highlighted'), 2000);
            }
        });
    };

    // Font size control
    fontSizeBtn.addEventListener('click', () => {
        fontSizePopup.classList.toggle('active');
    });

    document.querySelectorAll('.font-size-popup button').forEach(button => {
        button.addEventListener('click', () => {
            const size = button.dataset.size;
            surahText.className = `surah-text ${size}`;
            fontSizePopup.classList.remove('active');
            localStorage.setItem('fontSize', size);
        });
    });

    // Save and load progress
    function saveLastRead() {
        localStorage.setItem('lastReadSurah', currentSurah);
    }

    function loadLastRead() {
        const lastSurah = localStorage.getItem('lastReadSurah');
        if (lastSurah) {
            displaySurah(parseInt(lastSurah));
        } else {
            displaySurah(1);
        }
    }

    saveProgressBtn.addEventListener('click', () => {
        saveLastRead();
        alert('تم حفظ موضع القراءة');
    });

    // Initialize
    loadLastRead();

    // Click handlers for verses
    surahText.addEventListener('click', (e) => {
        if (e.target.classList.contains('verse')) {
            document.querySelectorAll('.verse').forEach(v => 
                v.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // Close popups when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.font-size-popup') && 
            !e.target.closest('#fontSizeBtn')) {
            fontSizePopup.classList.remove('active');
        }
        if (!e.target.closest('.search-results') && 
            !e.target.closest('#searchInput')) {
            searchResults.style.display = 'none';
        }
        if (e.target === surahListContainer) {
            surahListContainer.classList.remove('active');
        }
        if (e.target === quranImagesContainer) {
            quranImagesContainer.classList.remove('active');
        }
        if (e.target === quranImageModal) {
            quranImageModal.classList.remove('active');
        }
    });

    // مصفوفة تحتوي على روابط صور القرآن
    const quranImages = [
        'images/page1.jpg',
        'images/page2.jpg',
        'images/page3.jpg',
        // يمكن إضافة المزيد من الصور هنا
    ];

    // عرض صور القرآن
    quranImagesBtn.addEventListener('click', () => {
        displayQuranImages();
        quranImagesContainer.classList.add('active');
    });

    // إغلاق قائمة الصور
    closeImagesContainer.addEventListener('click', () => {
        quranImagesContainer.classList.remove('active');
    });

    // إغلاق صورة معينة
    closeImageModal.addEventListener('click', () => {
        quranImageModal.classList.remove('active');
    });

    // عرض قائمة الصور
    function displayQuranImages() {
        quranImagesList.innerHTML = quranImages.map((image, index) => `
            <img src="${image}" 
                 alt="صفحة ${index + 1}" 
                 class="quran-image-item"
                 onclick="showLargeImage('${image}')"
            >
        `).join('');
    }

    // عرض الصورة بشكل كبير
    window.showLargeImage = function(imageSrc) {
        modalImage.src = imageSrc;
        quranImageModal.classList.add('active');
    };
});
