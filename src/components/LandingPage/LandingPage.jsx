
import Container from '../Container/Container'
import './landingPage.css'
import FeatureCard from './FeatureCard'
import Header from './Header'
import MainCard from './MainCard'
import chart from './imgs/work-hard-woman-presenting-analytics-online-1.png'
import secondImg from './imgs/work-hard-man-starts-a-new-project-online.png'
import firstImg from './imgs/work-hard-woman-is-puzzled-by-some-big-question.png'
import manFly from './imgs/work-hard-man-flying-on-a-rocket.png'
import { useSelector } from 'react-redux'
import { getToggleTheme } from '../../redux/global/global-selectors'

const LandingPage = () => {
  const theme = useSelector(getToggleTheme)

  const feature = [{
    id: 1,
    imageSrc:firstImg,
    title: "Effortless Transaction Tracking",
    description: "Say goodbye to manual recording. Easily log your income and expenses with a few clicks.",
  }, {
    id: 2,
    imageSrc: secondImg,
    title: "Clear Financial Insights",
    description: "Our intuitive dashboard provides a comprehensive view of your finances. Set budgets, spot trends, and make informed decisions.",
  },
  {
    id: 3,
    imageSrc: chart,
    title: "Visualize Your Finances",
    description: "Engaging graphs and charts offer a quick visual breakdown of your spending patterns."
  }, {
    id: 4,
    imageSrc: manFly,
    title: "Secure and Accessible",
    description: "Your data is encrypted and always available, whether you're at home or on the go."
  }]
  return (
    <>
        <Header />
      <Container>
        <MainCard theme={theme}/>
        <FeatureCard
        features={feature}
        theme={theme}
        />
      </Container>
    </>
    
  )
}

export default LandingPage
