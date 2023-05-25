const steps = {
  marketView: [
    {
      selector: `[data-tour="indexData1"]`,
      content: "این قسمت مربوط به شاخص بورس میباشد",
    },
    {
      selector: `[data-tour="market"]`,
      content: "قیمت شاخص و تغییرات",
    },
    {
      selector: `[data-tour="marketEntryDate"]`,
      content: "آخرین به روز  رسانی",
    },
    {
      selector: `[data-tour="marketChart"]`,
      content: "نمودار تغییرات شاخص در بازه‌های زمانی مختلف",
    },
    {
      selector: `[data-tour="marketValue"]`,
      content: "ارزش بازار",
    },
    {
      selector: `[data-tour="marketTotalNumberOfTrades"]`,
      content: "تعداد معاملات",
    },
    {
      selector: `[data-tour="marketTotalTradeValue"]`,
      content: "ارزش معاملات",
    },
    {
      selector: `[data-tour="marketTotalNumberOfSharesTraded"]`,
      content: "حجم معاملات",
    },
    {
      selector: `[data-tour="indexData2"]`,
      content: "این قسمت مربوط به شاخص فرابورس میباشد",
    },
    {
      selector: `[data-tour="Gainers"]`,
      content: "بیشترین تاثیر مثبت در شاخص",
    },
    {
      selector: `[data-tour="Losers"]`,
      content: "بیشترین تاثیرمنفی در شاخص",
    },
    {
      selector: `[data-tour="marketActivity"]`,
      content: "وضعیت بازار",
    },
    {
      selector: `[data-tour="tradesSignSummary"]`,
      content: "وضعیت نمادها",
    },
  ],
  SectorSummary: [
    {
      selector: `[data-tour="sectorSummary"]`,
      content: "خلاصه صنایع",
    },
    {
      selector: `[data-tour="sectorSummarySectors"]`,
      content: "نام صنعت",
    },
    {
      selector: `[data-tour="sectorVolume"]`,
      content: "ارزش معاملات",
    },
    {
      selector: `[data-tour="sectorSummaryPieChart"]`,
      content: "ارزش معاملات صنایع",
    },
    {
      selector: `[data-tour="sectorSummaryStockWatch"]`,
      content: "دیده‌بان صنایع",
    },
  ],
  industriesMap: [
    {
      selector: `[data-tour="industriesMapSectorTitle"]`,
      content: "نام صنعت",
    },
    {
      selector: `[data-tour="industriesMapValue"]`,
      content: "ارزش صنعت",
    },
    {
      selector: `[data-tour="industriesMapChart"]`,
      content: "نمودار تعداد نمادهای مثبت، منفی و خنثی",
    },
    {
      selector: `[data-tour="industriesMapGrid"]`,
      content: "لیست وضعیت نمادهای صنعت",
    },
  ],
  treemap: [
    {
      selector: `[data-tour="treemap"]`,
      content: "نقشه بازار",
    },
  ],
  news: [
    {
      selector: `[data-tour="newsItem"]`,
      content: "اخبار بازار",
    },
  ],
  trades: [
    {
      selector: `[data-tour="indexLevel"]`,
      content: "شاخص کل بازار بورس",
    },
    {
      selector: `[data-tour="marketIcon"]`,
      content: "وضعیت بازار",
    },
    {
      selector: `[data-tour="connection"]`,
      content: "وضعیت اتصال به هسته",
    },
    {
      selector: `[data-tour="messages"]`,
      content: "صندوق پیام‌های دریافت شده از سامانه",
    },
    {
      selector: `[data-tour="profileMenu"]`,
      content: "پروفایل شما",
    },
    {
      selector: `[data-tour="hotList"]`,
      content: "لیست دیده‌بان‌ها",
    },
    {
      selector: `[data-tour="listView"]`,
      content: "تغییر حالت نمایش لیست دیده‌بان",
    },
    {
      selector: `[data-tour="searchButton"]`,
      content: "جستجوی نماد",
    },
    {
      selector: `[data-tour="watchlistItemTitle"]`,
      content: "نام نماد",
    },
    {
      selector: `[data-tour="watchlistItemLastTradePrice"]`,
      content: "آخرین قیمت معامله",
    },
    {
      selector: `[data-tour="watchlistItemPriceVariation"]`,
      content: "تغییرات قیمت",
    },
    {
      selector: `[data-tour="instrument"]`,
      content: "بخش نمایش اطلاعات نماد انتخاب شده",
    },
    {
      selector: `[data-tour="instrumentSearch"]`,
      content: "جستجوی سریع نماد",
    },
    {
      selector: `[data-tour="instrumentFavorites"]`,
      content: "افزودن به لیست علاقه‌مندی‌ها",
    },
    {
      selector: `[data-tour="buySellModal"]`,
      content: "پاپ‌آپ خرید و فروش",
    },
    {
      selector: `[data-tour="bidask"]`,
      content: "جدول عرضه و تقاضای نماد انتخاب شده",
    },
    {
      selector: `[data-tour="clientTrade"]`,
      content:
        "اطلاعات خرید و فروش مربوط به اشخاص حقیقی و افراد و شرکت های حقوقی",
    },
    {
      selector: `[data-tour="range"]`,
      content:
        "اطلاعات مربوط به قیمت فعلی، بازه قیمتی روز جاری و بازه نوسان قیمتی در یکسال اخیر نماد انتخاب شده",
    },
    {
      selector: `[data-tour="trade"]`,
      content: "نمودار قیمت و فرم خرید و فروش سهام",
    },
    {
      selector: `[data-tour="footer"]`,
      content:
        "بخش سفارشات ارسال شده، معاملات روز جاری، پرتفوی سهام خریداری شده و پیشنویس های ثبت شده",
    },
    {
      selector: `[data-tour="propertyAmount"]`,
      content: "قدرت خرید و دارایی شما",
    },
    {
      selector: `[data-tour="observerMessage"]`,
      content: "لیست پیام‌های ارسال شده از ناظر",
    },
  ],
  marketWatch: [
    {
      selector: `[data-tour="marketWatch"]`,
      content: "اطلاعات مربوط به نمادهای بازار",
    },
  ],
  orderBook: [
    {
      selector: `[data-tour="orderBook"]`,
      content: "اطلاعات مربوط به دفتر سفارشات",
    },
  ],
  turnover: [
    {
      selector: `[data-tour="turnover"]`,
      content: "اطلاعات مربوط به گردش حساب",
    },
  ],
  portfolio: [
    {
      selector: `[data-tour="portfolio"]`,
      content: "اطلاعات مربوط به پرتفوی سپرده‌گذاری",
    },
  ],

  personalize: [
    {
      selector: `[data-tour="personalizeAddBtn"]`,
      content: "اضافه کردن ابزارک",
    },
    {
      selector: `[data-tour="personalizeTemplates"]`,
      content: "قالب‌های آماده",
    },
    {
      selector: `[data-tour="personalizeClear"]`,
      content: "حذف ویجت ها",
    },
    {
      selector: `[data-tour="personalizeLayout"]`,
      content: "صفحه افرون ویجت",
    },
  ],
};

export default steps;
