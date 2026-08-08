document.addEventListener('DOMContentLoaded', () => {

    const ADMIN_WHATSAPP = "923364119987";

    // 1. STANDARD APPOINTMENT MODAL LOGIC
    const appointmentModal = document.getElementById('appointmentModal');
    const openAppointmentBtns = document.querySelectorAll('.open-modal-btn');
    const closeAppointmentBtn = document.querySelector('.close-modal-btn');
    const bookingForm = document.getElementById('bookingForm');

    openAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            appointmentModal.classList.add('active');
        });
    });

    if (closeAppointmentBtn) {
        closeAppointmentBtn.addEventListener('click', () => {
            appointmentModal.classList.remove('active');
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('custName').value;
            const phone = document.getElementById('custPhone').value;
            const service = document.getElementById('custService').value;
            const date = document.getElementById('custDate').value;
            const time = document.getElementById('custTime').value;
            const notes = document.getElementById('custNotes').value;

            const message = `Hello Trends By Rukhsar Virani Team! 👋\n\nI would like to book a general appointment:\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💅 *Service:* ${service}\n📅 *Date:* ${date}\n⏰ *Time:* ${time}\n📝 *Notes:* ${notes || 'N/A'}\n\nPlease confirm my slot. Thank you!`;

            const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            appointmentModal.classList.remove('active');
            bookingForm.reset();
        });
    }


    // 2. EXCLUSIVE DEALS MODAL LOGIC
    const dealsModal = document.getElementById('dealsModal');
    const openDealsBtns = document.querySelectorAll('.open-deals-btn');
    const closeDealsBtn = document.querySelector('.close-deals-btn');

    openDealsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            dealsModal.classList.add('active');
        });
    });

    if (closeDealsBtn) {
        closeDealsBtn.addEventListener('click', () => {
            dealsModal.classList.remove('active');
        });
    }


    // 3. SELECT DEAL & CONFIRMATION FLOW
    const confirmDealModal = document.getElementById('confirmDealModal');
    const closeConfirmBtn = document.querySelector('.close-confirm-btn');
    const selectDealBtns = document.querySelectorAll('.select-deal-btn');
    const dealBookingForm = document.getElementById('dealBookingForm');

    // Selected Deal Storage Variables
    let selectedDealData = {
        title: '',
        price: '',
        items: ''
    };

    selectDealBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedDealData.title = btn.getAttribute('data-title');
            selectedDealData.price = btn.getAttribute('data-price');
            selectedDealData.items = btn.getAttribute('data-items');

            // Set Data inside Confirmation Box
            document.getElementById('summaryDealTitle').innerText = selectedDealData.title;
            document.getElementById('summaryDealPrice').innerText = selectedDealData.price;
            document.getElementById('summaryDealItems').innerText = `Includes: ${selectedDealData.items}`;

            // Close Deals Modal & Open Confirmation Modal
            dealsModal.classList.remove('active');
            confirmDealModal.classList.add('active');
        });
    });

    if (closeConfirmBtn) {
        closeConfirmBtn.addEventListener('click', () => {
            confirmDealModal.classList.remove('active');
        });
    }

    // Submit Deal to Admin WhatsApp
    if (dealBookingForm) {
        dealBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const custName = document.getElementById('dealCustName').value;
            const custPhone = document.getElementById('dealCustPhone').value;
            const custDate = document.getElementById('dealCustDate').value;
            const custTime = document.getElementById('dealCustTime').value;

            const dealMessage = `*NEW DEAL BOOKING REQUEST* 🌟\n--------------------------\n🏷️ *Deal Name:* ${selectedDealData.title}\n💰 *Price:* ${selectedDealData.price}\n✨ *Includes:* ${selectedDealData.items}\n--------------------------\n👤 *Client Name:* ${custName}\n📞 *Phone:* ${custPhone}\n📅 *Preferred Date:* ${custDate}\n⏰ *Preferred Time:* ${custTime}\n--------------------------\nPlease confirm this deal booking!`;

            const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(dealMessage)}`;
            window.open(whatsappUrl, '_blank');

            confirmDealModal.classList.remove('active');
            dealBookingForm.reset();
        });
    }


    // 4. OVERLAY CLICK TO CLOSE ALL MODALS
    window.addEventListener('click', (e) => {
        if (e.target === appointmentModal) appointmentModal.classList.remove('active');
        if (e.target === dealsModal) dealsModal.classList.remove('active');
        if (e.target === confirmDealModal) confirmDealModal.classList.remove('active');
    });


    // 5. SCROLL REVEAL ANIMATIONS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));


    // 6. SOLID NAVBAR ON SCROLL
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // 7. DYNAMIC SCROLLSPY LINK HIGHLIGHT
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            if (!item.classList.contains('open-deals-btn')) {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            }
        });
    });


    // 8. MOBILE HAMBURGER MENU
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});