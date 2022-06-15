import Grid from '@material-ui/core/Grid'

import PrimaryLayout from './../../../components/template/PrimaryLayout'
import NavPart from './../../../components/organisms/NavPart'
import MainContent from './../../../components/organisms/MainContent'
import FilterPart from './../../../components/organisms/FilterPart'
import ContentPart from './../../../components/organisms/ContentPart'

import ItemBox from './../../../components/atoms/ItemBox'
import MartItem from './../../../components/molecules/MartItem'

import { useAppSelector } from "../../../redux/hook";
import { useDispatch, useSelector } from "react-redux";


const filterOptions = [
  {
    key: "filters",
    name: "Filters",
    options: [
      {
        key: "all",
        name: "All",
      },
      {
        key: "supplies",
        name: "Supplies",
      },
      {
        key: "powerups",
        name: "Powerups",
      }
    ]
  }
];

const MartPage = () => {
  const dispatch = useDispatch();
  // Handle Filter
  const handleFilter = (filterOption: string, key: string) => {
    dispatch({
      type: "HANDLE_FILTER",
      filterOption,
      key
    })
  }
  const store = useAppSelector((state: any) => state.mart)
  const marts = useSelector((state: any) => state.global.items)
  const flag = useSelector((state: any) => state.global.connectFlag)

  return (
    <PrimaryLayout>
      {
        flag ?
          <>
            <NavPart> </NavPart>
            <MainContent>
              <FilterPart
                filterOptions={filterOptions}
                filters={store.filters}
                enables={store.enables}
                handleFilter={handleFilter}
              >
              </FilterPart>


              <ContentPart>
                <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={3}>
                  {marts.length > 0 && marts.map((nft: any, index: number) => {
                    return <Grid item lg={4} md={6} key={index}>
                      <ItemBox>
                        <MartItem
                          info={nft}
                          index={index}
                        >
                        </MartItem>
                      </ItemBox>
                    </Grid>
                  })}
                </Grid>
              </ContentPart>

            </MainContent>
          </>
          :
          <div style={{ height: "100vh" }}>
            <Grid container justifyContent="center">
              <div className="fontQuick" style={{ marginTop: '150px', textAlign: 'center', color: 'white', fontSize: '24px' }}>Please connect a Metamask to start.</div>
            </Grid>
          </div>
      }

    </PrimaryLayout>
  )
}

export default MartPage;

