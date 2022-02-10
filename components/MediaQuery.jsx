import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: '(max-width:559px)',
  })
  return <React.Fragment>{isMobile && children}</React.Fragment>
}

const Tablet = ({ children }) => {
  const isPad = useMediaQuery({
    query: '(min-width:560px) and (max-width:1080px)',
  })
  return <React.Fragment>{isPad && children}</React.Fragment>
}

const PC = ({ children }) => {
  const isPc = useMediaQuery({
    query: '(min-width:1081px)',
  })
  return <React.Fragment>{isPc && children}</React.Fragment>
}

export { Mobile, PC, Tablet}