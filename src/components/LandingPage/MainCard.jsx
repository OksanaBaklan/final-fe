import React from 'react'
import './landingPage.css'

const MainCard = ({theme}) => {
  const styleText = theme.isDarkMode ? "main-card" : "main-card-dark"

  return (
    <div className={styleText}>
    <h1 className={styleText}>
      Welcome to Money Minder <br/> Your Financial Tracking Companion
    </h1>
    <p>Simplify your financial life, the ultimate app  for tracking transactions and expenses.</p>
  </div>
  )
}

export default MainCard
