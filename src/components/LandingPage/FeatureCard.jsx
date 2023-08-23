
import './landingPage.css'
const FeatureCard = ({ features }) => {
  return (
    <>
      <div className='cards'>
        <div className='container'>
          {features.map(feature => (
            <div className='box' key={feature._id} >
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




