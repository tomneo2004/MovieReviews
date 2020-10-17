import Navigation from "../components/navigation/navigation.comp"
import PageLayout from "../layouts/page.layout"

const LandingPage = () => {
  return (
    <PageLayout
    navigation={<Navigation />}
    >
      <div>Moview Review landing page</div>
    </PageLayout>
  )
}

export default LandingPage
