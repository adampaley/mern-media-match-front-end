// imports
import { useState } from "react"
import CardComponent from "../CardComponent/CardComponent"
// import CardDetails from "../CardDetails/CardDetails";
import './ProductList.css'


const ProductList = ({ productsList, setProductList }) => {
    // state
    const [isModalOpen, setIsModalOpen] = useState(false)
    // const [selectedGame, setSelectedGame] = useState(null)
    // const [reset, setReset] = useState(false)

    // handler functions 
    const handleCardClick = (game) => {
        setSelectedGame(game)
        setIsModalOpen(!isModalOpen)
        console.log(event.target)
    }

    // const handleCloseModal = () => {
    //     setIsModalOpen(!isModalOpen)
    //     setSelectedGame(null)
    // }

    // prevent background scrolling
    // if (isModalOpen) {
    //     document.body.classList.add('active-modal')
    // } else {
    //     document.body.classList.remove('active-modal')
    // }

    if (!productsList) return <div>Loading...</div>
    return (
        <>
            <div className="product-list">
                {productsList.map((product) => (
                    <CardComponent gameData={product} key={product.id} onCardClick={handleCardClick} className="product-list-card" />
                ))}
            </div>
            {/* {isModalOpen && (<CardDetails selectedGame={selectedGame} onClose={handleCloseModal} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setReset={setReset} reset={reset} />)} */}
        </>
    )
};

export default ProductList