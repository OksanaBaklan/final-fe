import './TeamMembers.css'
import Alvaro from './teamImg/Alvaro.png'
import Hamza from './teamImg/hamza.png'
import Natalia from './teamImg/Natalia.jpg'
import Oksana from './teamImg/Oksana.jpeg'
import Simin from './teamImg/Simin.png'
import closeIcon from "../../images/modal-transaction/close.svg";
import Container from '../Container/Container'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const TeamMembers = ({ onModalClose, onOverlayClose }) => {
  const team = [{
    id: 1,
    imageSrc: Oksana,
    title: "Oksana Baklan",
    // description: "Fullstack developer",
    email: "oksana.molesha@gmail.com",
    linkedin: "https://www.linkedin.com/in/oksana-baklan/",
    github: "https://github.com/OksanaBaklan"
  },
  {
    id: 2,
    imageSrc: Hamza,
    title: "Hamza Nachawati",
    // description: "Fullstack developer",
    email: "Hamza.nachawati77@gmail.com",

    linkedin: "https://www.linkedin.com/in/hamza-nachawati-4b807924a",
    github: "https://github.com/Hamza77N"
  },
  {
    id: 3,
    imageSrc: Natalia,
    title: "Nataliya Rodionova",
    // description: "Fullstack developer",
    email: "nataliyarodionova26@gmail.com",
    linkedin: "https://www.linkedin.com/in/nataliya-rodionova-7ba53669",
    github: "https://github.com/006080"
  },
  {
    id: 4,
    imageSrc: Simin,
    title: "Simin",
    // description: "Fullstack developer",
    email: "simincmin@gmail.com",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com/siminmousavi"
  },
  {
    id: 5,
    imageSrc: Alvaro,
    title: "Alvarez Valle",
    // description: "Fullstack developer",
    email: "alvaroalvarezvalle@gmail.com",
    linkedin: "https://www.linkedin.com/in/alvaro-alvarez-valle-199653a6/?originalSubdomain=cu",
    github: "https://github.com/AlvaroAV7"
  }]


  return (
    <>

      <div className='overlay' onClick={onOverlayClose} >

        <Container>

          <div className='cards-container'>
            <button type='button' className="closeBtn" onClick={onModalClose}>
              <img src={closeIcon} alt='' />
            </button>
            {team.map(feature => (
              <div className='card'>
                <div className='card__content'>
                  <div key={feature.id} >
                    <div className='imgBx'>
                      <img src={feature.imageSrc} alt={feature.title} />
                    </div>
                    <h3 className='contentBx__title'>{feature.title}</h3>
                    {/* <p className='contentBx__subtitle'> {feature.description}</p> */}
                    <ul className="sci">
                      <li className="sci__item"><a className='sci__link' href={`mailto:${feature.email}`} ><FaEnvelope /></a></li>
                      <li className="sci__item"><a className='sci__link' href={feature.github} rel='noreferrer noopener' target="_blank"><FaGithub /></a></li>
                      <li className="sci__item"><a className='sci__link' href={feature.linkedin} rel='noreferrer noopener' target="_blank"><FaLinkedin /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>

      </div>

    </>

  )
}

export default TeamMembers
