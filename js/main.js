document.addEventListener('DOMContentLoaded', () => {});

window.addEventListener('load', () => {
  const bannerSwiper = new Swiper('.js_banner .swiper', {
    direction: 'horizontal',
    loop: true,
    effect: 'fade',
    grabCursor: true,
    pagination: {
      el: '.banner .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
  });

  const bookSwiper = new Swiper('.js_bookList .swiper', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 80,
    grabCursor: true,
    pagination: {
      el: '.bookList .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.bookList .swiper-button-next',
      prevEl: '.bookList .swiper-button-prev',
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: true,
    },
    on: {
      slideChange: function () {
        let activeIdx = document.querySelectorAll('.js_bookList a')[this.activeIndex];
        let imageUrl = activeIdx.style.backgroundImage;
        document.querySelector('.js_viewer').style.backgroundImage = imageUrl;
      },
    },
  });

  const repaintBgImg = new RepaintBgImg();

  const noticeList = [
    '[02.07] 국어 3월모평대비 무료특강 예약필수',
    '[02.03] 김해외고1 내신무료특강 2월26일(토) / 2월27일(일)',
    '[01.27] [중2~고3] 3월 입시전략 설명회'
  ]
  
  const noticeList2 = [
    '[01.08] 수능국어 개강',
    '[01.22] 반송고 국어 내신개강',
    '[01.19] 창원여고 국어내신 전반마감 예비고1개강!'
  ]
  
  const courseList = [
    '[02.21] 비상한학원 [ 국어관 ] 문법 NEW',
    '[02.21] 비상한학원 [ 국어관 ] 문학 NEW',
    '[02.11] 비상한학원 [ 국어관 ] 작문 NEW',
  ]
  
  const noticeLoad= new LoadList(noticeList);
  document.getElementById('board').querySelector('.notice > tbody').innerHTML = noticeLoad.loadData();
  const noticeLoad2= new LoadList(noticeList2);
  document.getElementById('board').querySelector('.notice2 > tbody').innerHTML = noticeLoad2.loadData();
  const courseLoad= new LoadList(courseList);
  document.getElementById('board').querySelector('.course > tbody').innerHTML = courseLoad.loadData();
}); // load

class RepaintBgImg {
  constructor() {
    this.section = document.getElementById('bookList');
    this.itemLink = this.section.querySelectorAll('.js_cntr a');
    this.len = this.itemLink.length;
    this.navBtn = this.section.querySelectorAll('.js_navbar > button');
    this.repaint();
  }

  repaint() {
    this.navBtn.forEach((element) => {
      element.addEventListener('click', (event) => {
        if (!event.target.classList.contains('is_active')) {
          const dataIndex = Number(event.target.getAttribute('data-index'));
          for (let i = 0; i < this.len; i++) {
            this.itemLink[i].style.backgroundImage = `url(./img/book_${i + dataIndex}.jpg)`;
          }
          this.navBtn.forEach((element) => {
            element.classList.toggle('is_active');
          });
        }
      });
    });
  }
}

class LoadList {
  constructor(data) {
    this.data = data;
  }

  loadData(data = this.data) {
    const dataList = [];
    data.forEach((element) => {
      dataList.push(`<tr><td><a href="#" style="width:inherit;">${element}</a></td></tr>`);
    });
    return dataList.join('')
  }
}

window.addEventListener('scroll', () => {
  let scrollVal = window.pageYOffset;
  console.log(scrollVal)

  const appearanceStore = new Appearance(document.querySelectorAll('.js_symbol_body > li'));
  if (scrollVal > 1000) {
    appearanceStore.removeClass();
  } else {
    appearanceStore.addClass();
  }
}); // scroll

class Appearance {
  constructor(element) {
    this.item = element;
  }

  removeClass() {
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].classList.remove('is_hidden');
    }
  }

  addClass() {
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].classList.add('is_hidden');
    }
  }
} //  class Appearance 