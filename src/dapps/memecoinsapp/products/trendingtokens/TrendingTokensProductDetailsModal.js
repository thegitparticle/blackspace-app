import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import axios from 'axios';
import {LineChart} from 'react-native-wagmi-charts';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TrendingTokensProductDetailsModal({route, dispatch}) {
  const {token} = route.params;

  let refinedChartInfo = [];

  const dummy = [
    {
      timestamp: 1625945400000,
      value: 33575.25,
    },
    {
      timestamp: 1625946300000,
      value: 33545.25,
    },
    {
      timestamp: 1625947200000,
      value: 33510.25,
    },
    {
      timestamp: 1642042958739,
      value: 33215.25,
    },
  ];

  const dummy1 = [
    {timestamp: 1641283447899, value: 46660.94899372711},
    {timestamp: 1641288012372, value: 46491.7299974738},
    {timestamp: 1641290591066, value: 46379.43752784},
    {timestamp: 1641294134280, value: 46889.481956170144},
    {timestamp: 1641297635870, value: 46803.15078633856},
    {timestamp: 1641301351402, value: 46591.722409635506},
    {timestamp: 1641304819028, value: 47057.02449635822},
    {timestamp: 1641308504345, value: 47507.693656884665},
    {timestamp: 1641312124917, value: 47066.565769064786},
    {timestamp: 1641315838958, value: 46904.77628067637},
    {timestamp: 1641319476342, value: 46664.62988762414},
    {timestamp: 1641323061960, value: 45794.698823411105},
    {timestamp: 1641326637863, value: 45998.57774647676},
    {timestamp: 1641330091596, value: 46346.54389040857},
    {timestamp: 1641333724982, value: 46294.00598439383},
    {timestamp: 1641337326283, value: 46164.78138780403},
    {timestamp: 1641340861450, value: 45938.02427172366},
    {timestamp: 1641344840565, value: 46309.780484451265},
    {timestamp: 1641348195428, value: 46243.70671169548},
    {timestamp: 1641351964396, value: 46370.15671395653},
    {timestamp: 1641355217638, value: 46519.15292800913},
    {timestamp: 1641358907318, value: 46405.09737517141},
    {timestamp: 1641362492586, value: 46368.51184567423},
    {timestamp: 1641366411646, value: 46520.72301190721},
    {timestamp: 1641369639615, value: 46442.61044066538},
    {timestamp: 1641373280721, value: 46718.281511878595},
    {timestamp: 1641377060497, value: 46928.9216580707},
    {timestamp: 1641380606451, value: 46807.334592906205},
    {timestamp: 1641384180115, value: 46227.51895201363},
    {timestamp: 1641387673199, value: 46234.17945837771},
    {timestamp: 1641391408831, value: 46437.15064097346},
    {timestamp: 1641395070993, value: 46672.86344852452},
    {timestamp: 1641398692468, value: 46582.01937118689},
    {timestamp: 1641402166180, value: 46323.97349825478},
    {timestamp: 1641405727046, value: 46110.1080410069},
    {timestamp: 1641409219501, value: 46102.42435014894},
    {timestamp: 1641412861674, value: 44612.77028346195},
    {timestamp: 1641416612139, value: 43603.15636475003},
    {timestamp: 1641420222269, value: 43563.7669335129},
    {timestamp: 1641423675058, value: 43265.68419748686},
    {timestamp: 1641427521551, value: 43526.03699363513},
    {timestamp: 1641430833914, value: 43847.688673129465},
    {timestamp: 1641434518993, value: 43577.32729981543},
    {timestamp: 1641438049821, value: 43442.960347641194},
    {timestamp: 1641441769524, value: 42855.743701843276},
    {timestamp: 1641445402894, value: 43182.13203574093},
    {timestamp: 1641448972753, value: 43133.88951437514},
    {timestamp: 1641452436783, value: 43098.31703698685},
    {timestamp: 1641456012941, value: 43299.864091009105},
    {timestamp: 1641459702388, value: 43057.84751445313},
    {timestamp: 1641463656767, value: 42703.36056443185},
    {timestamp: 1641467015178, value: 43090.71627324187},
    {timestamp: 1641470405869, value: 42950.01250715864},
    {timestamp: 1641474310292, value: 43051.928752955675},
    {timestamp: 1641477685200, value: 43252.30879046338},
    {timestamp: 1641481390768, value: 42999.140355503594},
    {timestamp: 1641485000076, value: 43064.242154904234},
    {timestamp: 1641488604001, value: 42929.17562516623},
    {timestamp: 1641492178628, value: 43216.707222626836},
    {timestamp: 1641495651042, value: 43529.97080585511},
    {timestamp: 1641499373649, value: 43564.33881780466},
    {timestamp: 1641502899257, value: 43228.3389135418},
    {timestamp: 1641506555552, value: 43178.458566711575},
    {timestamp: 1641510137332, value: 43275.913391207716},
    {timestamp: 1641513862138, value: 43216.45867693359},
    {timestamp: 1641517379657, value: 42841.385619102155},
    {timestamp: 1641521004390, value: 43079.76824158689},
    {timestamp: 1641524583989, value: 42891.15137509921},
    {timestamp: 1641528250809, value: 41456.48777650421},
    {timestamp: 1641531603788, value: 41542.612836321045},
    {timestamp: 1641535343306, value: 41720.44267405448},
    {timestamp: 1641538841288, value: 41473.52875874361},
    {timestamp: 1641542556644, value: 41684.607937553825},
    {timestamp: 1641546077337, value: 42229.97612939636},
    {timestamp: 1641549728941, value: 42523.260365014015},
    {timestamp: 1641553441451, value: 42290.92456350433},
    {timestamp: 1641557058531, value: 42259.753413505416},
    {timestamp: 1641561113945, value: 42508.27428616143},
    {timestamp: 1641564109472, value: 41205.72613043629},
    {timestamp: 1641567847665, value: 42139.52325999248},
    {timestamp: 1641571211563, value: 41119.024408424884},
    {timestamp: 1641574909884, value: 42055.59232485777},
    {timestamp: 1641578452184, value: 42020.89034315403},
    {timestamp: 1641582004488, value: 41656.45492289296},
    {timestamp: 1641585625400, value: 41860.923915891086},
    {timestamp: 1641589241222, value: 42048.24539614439},
    {timestamp: 1641592862385, value: 41940.26742082219},
    {timestamp: 1641596610920, value: 41585.022892259345},
    {timestamp: 1641600202713, value: 41527.197042644846},
    {timestamp: 1641603620328, value: 42103.39299049203},
    {timestamp: 1641607448672, value: 41922.15383071767},
    {timestamp: 1641610896401, value: 41881.187701671},
    {timestamp: 1641614555887, value: 41836.56876711941},
    {timestamp: 1641618020444, value: 41959.08282504925},
    {timestamp: 1641621744346, value: 41974.50666226844},
    {timestamp: 1641625537112, value: 41952.29226515728},
    {timestamp: 1641629023990, value: 41924.13855248408},
    {timestamp: 1641632770339, value: 42007.49237135092},
    {timestamp: 1641636232654, value: 42187.823029036284},
    {timestamp: 1641639808637, value: 41936.80939833606},
    {timestamp: 1641643321460, value: 41951.69546447275},
    {timestamp: 1641647551482, value: 41939.18949694112},
    {timestamp: 1641650642323, value: 41970.268220541315},
    {timestamp: 1641654209172, value: 41802.54277533546},
    {timestamp: 1641657699735, value: 41723.85138105828},
    {timestamp: 1641661271282, value: 41517.616946201764},
    {timestamp: 1641664878545, value: 40999.24260500303},
    {timestamp: 1641668715967, value: 40655.24908589081},
    {timestamp: 1641672109968, value: 40739.225396627015},
    {timestamp: 1641675697765, value: 41040.3613698119},
    {timestamp: 1641679414516, value: 42240.08706720382},
    {timestamp: 1641682870751, value: 42003.66945857541},
    {timestamp: 1641686602796, value: 41756.66232397826},
    {timestamp: 1641690971797, value: 42000.240211691154},
    {timestamp: 1641693648250, value: 41733.04713333396},
    {timestamp: 1641697257413, value: 42241.227639919394},
    {timestamp: 1641701055530, value: 41927.7407403526},
    {timestamp: 1641704531951, value: 42161.6998622604},
    {timestamp: 1641708343770, value: 41826.91765809273},
    {timestamp: 1641712094243, value: 41990.9082749726},
    {timestamp: 1641715312369, value: 41915.90493234757},
    {timestamp: 1641719157507, value: 41816.651397806745},
    {timestamp: 1641722772695, value: 41573.21912616642},
    {timestamp: 1641726222292, value: 41717.4189645261},
    {timestamp: 1641729814482, value: 41940.925016294445},
    {timestamp: 1641733222178, value: 41870.91178181394},
    {timestamp: 1641736802349, value: 41558.21781001086},
    {timestamp: 1641740481132, value: 41697.62145515702},
    {timestamp: 1641744142908, value: 41699.74767272069},
    {timestamp: 1641747778464, value: 42259.3531251793},
    {timestamp: 1641751414348, value: 42126.082987655245},
    {timestamp: 1641754986109, value: 42187.10149327908},
    {timestamp: 1641758749231, value: 42755.76334790146},
    {timestamp: 1641762208944, value: 42425.779919715664},
    {timestamp: 1641765884859, value: 42385.96034409413},
    {timestamp: 1641769419512, value: 42218.57126578665},
    {timestamp: 1641772950310, value: 41862.3609856517},
    {timestamp: 1641776524678, value: 41722.052179742655},
    {timestamp: 1641780082130, value: 41908.46943784095},
    {timestamp: 1641783877216, value: 42097.52849018815},
    {timestamp: 1641787453076, value: 42093.09713354394},
    {timestamp: 1641790901055, value: 42409.43949411891},
    {timestamp: 1641794492515, value: 42040.80237211051},
    {timestamp: 1641798365919, value: 41984.114573677936},
    {timestamp: 1641801828202, value: 42089.717024449346},
    {timestamp: 1641805419345, value: 41877.300794403345},
    {timestamp: 1641809000733, value: 41907.306643042524},
    {timestamp: 1641812464569, value: 41895.43847707444},
    {timestamp: 1641816283813, value: 41592.68513813869},
    {timestamp: 1641819831175, value: 41043.49854788218},
    {timestamp: 1641823429205, value: 40896.51770007245},
    {timestamp: 1641827101665, value: 40683.26965807297},
    {timestamp: 1641830561037, value: 40897.01826082547},
    {timestamp: 1641834243594, value: 41903.97717897294},
    {timestamp: 1641837634220, value: 41325.58695675088},
    {timestamp: 1641841522658, value: 41795.35404441451},
    {timestamp: 1641845022491, value: 41346.75755547179},
    {timestamp: 1641848605816, value: 41698.06528069751},
    {timestamp: 1641852359543, value: 41853.7126324314},
    {timestamp: 1641855775536, value: 41656.505042558805},
    {timestamp: 1641859612461, value: 41890.545239659165},
    {timestamp: 1641862861189, value: 41808.46520197215},
    {timestamp: 1641866523502, value: 42105.84704855687},
    {timestamp: 1641870180543, value: 42306.74186075323},
    {timestamp: 1641873886320, value: 42311.23662781285},
    {timestamp: 1641877441591, value: 42364.41551602892},
    {timestamp: 1641880887106, value: 42130.68177026306},
    {timestamp: 1641884910050, value: 42135.106775957975},
    {timestamp: 1641888309731, value: 42243.851002932126},
    {timestamp: 1641891781511, value: 41945.14058742656},
    {timestamp: 1641895618486, value: 42049.451722500395},
    {timestamp: 1641899014463, value: 41740.46854333929},
    {timestamp: 1641902534194, value: 41977.97404052251},
    {timestamp: 1641906240594, value: 41915.61971398387},
    {timestamp: 1641909769558, value: 41741.98689268442},
    {timestamp: 1641913246541, value: 41639.209139319355},
    {timestamp: 1641917096520, value: 41628.0329959911},
    {timestamp: 1641920589186, value: 43026.634910880945},
    {timestamp: 1641924250508, value: 42496.08715199643},
    {timestamp: 1641927947995, value: 42847.00401898649},
    {timestamp: 1641931479225, value: 43161.26720258187},
    {timestamp: 1641935061951, value: 42805.11267846471},
    {timestamp: 1641938645625, value: 42758.81667143197},
    {timestamp: 1641942239886, value: 42836.282931337686},
    {timestamp: 1641945990831, value: 42811.149099488095},
    {timestamp: 1641949262841, value: 42736.150332354366},
    {timestamp: 1641953026561, value: 42690.185587975626},
    {timestamp: 1641956627767, value: 42590.282253812686},
    {timestamp: 1641960275622, value: 42691.535020841184},
    {timestamp: 1641963669095, value: 42650.881859577625},
    {timestamp: 1641967314368, value: 42819.939667867315},
    {timestamp: 1641970854286, value: 42726.12283691961},
    {timestamp: 1641974545540, value: 42648.50740945896},
    {timestamp: 1641978377552, value: 42703.84164196805},
    {timestamp: 1641981824871, value: 42820.60036227033},
    {timestamp: 1641985397324, value: 42893.65433215027},
    {timestamp: 1641988806392, value: 43178.3020044094},
    {timestamp: 1641992545560, value: 43286.3461468275},
    {timestamp: 1641996126309, value: 44142.95617046611},
    {timestamp: 1641999672650, value: 43954.05064468909},
    {timestamp: 1642003841953, value: 43537.75551153419},
    {timestamp: 1642007034663, value: 43714.08929251948},
    {timestamp: 1642010514034, value: 43946.62531700104},
    {timestamp: 1642014454026, value: 43643.559182658464},
    {timestamp: 1642017813930, value: 43830.018518688914},
    {timestamp: 1642021238046, value: 44079.045729932375},
    {timestamp: 1642025022806, value: 43851.179214070566},
    {timestamp: 1642028535522, value: 43933.94798971295},
    {timestamp: 1642032252744, value: 43981.87732717414},
    {timestamp: 1642035710007, value: 43702.3823096264},
    {timestamp: 1642039215490, value: 43585.47818629988},
    {timestamp: 1642043038630, value: 43628.98833147167},
    {timestamp: 1642046571347, value: 43545.54886489405},
    {timestamp: 1642050250941, value: 43692.499996266684},
    {timestamp: 1642053677650, value: 43743.26864684281},
    {timestamp: 1642057800287, value: 43705.251773803444},
    {timestamp: 1642060879336, value: 43754.37515992663},
    {timestamp: 1642064554485, value: 43920.6078574499},
    {timestamp: 1642068206085, value: 43890.03403522622},
    {timestamp: 1642071831247, value: 43880.251837517484},
    {timestamp: 1642075433653, value: 43680.55986683123},
    {timestamp: 1642079228777, value: 43816.41969175357},
    {timestamp: 1642082596289, value: 43991.10705362516},
    {timestamp: 1642086471956, value: 44046.08436602141},
    {timestamp: 1642089673636, value: 42979.593359374114},
    {timestamp: 1642093226543, value: 43324.93335811952},
    {timestamp: 1642096927774, value: 42817.17658254182},
    {timestamp: 1642100455812, value: 42743.748516695814},
    {timestamp: 1642104254943, value: 42724.89581260096},
    {timestamp: 1642107958197, value: 42720.94616556062},
    {timestamp: 1642111249198, value: 42899.81519999951},
    {timestamp: 1642115106976, value: 42641.77574380057},
    {timestamp: 1642118481011, value: 42608.41001195019},
    {timestamp: 1642123052338, value: 42822.3410626846},
    {timestamp: 1642125764703, value: 42630.730370044825},
    {timestamp: 1642129238747, value: 42827.69538217487},
    {timestamp: 1642132899597, value: 42780.31638262786},
    {timestamp: 1642136467530, value: 42727.79226823351},
    {timestamp: 1642140271662, value: 42894.38226108194},
    {timestamp: 1642143736242, value: 42899.36778267711},
    {timestamp: 1642147011000, value: 42669.57369234513},
  ];

  function getCoinChartInfo(coin_id) {
    let chartInfo = [];

    const config = {
      method: 'get',
      url:
        'https://api.coingecko.com/api/v3/coins/' +
        'bitcoin' +
        '/market_chart?vs_currency=usd&days=10',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(response => {
        chartInfo = response.data.prices;
      })
      .then(() => {
        for (let i = 0; i < chartInfo.length; i++) {
          // let x_here = Object.assign({timestamp: 0, value: 0}, chartInfo[i]);
          let x_here = {timestamp: chartInfo[i][0], value: chartInfo[i][1]};
          refinedChartInfo.push(x_here);
        }
      })
      .then(() => console.log(refinedChartInfo.length))
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getCoinChartInfo(token.token_gecko_id);
  }, []);

  function RenderTokenDetails() {
    return (
      <View style={styles.token_details_view_wrap}>
        <View style={styles.token_details_left_side_view}>
          <FastImage
            source={{
              uri: token.token_icon,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.token_details_coin_logo_image}
          />
          <View style={styles.token_details_name_ticker_view}>
            <Text style={styles.token_details_name_text}>
              {token.token_name}
            </Text>
            <Text style={styles.token_details_ticker_text}>
              {token.token_symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.token_details_price_change_view}>
          <Text style={styles.token_details_price_text}>
            {token.current_price}
          </Text>
        </View>
      </View>
    );
  }

  function RenderPriceDetails() {
    return (
      <View style={styles.price_details_view_wrap}>
        <View style={styles.price_details_block_view}>
          <Text style={styles.price_details_title_text}>
            last 24 hours change (%)
          </Text>
          <Text style={styles.price_details_value_text}>
            <Text
              style={{
                color:
                  token._24h_change < 0
                    ? themeHere.colors.danger_red
                    : themeHere.colors.success_green,
              }}>
              {token._24h_change.substring(0, 5)} %
            </Text>
          </Text>
        </View>
        <View style={styles.price_details_block_view}>
          <Text style={styles.price_details_title_text}>
            last 7 days change (%)
          </Text>
          <Text style={styles.price_details_value_text}>
            <Text
              style={{
                color:
                  token._24h_change < 0
                    ? themeHere.colors.danger_red
                    : themeHere.colors.success_green,
              }}>
              {token._7d_change.substring(0, 5)} %
            </Text>
          </Text>
        </View>
        <View style={styles.price_details_block_view}>
          <Text style={styles.price_details_title_text}>market cap ($)</Text>
          <Text style={styles.price_details_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              ${' '}
              {token.market_cap
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>...</Text>
        <LineChart.Provider data={dummy1}>
          <LineChart>
            <LineChart.Path
              color={
                _.last(dummy1).value - _.head(dummy1).value > 0
                  ? themeHere.colors.success_green
                  : themeHere.colors.danger_red
              }>
              <LineChart.Gradient
                color={
                  _.last(dummy1).value - _.head(dummy1).value > 0
                    ? themeHere.colors.success_green
                    : themeHere.colors.danger_red
                }
              />
            </LineChart.Path>
          </LineChart>
        </LineChart.Provider>
        <RenderTokenDetails />
        <RenderPriceDetails />
      </ScrollView>
    </View>
  );
}

export default TrendingTokensProductDetailsModal;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    backgroundColor: themeHere.colors.background,
  },
  token_details_view_wrap: {
    marginTop: 60,
    marginBottom: 30,
    width: windowWidth - 40,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  token_details_left_side_view: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  token_details_coin_logo_image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  token_details_name_ticker_view: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 50,
    marginHorizontal: 20,
  },
  token_details_name_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
  },
  token_details_ticker_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
  },
  token_details_price_change_view: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 50,
    marginHorizontal: 20,
  },
  token_details_price_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    textAlign: 'right',
  },
  token_details_change_percent_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
    textAlign: 'right',
  },
  price_details_view_wrap: {
    marginVertical: 30,
    width: windowWidth - 40,
    alignSelf: 'center',
  },
  price_details_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
    width: windowWidth - 80,
  },
  price_details_title_text: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '50',
  },
  price_details_value_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
  },
});
