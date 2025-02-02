// import
import { Drawer, Box, Typography,  } from "@mui/material"
import { useContext } from "react"
import SettingsComponent from "../SettingsComponent/SettingsComponent"
import { SettingsContext } from "../../contexts/SettingsContext"

// component
const SettingsDrawer = () => {
    // hooks
    const { isDrawerOpen, setIsDrawerOpen } = useContext(SettingsContext)

    // handler functions
    const handleCloseDrawer = () => {
      setIsDrawerOpen(false)
    }

    // return
    return (
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => handleCloseDrawer()}
      >
          <Box 
            p={2}
            width='250px'
            textAlign='center'
            role='presentation'
          >
            <Typography variant='h6' component='div'>
                Settings
                <SettingsComponent />
            </Typography>
          </Box>
      </Drawer>
    )
}

// export
export default SettingsDrawer 
