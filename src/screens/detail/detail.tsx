/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLocation, Location, setRegions } from '../../redux/actions/location'
import style, { chartConfig } from './style'
import Fetcher from '../../utils/fetcher'
import numbro from '../../helpers/numbro'
import moment from '../../helpers/moment'
import autobind from 'autobind-decorator'
import { LineChart } from 'react-native-chart-kit'

const mapStateToProps = (state: { locationReducer: { location: Location; regions: any } }) => {
  return {
    location: state.locationReducer.location,
    regions: state.locationReducer.regions,
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    setLocation: bindActionCreators(setLocation, dispatch),
    setRegions: bindActionCreators(setRegions, dispatch),
  }
}

const DATA = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [50, 20, 2, 86, 71, 100],
    },
    {
      data: [20, 10, 4, 56, 87, 90],
    },
    {
      data: [30, 90, 67, 54, 10, 2],
    },
  ],
}

class Detail extends React.Component<React.ComponentProps<any>> {
  static Fetcher = new Fetcher()

  public state = {
    data: {},
    species: {},
    region: {},
  }

  public componentDidMount() {
    this.getData().then(({ data }) =>
      this.getRegion(data.region_id).then(({ data: region }) =>
        this.getSpesies(data.species_id).then(({ data: species }) => {
          this.setState({ data, species, region })
        }),
      ),
    )
  }

  @autobind
  public async getData() {
    const {
      route: {
        params: { id },
      },
    } = this.props

    try {
      const resp = await Detail.Fetcher.api(`/shrimp_prices/${id}`, { method: 'GET' })
      const result = await resp.json()

      return result
    } catch (error) {
      Promise.reject(error)
      throw new Error(error)
    }
  }

  @autobind
  public async getSpesies(id: number | string) {
    try {
      const resp = await Detail.Fetcher.api(`/species/${id}`, { method: 'GET' })
      const result = await resp.json()

      return result
    } catch (error) {
      Promise.reject(error)
      throw new Error(error)
    }
  }

  @autobind
  public async getRegion(id: number | string) {
    try {
      const resp = await Detail.Fetcher.api(`/regions/${id}`, { method: 'GET' })
      const result = await resp.json()

      return result
    } catch (error) {
      Promise.reject(error)
      throw new Error(error)
    }
  }

  render() {
    const { data, species, region } = this.state as any

    const width = Dimensions.get('window').width - 40
    const height = 220
    const sizesPrice = Object.keys(data).filter((key) => {
      const match = new RegExp('size_(.*)', 'gm').exec(key)

      return match && match[1] && data[key]
    })

    const tableData = {
      labels: sizesPrice.map((key) => {
        const label = new RegExp('size_(.*)', 'gm').exec(key)
        return label && label[1]
      }),
      datasets: [
        {
          data: sizesPrice.map((key) => parseInt(data[key], 0)),
        },
      ],
    }

    return (
      <SafeAreaView style={style.container}>
        <ScrollView>
          {sizesPrice && sizesPrice.length ? (
            <>
              <View style={style.card}>
                <Text style={style.subtitle}>Spesies : {species.name}</Text>
                <Text style={[style.textBase, style.textPrimary, style.textLg]}>
                  {region.name ? region.name.replace(/DI/gi, 'Daerah Istimewa') : '-'}
                </Text>
              </View>
              <View style={style.card}>
                {sizesPrice.map((key, index) => (
                  <View
                    key={index}
                    style={[
                      style.pricesItem,
                      index + 1 >= sizesPrice.length ? style.pricesItemLast : null,
                    ]}>
                    <Text style={[style.textBase]}>Harga Ukuran {key.replace(/size_/gi, '')}</Text>
                    <Text style={[style.textBase, style.textBold]}>
                      {data[key]
                        ? numbro('id', data[key]).formatCurrency({
                            thousandSeparated: true,
                            spaceSeparated: true,
                            mantissa: 2,
                          })
                        : '-'}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={style.card}>
                <Text style={[style.textBase, style.textLg, style.title]}>
                  Perbedaan Harga Udang
                </Text>
                <LineChart
                  style={style.chart}
                  data={tableData as any}
                  width={width}
                  height={height}
                  chartConfig={chartConfig}
                  withDots={false}
                  withInnerLines={false}
                  formatYLabel={(val) => {
                    return numbro('id', parseInt(val, 0)).formatCurrency({
                      average: true,
                      spaceSeparated: true,
                    })
                  }}
                  bezier
                />
              </View>
              <View style={style.card}>
                <Text style={[style.textBase, style.title]}>Kontak Penjual</Text>
                <Text style={style.subtitle}>Nama :</Text>
                <Text style={[style.textBase, style.textBold, style.gapBottom]}>
                  {data.creator.name || '-'}
                </Text>
                <Text style={style.subtitle}>Email:</Text>
                <Text style={[style.textBase, style.textBold, style.gapBottom]}>
                  {data.creator.email || '-'}
                </Text>
                <Text style={style.subtitle}>No Telepon:</Text>
                <Text style={[style.textBase, style.textBold, style.gapBottom]}>
                  {data.creator.phone || '-'}
                </Text>
                <Text style={style.subtitle}>Alamat:</Text>
                <Text style={[style.textBase, style.textBold]}>{data.creator.address || '-'}</Text>
              </View>
              <View style={style.card}>
                <Text style={style.subtitle}>Catatan :</Text>
                <Text style={[style.textBase, style.textBold]}>{data.remark || '-'}</Text>
              </View>
              <View style={style.card}>
                <Text style={style.subtitle}>Di edit pada :</Text>
                <Text style={[style.textBase, style.textBold]}>
                  {data.updated_at
                    ? moment(data.updated_at).format(
                        `DD MMMM y [oleh ${data.creator ? data.creator.name : '-'}]`,
                      )
                    : '-'}
                </Text>
              </View>
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
