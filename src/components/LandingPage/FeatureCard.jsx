
import './landingPage.css'
const FeatureCard = ({ features , theme}) => {
  const styleBox = theme.isDarkMode ? "box" : "boxDark"

  return (
    <>
      <div className='cards'>
        <div className='container'>
          {features.map(feature => (
            <div className={styleBox} key={feature.id} >
              <img src={feature.imageSrc} alt="" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default FeatureCard




