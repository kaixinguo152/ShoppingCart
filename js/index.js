class UIgoods {
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
      uiGoods.push(new UIgoods(goods[i]));
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
}

let uidata = new UIData();
console.log(uidata.uiGoods);

const doms = {
  menu: document.querySelector(".menu"),
  total: document.querySelector(".footer-car-total"),
  goodList: document.querySelector(".goods-list"),
};

doms.total.innerHTML = "1.00";

function setOffset() {
  let offset = findIndex() * doms.goodList.children[0].clientHeight;
  doms.goodList.style.transform = `translateY(-${offset}px)`;
}

doms.menu.addEventListener("click", (e) => {
  let item = document.querySelector(".active");
  if (item) {
    item.classList.remove("active");
  }
  e.target.classList.add("active");
  setOffset();
});

function findIndex() {
  for (let i = 0; i < doms.menu.children.length; i++) {
    if (doms.menu.children[i].classList.contains("active")) {
      return i;
    }
  }
  return -1;
}

for (let i = 0; i < goods.length; i++) {
  let good = goods[i];
  let goodItem = document.createElement("div");
  goodItem.classList.add("good-item");
  goodItem.innerHTML = `
    <img src="${good.pic}" alt="" class="goods-pic" />
    <div class="goods-info">
      <h2 class="goods-title">${good.title}</h2>
      <p class="goods-desc">
        ${good.desc}
      </p>
      <p class="goods-sell">
        <span>月售 ${good.sellNumber}</span>
        <span>好评率${good.favorRate}</span>
      </p>
      <div class="goods-confirm">
        <p class="goods-price">
          <span class="goods-price-unit">￥</span>
          <span>${good.price}</span>
        </p>
        <div class="goods-btns">
          <i class="iconfont i-jianhao"></i>
          <span>0</span>
          <i class="iconfont i-jiajianzujianjiahao"></i>
        </div>
      </div>
    </div>
  `;
  doms.goodList.appendChild(goodItem);

  const div1 = document.createElement("div");
  div1.classList.add("good-item");
  div1.innerHTML = `
  <img src="./assets/g1.png" alt="" class="goods-pic" />
          <div class="goods-info">
            <h2 class="goods-title">椰云拿铁</h2>
            <p class="goods-desc">
              1人份【年度重磅，一口吞云】 √原创椰云topping，绵密轻盈到飞起！
              原创瑞幸椰云™工艺，使用椰浆代替常规奶盖
              打造丰盈、绵密，如云朵般细腻奶沫体验 椰香清甜饱满，一口滑入口腔
              【饮用建议】请注意不要用吸管，不要搅拌哦~
            </p>
            <p class="goods-sell">
              <span>月售 200</span>
              <span>好评率95%</span>
            </p>
            <div class="goods-confirm">
              <p class="goods-price">
                <span class="goods-price-unit">￥</span>
                <span>32</span>
              </p>
              <div class="goods-btns">
                <i class="iconfont i-jianhao"></i>
                <span>0</span>
                <i class="iconfont i-jiajianzujianjiahao"></i>
              </div>
            </div>
          </div>
  `;
  doms.goodList.appendChild(div1);
}
