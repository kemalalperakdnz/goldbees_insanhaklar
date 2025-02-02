// Navbar scroll efekti
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Sayfa yüklendiğinde kontrol et
    checkScroll();
    
    // Scroll event listener
    window.addEventListener('scroll', checkScroll);

    // Smooth scroll için
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Erişilebilirlik menüsü fonksiyonları
document.addEventListener('DOMContentLoaded', function() {
    const accessibilityBtn = document.getElementById('accessibilityBtn');
    const accessibilityMenu = document.getElementById('accessibilityMenu');
    
    if (accessibilityBtn && accessibilityMenu) {
        // Menüyü aç/kapa
        accessibilityBtn.addEventListener('click', function() {
            accessibilityMenu.classList.toggle('active');
        });

        // Menü dışına tıklandığında kapat
        document.addEventListener('click', function(e) {
            if (!accessibilityMenu.contains(e.target) && !accessibilityBtn.contains(e.target)) {
                accessibilityMenu.classList.remove('active');
            }
        });

        // Büyük Metin
        let textSizeLevel = 1;
        const fontSizeBtn = document.getElementById('fontSizeBtn');
        if (fontSizeBtn) {
            fontSizeBtn.addEventListener('click', function() {
                // Remove previous text size class
                document.body.classList.remove(`text-size-${textSizeLevel}`);
                
                // Increment level and loop back to 1 if exceeds 5
                textSizeLevel = textSizeLevel >= 5 ? 1 : textSizeLevel + 1;
                
                // Add new text size class
                document.body.classList.add(`text-size-${textSizeLevel}`);
                
                // Update level indicator
                const levelIndicator = this.querySelector('.level-indicator') || 
                    (() => {
                        const span = document.createElement('span');
                        span.className = 'level-indicator';
                        this.appendChild(span);
                        return span;
                    })();
                levelIndicator.textContent = textSizeLevel;
                
                // Update button style
                this.classList.toggle('active', textSizeLevel > 1);
            });
        }

        // Kontrast
        let contrastLevel = 1;
        const contrastBtn = document.getElementById('contrastBtn');
        if (contrastBtn) {
            contrastBtn.addEventListener('click', function() {
                // Remove previous contrast class
                document.body.classList.remove(`contrast-${contrastLevel}`);
                
                // Increment level and loop back to 1 if exceeds 5
                contrastLevel = contrastLevel >= 5 ? 1 : contrastLevel + 1;
                
                // Add new contrast class
                document.body.classList.add(`contrast-${contrastLevel}`);
                
                // Update level indicator
                const levelIndicator = this.querySelector('.level-indicator') || 
                    (() => {
                        const span = document.createElement('span');
                        span.className = 'level-indicator';
                        this.appendChild(span);
                        return span;
                    })();
                levelIndicator.textContent = contrastLevel;
                
                // Update button style
                this.classList.toggle('active', contrastLevel > 1);
            });
        }

        // Metin Okuma
        window.ttsActive = false;
        window.currentUtterance = null;
        const readingBtn = document.getElementById('readingBtn');
        
        // Metin okuma durumunu güncelle
        window.toggleTTS = function() {
            window.ttsActive = !window.ttsActive;
            
            // Durum bildirimini güncelle
            const ttsStatus = document.getElementById('ttsStatus');
            const ttsStatusText = document.getElementById('ttsStatusText');
            if (ttsStatus && ttsStatusText) {
                ttsStatusText.textContent = window.ttsActive ? 'Açık' : 'Kapalı';
                ttsStatus.style.display = 'block';
                setTimeout(() => {
                    ttsStatus.style.display = 'none';
                }, 2000);
            }

            // Metin okuma butonunun görünümünü güncelle
            if (readingBtn) {
                readingBtn.classList.toggle('active', window.ttsActive);
                readingBtn.style.background = window.ttsActive ? 'var(--primary-color)' : 'var(--light-bg)';
                readingBtn.style.color = window.ttsActive ? 'white' : 'inherit';
            }
            
            // Eğer kapatılıyorsa aktif konuşmayı durdur
            if (!window.ttsActive && window.currentUtterance) {
                window.speechSynthesis.cancel();
                window.currentUtterance = null;
            }
        };

        // F tuşu ile text-to-speech'i aç/kapa
        document.addEventListener('keydown', function(event) {
            if (event.key.toLowerCase() === 'f') {
                window.toggleTTS();
            }
        });

        if (readingBtn) {
            readingBtn.addEventListener('click', function() {
                window.toggleTTS();
            });
        }

        // Fare ile üzerine gelinen metinleri oku
        document.addEventListener('mouseover', function(event) {
            if (!window.ttsActive) return;

            const element = event.target;
            const text = element.textContent?.trim();
            
            if (text && text.length > 1 && element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
                if (window.currentUtterance) {
                    window.speechSynthesis.cancel();
                }

                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'tr-TR'; // Türkçe dil desteği
                utterance.rate = 1.0; // Konuşma hızı
                window.currentUtterance = utterance;
                window.speechSynthesis.speak(utterance);
            }
        });

        // Büyük İmleç
        let isLargeCursor = false;
        const cursorBtn = document.getElementById('cursorBtn');
        if (cursorBtn) {
            cursorBtn.addEventListener('click', function() {
                isLargeCursor = !isLargeCursor;
                document.body.style.cursor = isLargeCursor ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23000000\' d=\'M13.64,21.97C13.14,22.21 12.54,22.11 12.14,21.71L6.14,15.71C5.74,15.31 5.64,14.71 5.88,14.21C6.12,13.71 6.62,13.41 7.14,13.41H10.14V3.41C10.14,2.61 10.74,1.91 11.64,1.91C12.54,1.91 13.14,2.61 13.14,3.41V13.41H16.14C16.66,13.41 17.16,13.71 17.4,14.21C17.64,14.71 17.54,15.31 17.14,15.71L11.14,21.71C10.74,22.11 10.14,22.21 9.64,21.97Z\'/%3E%3C/svg%3E") 16 16, auto' : '';
                this.classList.toggle('active', isLargeCursor);
            });
        }

        // Animasyonları Durdur
        let areAnimationsStopped = false;
        const animationBtn = document.getElementById('animationBtn');
        if (animationBtn) {
            animationBtn.addEventListener('click', function() {
                areAnimationsStopped = !areAnimationsStopped;
                
                // Tüm animasyonlu öğeleri seç
                const animatedElements = document.querySelectorAll('.carousel, .fade-in, .slide-up, [data-bs-ride], [data-aos], .animate__animated');
                
                animatedElements.forEach(element => {
                    if (areAnimationsStopped) {
                        // Animasyonları durdur
                        element.style.animation = 'none';
                        element.style.transition = 'none';
                        // Bootstrap carousel'ı durdur
                        if (element.classList.contains('carousel')) {
                            const carousel = bootstrap.Carousel.getInstance(element);
                            if (carousel) {
                                carousel.pause();
                            }
                        }
                    } else {
                        // Animasyonları geri aç
                        element.style.animation = '';
                        element.style.transition = '';
                        // Bootstrap carousel'ı başlat
                        if (element.classList.contains('carousel')) {
                            const carousel = bootstrap.Carousel.getInstance(element);
                            if (carousel) {
                                carousel.cycle();
                            }
                        }
                    }
                });

                // Buton stilini güncelle
                this.classList.toggle('active', areAnimationsStopped);
            });
        }

        // Disleksi Dostu Font
        let isDyslexiaFont = false;
        const dyslexiaBtn = document.getElementById('dyslexiaBtn');
        if (dyslexiaBtn) {
            dyslexiaBtn.addEventListener('click', function() {
                isDyslexiaFont = !isDyslexiaFont;
                if (isDyslexiaFont) {
                    document.body.style.fontFamily = "'OpenDyslexic', Arial, sans-serif";
                    document.body.style.letterSpacing = '0.05em';
                    document.body.style.wordSpacing = '0.1em';
                    document.body.style.fontWeight = '500';
                } else {
                    document.body.style.fontFamily = '';
                    document.body.style.letterSpacing = '';
                    document.body.style.wordSpacing = '';
                    document.body.style.fontWeight = '';
                }
                this.classList.toggle('active', isDyslexiaFont);
            });
        }

        // Satır Yüksekliği
        let lineHeightLevel = 1;
        const lineHeightBtn = document.getElementById('lineHeightBtn');
        if (lineHeightBtn) {
            lineHeightBtn.addEventListener('click', function() {
                // Önceki satır yüksekliği sınıfını kaldır
                if (lineHeightLevel > 0) {
                    document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div').forEach(element => {
                        element.style.lineHeight = '';
                    });
                }

                // Seviyeyi artır ve 5'ten büyükse 1'e döndür
                lineHeightLevel = lineHeightLevel >= 5 ? 1 : lineHeightLevel + 1;

                // Yeni satır yüksekliğini uygula
                let newLineHeight = 'normal';
                if (lineHeightLevel === 2) newLineHeight = '1.8';  // Normal'den belirgin bir artış
                if (lineHeightLevel === 3) newLineHeight = '2.2';  // İkinci seviyeden belirgin bir artış
                if (lineHeightLevel === 4) newLineHeight = '2.6';  // Üçüncü seviyeden belirgin bir artış
                if (lineHeightLevel === 5) newLineHeight = '3.0';  // En yüksek seviye, maksimum okunabilirlik

                if (lineHeightLevel > 1) {
                    document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div').forEach(element => {
                        element.style.lineHeight = newLineHeight;
                    });
                }

                // Buton stilini güncelle
                this.classList.toggle('active', lineHeightLevel > 1);

                // Seviye göstergesini güncelle
                const levelIndicator = this.querySelector('.level-indicator') || 
                    (() => {
                        const span = document.createElement('span');
                        span.className = 'level-indicator';
                        this.appendChild(span);
                        return span;
                    })();
                levelIndicator.textContent = lineHeightLevel > 1 ? lineHeightLevel : '';
            });
        }

        // Metin Hizalama
        let currentAlign = 'left';
        const alignBtns = {
            left: document.getElementById('alignLeftBtn'),
            center: document.getElementById('alignCenterBtn'),
            right: document.getElementById('alignRightBtn'),
            justify: document.getElementById('alignJustifyBtn')
        };

        function updateAlignButtons() {
            Object.keys(alignBtns).forEach(align => {
                if (alignBtns[align]) {
                    alignBtns[align].classList.toggle('active', align === currentAlign);
                }
            });
        }

        Object.keys(alignBtns).forEach(align => {
            const btn = alignBtns[align];
            if (btn) {
                btn.addEventListener('click', function() {
                    // Remove previous alignment
                    document.body.classList.remove(`text-align-${currentAlign}`);
                    
                    // Set new alignment
                    currentAlign = align;
                    document.body.classList.add(`text-align-${currentAlign}`);
                    
                    // Update button styles
                    updateAlignButtons();
                });
            }
        });

        // Sıfırlama butonu
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                // Metin boyutunu sıfırla
                document.body.classList.remove(`text-size-${textSizeLevel}`);
                textSizeLevel = 1;
                const fontSizeLevelIndicator = fontSizeBtn.querySelector('.level-indicator');
                if (fontSizeLevelIndicator) fontSizeLevelIndicator.textContent = '';
                fontSizeBtn.classList.remove('active');

                // Kontrastı sıfırla
                document.body.classList.remove(`contrast-${contrastLevel}`);
                contrastLevel = 1;
                const contrastLevelIndicator = contrastBtn.querySelector('.level-indicator');
                if (contrastLevelIndicator) contrastLevelIndicator.textContent = '';
                contrastBtn.classList.remove('active');

                // Disleksi fontunu sıfırla
                document.body.style.fontFamily = '';
                document.body.style.letterSpacing = '';
                document.body.style.wordSpacing = '';
                document.body.style.fontWeight = '';
                isDyslexiaFont = false;
                dyslexiaBtn.classList.remove('active');

                // Satır yüksekliğini sıfırla
                document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div').forEach(element => {
                    element.style.lineHeight = '';
                });
                lineHeightLevel = 1;
                lineHeightBtn.classList.remove('active');
                const lineHeightLevelIndicator = lineHeightBtn.querySelector('.level-indicator');
                if (lineHeightLevelIndicator) lineHeightLevelIndicator.textContent = '';

                // Metin hizalamayı sıfırla
                document.body.classList.remove(`text-align-${currentAlign}`);
                document.body.style.textAlign = '';
                document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div').forEach(element => {
                    element.style.textAlign = '';
                });
                Object.values(alignBtns).forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.background = '';
                });
                currentAlign = 'left';

                // İmleç boyutunu sıfırla
                document.body.style.cursor = '';
                isLargeCursor = false;
                cursorBtn.classList.remove('active');

                // Animasyonları sıfırla
                document.body.classList.remove('no-animations');
                animationBtn.classList.remove('active');
                const animatedElements = document.querySelectorAll('.carousel, .fade-in, .slide-up, [data-bs-ride], [data-aos], .animate__animated');
                animatedElements.forEach(element => {
                    element.style.animation = '';
                    element.style.transition = '';
                    if (element.classList.contains('carousel')) {
                        const carousel = bootstrap.Carousel.getInstance(element);
                        if (carousel) {
                            carousel.cycle();
                        }
                    }
                });

                // Metin okuma özelliğini kapat
                if (window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                }
                readingBtn.classList.remove('active');

                // Bildirim göster
                alert('Tüm erişilebilirlik ayarları sıfırlandı!');
            });
        }
    }
});
