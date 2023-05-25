import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import ShieldBlockIcon from "../../UI/icons/shieldBlock";
import Fade from "@material-ui/core/Fade";
import mockup from "../../../assets/images/mockup.png";
import mockup2 from "../../../assets/images/mockup2.png";
import style from "../../../shared/style";
import FeaturesFast from "../../UI/icons/featuresFast";
import FeaturesSafe from "../../UI/icons/featuresSafe";
import FeaturesModern from "../../UI/icons/featuresModern";
import { Typography } from "@material-ui/core";
import ReactPageScroller from "react-page-scroller";
import ScrollPager from "../../UI/scrollPager/scrollPager";
import PageTitle from "../pageTitle/pageTitle";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    height: "100%",
  },
  mainTitle: {
    height: 180,
    display: "flex",
    alignItems: "flex-end",
  },
  content: {
    padding: "30px 80px",
    overflowY: "auto",
    height: "calc(100% - 180px)",
  },
  featursItem: {
    margin: "20px 0",
  },
  featursTitle: {
    fontSize: 14,
    margin: "auto 0",
  },
  featurs1Title: {
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 50,
    "&:before": {
      content: "''",
      width: 50,
      height: 2,
      backgroundColor: theme.palette.primary.main,
      display: "inline-block",
      marginLeft: 10,
    },
    "&:after": {
      content: "''",
      width: 50,
      height: 2,
      backgroundColor: theme.palette.primary.main,
      display: "inline-block",
      marginRight: 10,
    },
  },
  featurs1Content: {
    padding: "0 40px",
  },
  featuresIcon: {
    width: 34,
    height: 34,
    fill: theme.palette.primary.main,
    marginLeft: 5,
  },
  featursDescribe: {
    fontSize: 11,
    textAlign: "justify",
    lineHeight: "1.8",
    marginTop: 10,
    color: theme.palette.text.secondary,
    paddingLeft: 30,
  },
  featurs2: {
    flex: "1",
    marginTop: 70,
  },
  featurs2Title: {
    fontSize: 22,
    fontWeigth: "600",
    "&:after": {
      content: "''",
      width: 50,
      height: 2,
      backgroundColor: theme.palette.primary.main,
      display: "block",
      marginTop: 10,
    },
  },
  mockup: {
    width: "100%",
    animation: "$zoom-in 12s cubic-bezier(.3,0,.7,1) infinite",
    borderRadius: 15,
  },
  "@keyframes zoom-in": {
    "0%": {
      transform: "scale(0.93)",
    },
    "50%": {
      transform: "scale(1.00)",
    },
    "100%": {
      transform: "scale(0.93)",
    },
  },
  "@keyframes zoom-out": {
    "0%": {
      transform: "scale(1.2)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  featuresIcon2: {
    width: 62,
    height: 62,
    margin: 20,
    // animation: "$zoom-out 8s cubic-bezier(.3,0,.7,1)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      fill: theme.palette.primary.main,
    },
  },
  featurs2IconTitle: {
    textAlign: "center",
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  featurs2Item: {
    margin: "0 auto",
  },
  pagination: {
    position: "fixed",
    left: 0,
    top: "45%",
    flexDirection: "column",
    "&>li": {
      margin: 2,
    },
  },
  section: {
    overflow: "hidden",
    height: "100%",
  },
}));

const LoginFeatures = (props) => {
  const classes = useStyles();
  const [slide, setSlide] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    setSlide(value - 1);
  };

  const scrollChange = (number) => {
    setPage(number + 1);
    setSlide(number);
  };

  useEffect(() => {
    props.setClientId();
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.mainTitle}>
        <PageTitle
          title="دانایان تریدر"
          subtitle="ویژگی‌های منحصر بفرد سامانه دانایان تریدر"
        />
      </Grid>
      <Fade
        in={true}
        {...{ timeout: 1200 }}
        style={{ transitionDelay: "1800ms" }}
      >
        <Grid item className={classes.content}>
          <ReactPageScroller
            containerWidth="100%"
            containerHeight="100%"
            customPageNumber={slide}
            pageOnChange={scrollChange}
          >
            <div className={classes.section}>
              <Grid container>
                <Grid item className={classes.featurs2}>
                  <Grid container>
                    <Grid item className={classes.featurs2Title}>
                      سریع، امن، مدرن
                    </Grid>
                    <Grid item className={classes.featursDescribe}>
                      خلاقیت ، تفاوت و جذابیت سازندگان چرخه موفقیت هستند به گونه
                      ای که شما با خلاقیت، متفاوت خواهید بود و بواسطه این تفاوت
                      و تمایز جذاب دیده می شوید پس جذابیت است که طراحی وب سایت
                      شما را موفق و در نتیجه ماندگار خواهد کرد. خلاقیت ، تفاوت و
                      جذابیت سازندگان چرخه موفقیت هستند به گونه ای که شما با
                      خلاقیت، متفاوت خواهید بود و بواسطه این تفاوت و تمایز جذاب
                      دیده می شوید پس جذابیت است که طراحی وب سایت شما را موفق و
                      در نتیجه ماندگار خواهد کرد.
                    </Grid>
                    <Grid item className={classes.featurs2Item}>
                      <Grid container>
                        <Grid item sm={4}>
                          <FeaturesFast className={classes.featuresIcon2} />
                          <Typography className={classes.featurs2IconTitle}>
                            سرعت بالا
                          </Typography>
                        </Grid>
                        <Grid item sm={4}>
                          <FeaturesSafe className={classes.featuresIcon2} />
                          <Typography className={classes.featurs2IconTitle}>
                            امنیت در معاملات
                          </Typography>
                        </Grid>
                        <Grid item sm={4}>
                          <FeaturesModern className={classes.featuresIcon2} />
                          <Typography className={classes.featurs2IconTitle}>
                            خلاقانه و مدرن
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.featurs2}>
                  <Grid container>
                    <Grid item>
                      <img src={mockup} className={classes.mockup} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div className={classes.section}>
              <Grid container className={classes.featurs1Title}>
                <Grid item>ویژگی‌های منحصربفرد دانایان تریدر</Grid>
              </Grid>
              <Grid container className={classes.featurs1Content}>
                <Grid item sm={6} className={classes.featursItem}>
                  <Grid container>
                    <Grid item>
                      <ShieldBlockIcon className={classes.featuresIcon} />
                    </Grid>
                    <Grid item className={classes.featursTitle}>
                      سرعت تعامل بالا با هسته معاملات
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item className={classes.featursDescribe}>
                      خلاقیت ، تفاوت و جذابیت سازندگان چرخه موفقیت هستند به گونه
                      ای که شما با خلاقیت، متفاوت خواهید بود و بواسطه این تفاوت
                      و تمایز جذاب دیده می شوید پس جذابیت است که طراحی وب سایت
                      شما را موفق و در نتیجه ماندگار خواهد کرد.
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={6} className={classes.featursItem}>
                  <Grid container>
                    <Grid item>
                      <ShieldBlockIcon className={classes.featuresIcon} />
                    </Grid>
                    <Grid item className={classes.featursTitle}>
                      کدنویسی سامانه منطبق بر استانداردهای بین المللی
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item className={classes.featursDescribe}>
                      خلاقیت ، تفاوت و جذابیت سازندگان چرخه موفقیت هستند به گونه
                      ای که شما با خلاقیت، متفاوت خواهید بود و بواسطه این تفاوت
                      و تمایز جذاب دیده می شوید پس جذابیت است که طراحی وب سایت
                      شما را موفق و در نتیجه ماندگار خواهد کرد.
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={6} className={classes.featursItem}>
                  <Grid container>
                    <Grid item>
                      <ShieldBlockIcon className={classes.featuresIcon} />
                    </Grid>
                    <Grid item className={classes.featursTitle}>
                      سطح امنیتی بالا
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item className={classes.featursDescribe}>
                      خلاقیت ، تفاوت و جذابیت سازندگان چرخه موفقیت هستند به گونه
                      ای که شما با خلاقیت، متفاوت خواهید بود و بواسطه این تفاوت
                      و تمایز جذاب دیده می شوید پس جذابیت است که طراحی وب سایت
                      شما را موفق و در نتیجه ماندگار خواهد کرد.
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={6} className={classes.featursItem}>
                  <Grid container>
                    <Grid item>
                      <ShieldBlockIcon className={classes.featuresIcon} />
                    </Grid>
                    <Grid item className={classes.featursTitle}>
                      طراحی خلاقانه و مدرن
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item className={classes.featursDescribe}>
                      خلاقیت ، تفاوت و جذابیت سازندگان چرخه موفقیت هستند به گونه
                      ای که شما با خلاقیت، متفاوت خواهید بود و بواسطه این تفاوت
                      و تمایز جذاب دیده می شوید پس جذابیت است که طراحی وب سایت
                      شما را موفق و در نتیجه ماندگار خواهد کرد.
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={6} className={classes.featursItem}>
                  <Grid container>
                    <Grid item>
                      <ShieldBlockIcon className={classes.featuresIcon} />
                    </Grid>
                    <Grid item className={classes.featursTitle}>
                      طراحی واکنشگرا و ریسپانسیو
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item className={classes.featursDescribe}>
                      خلاقیت ، تفاوت و جذابیت سازندگان چرخه موفقیت هستند به گونه
                      ای که شما با خلاقیت، متفاوت خواهید بود و بواسطه این تفاوت
                      و تمایز جذاب دیده می شوید پس جذابیت است که طراحی وب سایت
                      شما را موفق و در نتیجه ماندگار خواهد کرد.
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div className={classes.section}>
              <Grid container className={classes.featurs1Title}>
                <Grid item>بخش‌های اختصاصی سامانه</Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <img src={mockup2} className={classes.mockup} />
                </Grid>
              </Grid>
            </div>
          </ReactPageScroller>
          <ScrollPager
            count={3}
            page={page}
            onChange={handleChange}
            paginationClassName={classes.pagination}
            verticle
            leftRightBtn
          />
        </Grid>
      </Fade>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    clientId: state.account.clientId,
  };
};

export default withWidth()(LoginFeatures);
