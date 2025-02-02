import { useContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router'
import { showGame } from '../../services/apiService'
import { UserContext } from '../../contexts/UserContext'
import { showSettings } from '../../services/settingsService'
import CardComponent from "../CardComponent/CardComponent"
import CardDetails from "../CardDetails/CardDetails"
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer'


const UserHomePage = (props) => {
    // hooks
    const { user } = useContext(UserContext)
    // const navigate = useNavigate()

    // state variable
    const [settings, setSettings] = useState({
        media: [],
        genre: [],
    })
    const [gameData, setGameData] = useState([])
    const [isSettings, setIsSettings] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedGame, setSelectedGame] = useState(null)
    const [reset, setReset] = useState(false)

    useEffect(() => {
        // if (user) { navigate(`/users/${user._id}`) }
    
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
                setIsSettings(true)
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
      }, [user])


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


    // fetch function
    const fetchData = async () => {
        const fetchedData = await showGame(settings.genre)
        setGameData(fetchedData)
    }

    // handler functions 
    const handleCardClick = (game) => {
        setSelectedGame(game)
        setIsModalOpen(!isModalOpen)
    }

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen)
        setSelectedGame(null)
    }

    // prevent background scrolling
    if (isModalOpen) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <>
            <div className="card-container">
                <CardComponent gameData={gameData} onCardClick={handleCardClick} />
            </div>
            {isModalOpen && (<CardDetails gameData={gameData} selectedGame={selectedGame} onClose={handleCloseModal} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setGameData={setGameData} setReset={setReset} reset={reset} />)}
            <button onClick={fetchData}>Fetch Data</button>
            <SettingsDrawer
                settings={settings}
                setSettings={setSettings}
                isSettings={isSettings}
                setIsSettings={setIsSettings}
                isDrawerOpen={props.isDrawerOpen}
                setIsDrawerOpen={props.setIsDrawerOpen}
            />
        </>
    )
}

export default UserHomePage