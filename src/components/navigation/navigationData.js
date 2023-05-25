import AccessKeys from "../../enums/accessKeys";
import MarketViewIcon from "../UI/icons/marketView";
import SeoIcon from "../UI/icons/seo";
import NewsIcon from "../UI/icons/news";
import TransactionIcon from "../UI/icons/transaction";
import MapIcon from "../UI/icons/map";
import WatchListIcon from "../UI/icons/watchList";
import CandleStickIcon from "../UI/icons/candleStick";
import NotebookIcon from "../UI/icons/notebook";
import BankTransferIcon from "../UI/icons/bankTransfer";
import ChartIcon from "../UI/icons/chart";
import CheckListIcon from "../UI/icons/checkList";
import HistoryIcon from "../UI/icons/history";
import CreaditCardIcon from "../UI/icons/creaditCard";
import MoneyIcon from "../UI/icons/money";
import ChangeIcon from "../UI/icons/change";
import IndexIcon from "../UI/icons/index";
import FactoryIcon from "../UI/icons/factory";
import SejamIcon from "../UI/icons/sejam";
import BillIcon from "../UI/icons/bill";
import TableIcon from "../UI/icons/table";
import GroupIcon from "../UI/icons/group";
import EyeIcon from "../UI/icons/eye";
import PersonalizeIcon from "../UI/icons/personalize";
import CartIcon from "../UI/icons/cart";
// import LogoFaraTraderIcon from "../UI/icons/logoFaraTrader";
import LogoDanayanTraderIcon from "../UI/icons/logoDanayanTrader";
import TradeQueueIcon from "../UI/icons/tradeQueue";
import TradeTodayIcon from "../UI/icons/tradeToday";
import MailBoxIcon from "../UI/icons/mailBox";
import TradeDraftIcon from "../UI/icons/tradeDraft";
import CodeIcon from "../UI/icons/code";
import CodeListIcon from "../UI/icons/codeList";
import CodeAddIcon from "../UI/icons/codeAdd";

const data = [
  {
    title: "نمای بازار",
    link: "/marketView",
    icon: MarketViewIcon,
    accessKey: AccessKeys.MarketViewTab,
    children: [
      {
        title: "نمای بازار",
        children: [
          {
            title: "شاخص",
            link: "/marketView",
            icon: IndexIcon,
            accessKey: AccessKeys.IndexTab,
            // showable: true
          },
          {
            title: "صنایع",
            link: "/marketView/industries",
            icon: FactoryIcon,
            accessKey: AccessKeys.IndustriesTab,
          },
          {
            title: "جزئیات صنایع",
            link: "/marketView/industriesMap",
            icon: TableIcon,
            accessKey: AccessKeys.IndustriesDetailTab,
          },
          {
            title: "نقشه بازار",
            link: "/marketView/map",
            icon: MapIcon,
            accessKey: AccessKeys.MarketMapTab,
          },
        ],
      },
    ],
  },
  {
    title: "اوراق بهادار",
    link: "/tse",
    icon: SeoIcon,
    children: [
      {
        title: "اوراق بهادار",
        children: [
          {
            title: "معاملات",
            link: "/tse",
            icon: TransactionIcon,
            accessKey: AccessKeys.TradeTab,
            watchlist: true,
          },
          {
            title: "دیده‌بان",
            link: "/tse/marketWatch",
            icon: WatchListIcon,
            accessKey: AccessKeys.MarketWatchTab,
            isDesktopOnly: true,
          },
          {
            title: "چارت تکنیکال",
            link: "/tse/chart",
            icon: CandleStickIcon,
            watchlist: true,
            accessKey: AccessKeys.TechnicalChartTab,
            isDesktopOnly: true,
          },
          {
            title: "پرتفوی",
            link: "/portfolio",
            icon: CartIcon,
            isMobileOnly: true,
          },
          {
            title: "سفارشات فعال",
            link: "/ordersTable",
            icon: TradeQueueIcon,
            isMobileOnly: true,
          },
          {
            title: "معاملات امروز",
            link: "/tradesTable",
            icon: TradeTodayIcon,
            isMobileOnly: true,
          },
          {
            title: "پیش‌نویس سفارشات",
            link: "/draftOrdersTable",
            icon: TradeDraftIcon,
            isMobileOnly: true,
          },
          {
            title: "پیام ناظر",
            link: "/tse/observerMessage",
            icon: MailBoxIcon,
            isMobileOnly: true,
          },
        ],
      },
      {
        title: "گزارشات",
        children: [
          {
            title: "دفتر سفارشات",
            link: "/tse/orderBook",
            icon: NotebookIcon,
            accessKey: AccessKeys.OrderBookTab,
          },
          {
            title: "گردش حساب",
            link: "/tse/turnover",
            icon: BankTransferIcon,
            accessKey: AccessKeys.TurnoverTab,
          },
          {
            title: "پرتفوی سپرده‌گذاری",
            link: "/tse/portfolio",
            icon: ChartIcon,
            accessKey: AccessKeys.CsdAssetTab,
            isDesktopOnly: true,
          },
          {
            title: "توافقنامه",
            modal: "agreements",
            icon: CheckListIcon,
            accessKey: AccessKeys.AgreementTab,
          },
        ],
      },
      {
        title: "مالی",
        children: [
          {
            title: "پرداخت الکترونیک",
            modal: "electronicPayment",
            icon: CreaditCardIcon,
            accessKey: AccessKeys.ElectronicPaymentTab,
            isDesktopOnly: true,
          },
          {
            title: "پرداخت الکترونیک",
            link: "/tse/electronicPayment",
            icon: CreaditCardIcon,
            accessKey: AccessKeys.ElectronicPaymentTab,
            isMobileOnly: true,
          },
          {
            title: "واریز وجه",
            modal: "depositMoney",
            icon: BillIcon,
            accessKey: AccessKeys.DepositMoneyTab,
            isDesktopOnly: true,
          },
          {
            title: "واریز وجه",
            link: "/tse/depositMoney",
            icon: BillIcon,
            accessKey: AccessKeys.DepositMoneyTab,
            isMobileOnly: true,
          },
          {
            title: "درخواست پرداخت",
            modal: "paymentRequest",
            icon: MoneyIcon,
            accessKey: AccessKeys.PaymentRequestTab,
            isDesktopOnly: true,
          },
          {
            title: "درخواست پرداخت",
            link: "/tse/paymentRequest",
            icon: MoneyIcon,
            accessKey: AccessKeys.PaymentRequestTab,
            isMobileOnly: true,
          },
        ],
      },
      {
        title: "درخواست",
        children: [
          {
            title: "تغییر کارگزار ناظر",
            modal: "changeSupervisorBroker",
            icon: ChangeIcon,
            accessKey: AccessKeys.ChangeSupervisorBrokerTab,
            isDesktopOnly: true,
          },
          {
            title: "تغییر کارگزار ناظر",
            link: "/tse/changeSupervisorBroker",
            icon: ChangeIcon,
            accessKey: AccessKeys.ChangeSupervisorBrokerTab,
            isMobileOnly: true,
          },
        ],
      },
      {
        title: "آنلاین گروهی",
        children: [
          {
            title: "آنلاین گروهی",
            link: "/tse/onlineGroup",
            icon: GroupIcon,
            accessKey: AccessKeys.OnlineGroupTab,
            isDesktopOnly: true,
            watchlist: true,
          },
        ],
      },
    ],
  },
  {
    title: "معاملات",
    link: "/tse",
    icon: LogoDanayanTraderIcon,
    children: [],
    isMobileOnly: true,
    accessKey: AccessKeys.TradeTab,
    mainMenu: true,
  },
  {
    title: "اخبار",
    link: "/news",
    icon: NewsIcon,
    accessKey: AccessKeys.NewsTab,
    isDesktopOnly: true,
    children: [
      {
        title: "اخبار",
        children: [
          {
            title: "اخبار",
            link: "/news",
            icon: NewsIcon,
            accessKey: AccessKeys.NewsTab,
          },
        ],
      },
    ],
  },
  {
    title: "اخبار",
    link: "/news",
    icon: NewsIcon,
    accessKey: AccessKeys.NewsTab,
    isMobileOnly: true,
    children: [],
  },
  {
    title: "سجام",
    link: "/sejam",
    icon: SejamIcon,
    accessKey: AccessKeys.SejamTab,
    children: [],
    isDesktopOnly: true,
  },
  {
    title: "شخصی‌سازی",
    link: "/personalize",
    icon: PersonalizeIcon,
    accessKey: AccessKeys.PersonalizeTab,
    isDesktopOnly: true,
    children: [
      {
        title: "شخصی‌سازی",
        children: [
          {
            title: "شخصی‌سازی",
            link: "/personalize",
            icon: PersonalizeIcon,
            accessKey: AccessKeys.PersonalizeTab,
          },
        ],
      },
    ],
  },
  {
    title: "الگوریتم",
    link: "/algorithm",
    icon: CodeIcon,
    accessKey: AccessKeys.AlgorithmTab,
    children: [
      {
        title: "الگوریتم",
        children: [
          {
            title: "لیست الگوریتم",
            link: "/algorithm/list",
            icon: CodeListIcon,
            accessKey: AccessKeys.AlgorithmTab,
            isDesktopOnly: true,
          },
        ],
      },
    ],
  },
  {
    title: "دیده‌بان",
    link: "/watchlist",
    icon: WatchListIcon,
    children: [],
    isMobileOnly: true,
  },
];

export default data;
