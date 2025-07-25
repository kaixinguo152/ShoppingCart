class UIGoods {
  constructor(g) {
    this.data = g;
    this.chooseNumber = 0;
  }
  getTotalPrice() {
    return this.choose * this.data.price;
  }
  isChosed() {
    return this.choose > 0;
  }
  increase() {
    this.choose++;
  }
  decrease() {
    if (this.choose === 0) return;
    this.choose--;
  }
}

class UIData {
  constructor() {
    let uiGoods = [];
    for (let i = 0; i < goods.length; i++) {
      uiGoods.push(new UIGoods(goods[i]));
    }
    this.uiGoods = uiGoods;
    this.DeliveryThreshold = 30;
    this.DeliveryPrice = 5;
  }

  getTotalPrice() {
    let result = 0;
    for (let i = 0; i < this.uiGoods.length; i++) {
      result += this.uiGoods[i].getTotalPrice();
    }
    return result;
  }

  increase(index) {
    this.uiGoods[index].increase();
  }

  decrease() {
    this.uiGoods[index].decrease();
  }

  getTotalChooseNumber() {
    let result = 0;
    for (let i = 0; i < this.uiGoods.length; i++) {
      result += this.uiGoods[i].chooseNumber;
    }
    return result;
  }

  hasGoodsInCart() {
    return this.getTotalChooseNumber() > 0;
  }

  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.DeliveryThreshold;
  }

  isChosed(index) {
    return this.uiGoods[index].isChosed();
  }
}

class UI {
  constructor() {
    this.uiData = new UIData();
    this.doms = {
      menu: document.querySelector(".menu"),
      total: document.querySelector(".footer-car-total"),
      goodsContainer: document.querySelector(".goods-list"),
    };
    this.createHTML();
  }

  createHTML() {
    let html = "";
    for (let i = 0; i < this.uiData.uiGoods.length; i++) {
      let good = this.uiData.uiGoods[i];
      html += `<div class="goods-item">
          <img src="${good.data.pic}" alt="" class="goods-pic" />
          <div class="goods-info">
            <h2 class="goods-title">${good.data.title}</h2>
            <p class="goods-desc">
              ${good.data.desc}
            </p>
            <p class="goods-sell">
              <span>月售 ${good.data.sellNumber}</span>
              <span>好评率${good.data.favorRate}%</span>
            </p>
            <div class="goods-confirm">
              <p class="goods-price">
                <span class="goods-price-unit">￥</span>
                <span>${good.data.price}</span>
              </p>
              <div class="goods-btns">
                <i class="iconfont i-jianhao"></i>
                <span>${good.chooseNumber}</span>
                <i class="iconfont i-jiajianzujianjiahao"></i>
              </div>
            </div>
          </div>
        </div>`;
    }
    this.doms.goodsContainer.innerHTML = html;
  }

  increase() {
    this.uiData.increase(index);
    updateGoodsItem(index);
  }
  decrease(index) {
    this.uiData.decrease(index);
    updateGoodsItem(index);
  }
  updateGoodsItem() {
    let gDom = this.doms.goodsContainer.children[index];

    if (gDom.uiData.isChosed(index)) {
      gDom.classList.add("active");
    } else {
      gDom.classList.remove("active");
    }

    let span = gDom.querySelector(".goods-btns span");
    span.innerText = this.uiData.uiGoods[index].chooseNumber;
  }
}

let ui = new UI();

function setOffset() {
  let offset = findIndex() * ui.doms.goodsContainer.children[0].clientHeight;
  ui.doms.goodsContainer.style.transform = `translateY(-${offset}px)`;
}

ui.doms.menu.addEventListener("click", (e) => {
  let item = document.querySelector(".active");
  if (item) {
    item.classList.remove("active");
  }
  e.target.classList.add("active");
  setOffset();
});

function findIndex() {
  for (let i = 0; i < ui.doms.menu.children.length; i++) {
    if (ui.doms.menu.children[i].classList.contains("active")) {
      return i;
    }
  }
  return -1;
}
