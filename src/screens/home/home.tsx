/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import {
  SectionList,
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  Animated,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'
import { setLocation, Location, setRegions } from '../../redux/actions/location'
import Icon from 'react-native-vector-icons/AntDesign'
import style, { footerLinkColor } from './style'
import Fetcher from '../../utils/fetcher'
import Toolbar from '../../components/toolbar'
import { Host } from 'react-native-portalize'

import color from 'tinycolor2'
import numbro from '../../helpers/numbro'
import moment from '../../helpers/moment'
import variables from '../../theme/variables'
import { StackHeaderTitleProps } from '@react-navigation/stack'

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

class Home extends React.Component<React.ComponentProps<any>> {
  static Fetcher = new Fetcher()

  public state = {
    sort: 'asc',
    filter: undefined,
    myCityData: {
      data: [],
      links: {
        next: `/shrimp_prices?search&with=creator,species,region&sort=size_100,asc&region_id=${this.props.location.regions[0].id}`,
      },
      meta: {},
    },
    anotherData: {
      data: [],
      links: {
        next: '/shrimp_prices?search&with=creator,species,region&sort=size_100,asc',
      },
      meta: {},
    },
  }

  public componentDidMount() {
    this.getAndSetData()
    this.setHeader('Ukuran 100')
  }

  public componentDidUpdate(_prevProps, prevState) {
    if (prevState.sort !== this.state.sort) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          myCityData: {
            data: [],
            links: {
              next: `/shrimp_prices?search&with=creator,species,region&sort=size_100,${this.state.sort}&region_id=${this.props.location.regions[0].id}`,
            },
            meta: {},
          },
          anotherData: {
            data: [],
            links: {
              next: `/shrimp_prices?search&with=creator,species,region&sort=size_100,${this.state.sort}`,
            },
            meta: {},
          },
        },
        () => this.getAndSetData(),
      )
    }

    if (prevState.filter !== this.state.filter) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          anotherData: {
            data: [],
            links: {
              next: `/shrimp_prices?search&with=creator,species,region&sort=size_100,${
                this.state.sort
              }&region_id=${(this.state.filter as any).value || ''}`,
            },
            meta: {},
          },
        },
        () => this.getAndSetData(),
      )
    }
  }

  @autobind
  public getAndSetData() {
    const { myCityData, anotherData } = this.state

    if (Object.prototype.hasOwnProperty.call(myCityData.links, 'next') && myCityData.links.next) {
      this.retrieveData(myCityData.links.next)
        .then((data) => {
          if (Object.prototype.hasOwnProperty.call(data, 'data')) {
            this.setState(({ myCityData }) => ({
              myCityData: {
                data: [
                  ...myCityData.data,
                  ...data.data.filter(
                    (item: any) =>
                      Object.prototype.hasOwnProperty.call(item, 'id') &&
                      Object.prototype.hasOwnProperty.call(item, 'creator') &&
                      Object.prototype.hasOwnProperty.call(item, 'region'),
                  ),
                ],
                links: {},
                meta: data.meta,
              },
            }))
          }
        })
        .catch((error) => {
          throw new Error(error)
        })
    }

    if (Object.prototype.hasOwnProperty.call(anotherData.links, 'next') && anotherData.links.next) {
      this.retrieveData(anotherData.links.next)
        .then((data) => {
          if (Object.prototype.hasOwnProperty.call(data, 'data')) {
            this.setState(({ anotherData }) => ({
              anotherData: {
                data: [
                  ...anotherData.data,
                  ...data.data.filter(
                    (item: any) =>
                      Object.prototype.hasOwnProperty.call(item, 'id') &&
                      Object.prototype.hasOwnProperty.call(item, 'creator') &&
                      Object.prototype.hasOwnProperty.call(item, 'region'),
                  ),
                ],
                links: data.links,
                meta: data.meta,
              },
            }))
          }
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  @autobind
  public async retrieveData(apiUri: string) {
    try {
      const response = await Home.Fetcher.api(apiUri, {
        method: 'GET',
      })
      const result = await response.json()

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @autobind
  public goToDetail(item: any) {
    return (_e: GestureResponderEvent) => {
      this.props.navigation.navigate('Detail', { id: item.id })
    }
  }

  @autobind
  public setHeader(subtitle?: string, title = 'Harga Udang') {
    this.props.navigation.setOptions({
      headerLeft: () => <View />,
      headerTitle: (props: StackHeaderTitleProps) => {
        return (
          <>
            <Animated.Text style={props.style}>{title}</Animated.Text>
            {subtitle && (
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: color(variables.colors.grayLight).darken(10).toHexString(),
                  marginBottom: 6,
                }}>
                {subtitle}
              </Text>
            )}
          </>
        )
      },
    })
  }

  render() {
    const { myCityData, anotherData, sort, filter } = this.state

    const Item = (props: any) => {
      const { price, region, createdDate } = props

      return (
        <View style={style.item}>
          <View style={style.itemContent}>
            <View>
              <Text style={style.itemTitle}>{price}</Text>
              <Text style={style.itemSubtitle}>{region}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => console.info('Share')}>
              <Icon name="sharealt" size={22} color={footerLinkColor} />
            </TouchableWithoutFeedback>
          </View>
          <View style={style.itemFooter}>
            <Text style={style.itemDateInfo} numberOfLines={1}>
              {createdDate}
            </Text>
            <TouchableWithoutFeedback onPress={this.goToDetail(props)}>
              <View style={style.itemFooterLink}>
                <Text style={style.itemLink}>Harga Lengkap</Text>
                <Icon name="right" size={15} color={footerLinkColor} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )
    }

    const mappedData: Array<{
      title: string
      data: any[]
    }> = [
      {
        title: 'Harga Udang di kota anda',
        data: myCityData.data.filter((d: any) => d.size_100).slice(0, 3),
      },
      {
        title: 'Harga Udang di kota lain',
        data: anotherData.data.filter((d: any) => d.size_100 && d.currency_id === 'IDR'),
      },
    ]

    return (
      <Host>
        <SafeAreaView style={style.container}>
          <SectionList
            sections={mappedData}
            contentContainerStyle={style.contentContainer}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <Item
                id={item.id}
                region={item.region.full_name.replace(/DI/gi, 'Daerah Istimewa')}
                createdDate={moment(item.created_at).format(
                  `DD MMMM y [oleh ${item.creator ? item.creator.name : '-'}]`,
                )}
                price={numbro('id', item.size_100).formatCurrency({
                  thousandSeparated: true,
                  spaceSeparated: true,
                  mantissa: 2,
                })}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={style.sectionTitle}>{title}</Text>
            )}
            ListEmptyComponent={() => <Text style={style.sectionTitle}>Tidak Ada Data</Text>}
            onEndReachedThreshold={1}
            onEndReached={(_event) => this.getAndSetData()}
          />
          <Toolbar
            initialValues={{ sort, filter }}
            onApplied={(values, cb) =>
              this.setState({ sort: values.sort, filter: values.filter }, () => cb())
            }
          />
        </SafeAreaView>
      </Host>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
