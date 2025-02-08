// imports
import './UserHomePage.css'
import { useContext, useState, useEffect } from 'react'
import { showGame } from '../../services/apiService'
import { UserContext } from '../../contexts/UserContext'
import { SettingsContext } from '../../contexts/SettingsContext'
import { showSettings } from '../../services/settingsService'
import CardComponent from "../CardComponent/CardComponent"
import CardDetails from "../CardDetails/CardDetails"
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer'


// component
const UserHomePage = ({ handleCardClick, handleCloseModal, isModalOpen, setIsModalOpen, selectedGame }) => {
    // hooks
    const { user } = useContext(UserContext)
    const { setIsSettings, settings, setSettings } = useContext(SettingsContext)

    // state variable
    const [gameData, setGameData] = useState([])
    const [reset, setReset] = useState(false)

    // use effects
    useEffect(() => {    
        const fetchSettings = async () => {
          const fetchedSettings = await showSettings(user._id)

          try {
            if (fetchedSettings && fetchedSettings.settings && fetchedSettings.settings.length > 0) {
                const fetchedMedia = fetchedSettings.settings[0].media || []
                const fetchedGenres = fetchedSettings.settings[0].genre || []
                setSettings({
                    media: fetchedMedia,
                    genre: fetchedGenres,
                })
            } else {
                setSettings({
                    media: [],
                    genre: [],
                })
                setIsSettings(false)
            }
          } catch (err) {
            console.log('Error fetching settings:', err)
          }
        }

        if (user) { fetchSettings() }
      }, [user, setSettings, setIsSettings])


      useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchedData = await showGame(settings.genre)
            setGameData(fetchedData)
          } catch (err) {
            console.log('Error fetching card data:', err)
          }
        }
        fetchData()
      }, [settings, reset])



    // return
    return (
        <>
            <h1 className='home-page-title'>Discover and Swipe!</h1>
            <div className="card-container">
                <CardComponent gameData={gameData} onCardClick={handleCardClick} />
            </div>
            {isModalOpen && (<CardDetails
              gameData={gameData} 
              setGameData={setGameData}
              setIsModalOpen={setIsModalOpen} 
              onClose={handleCloseModal} 
              reset={reset}
              setReset={setReset}   
              selectedGame={selectedGame} 
            />)}
            <SettingsDrawer />
        </>
    )
}

// export
export default UserHomePage