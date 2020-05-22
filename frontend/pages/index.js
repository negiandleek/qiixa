import {Home as HomePage} from '../src/components/pages/Home'
import {withApollo} from '../lib/apollo'
function Home() {
  return (
    <HomePage />
  )
}

export default withApollo(Home)