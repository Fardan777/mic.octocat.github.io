// --- STICKY NAVBAR & ACTIVE NAVIGATION LINK ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active Link Highlight
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// --- RESPONSIVE MOBILE MENU ---
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- DARK MODE LOGIC ---
const themeToggleBtn = document.getElementById('dark-mode-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

// --- INTERACTIVE SMART CHECKOUT ---
function openOrderModal(productName) {
    const productSelect = document.getElementById('product');
    const orderSection = document.getElementById('kontak');

    productSelect.value = productName;
    orderSection.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNGSI ORDER LANGSUNG KE WHATSAPP BESERTA TAGIHAN ---
function handleOrder(event) {
    event.preventDefault();

    const form = document.getElementById('orderForm');
    const successAlert = document.getElementById('successMessage');

    // Mengambil data value dari Form input
    const nama = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const produk = document.getElementById('product').value;
    const jumlah = document.getElementById('quantity').value;

    // Kalkulasi Total Tagihan (Semua produk di HTML seharga Rp 5.000)
    const hargaPerPack = 5000;
    const totalTagihan = hargaPerPack * parseInt(jumlah);

    // Fungsi helper mengubah angka ke format rupiah mata uang IDR
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // PENTING: Ganti nomor di bawah ini menggunakan nomor WhatsApp Anda (Gunakan kode negara, contoh: 628xxx)
    const nomorWA = "62881023879528";

    // Penyusunan teks pesan cetak Invoice tagihan rapi
    const teksPesan = `Halo Agrisha, saya ingin memesan bibit dengan rincian berikut:

📝 *INVOICE PEMESANAN PINTAR*
• Nama Lengkap : ${nama}
• Email Pengguna : ${email}

🌱 *DETAIL ITEM BIBIT*
• Jenis Produk : ${produk}
• Kuantitas Pesan : ${jumlah} pack
• Harga Satuan : ${formatRupiah(hargaPerPack)}

💰 *TOTAL TAGIHAN*
*${formatRupiah(totalTagihan)}*

Mohon infokan detail nomor rekening untuk penyelesaian transaksi pembayaran. Terima kasih!`;

    // Pengkodean string URL teks agar aman dikirim via Web browser API
    const urlWA = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${encodeURIComponent(teksPesan)}`;

    // Menyembunyikan form awal dan memunculkan pesan alert sukses sementara
    form.style.display = 'none';
    successAlert.style.display = 'block';

    // Otomatis mengalihkan / membuka link WA di Tab Baru setelah delay 1.5 detik
    setTimeout(() => {
        window.open(urlWA, '_blank');

        // Reset form input setelah pengguna dialihkan
        setTimeout(() => {
            form.reset();
        }, 500);
    }, 1500);
}

// --- REVEAL ANIMATION UPON SCROLL ---
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);