import styled from 'styled-components'
import CircleLoader from 'components/Loader/CircleLoader'

import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <CircleLoader size={'84px'} />
    </Wrapper>
  )
}

export default PageLoader
